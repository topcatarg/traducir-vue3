<template>
    <div class="container">
        <div class="text-center h2 m-2">
            Notifications settings
        </div>
        <b-container>
            <b-row class="mt-4">
                <b-col class="text-center h3">
                    System notifications
                </b-col>
                <b-col class="text-center h3">
                    Your suggestion notifications
                </b-col>
            </b-row>
            <b-row class="mt-1">
                <b-col>
                    <b-list-group class="text-left">
                        <b-list-group-item :variant="this.Notifications.notifyUrgentStrings?'primary':''" @click="ToggleItem('UrgentStrings')">Urgent Strings</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsAwaitingApproval?'primary':''" @click="ToggleItem('SuggestionsAwaitingApproval')">Suggestions awaiting approval</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsAwaitingReview?'primary':''" @click="ToggleItem('SuggestionsAwaitingReview')">Suggestions awaiting review</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifyStringsPushedToTransifex?'primary':''" @click="ToggleItem('StringsPushedToTransifex')">Strings pushed to Transifex</b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col >
                    <b-list-group class="text-left">
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsApproved?'primary':''" @click="ToggleItem('SuggestionsApproved')">Suggestion approved</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsRejected?'primary':''" @click="ToggleItem('SuggestionsRejected')">Suggestion rejected</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsReviewed?'primary':''" @click="ToggleItem('SuggestionsReviewed')">Suggestion reviewed</b-list-group-item>
                        <b-list-group-item :variant="this.Notifications.notifySuggestionsOverriden?'primary':''" @click="ToggleItem('SuggestionsOverriden')">Suggestion overriden</b-list-group-item>
                    </b-list-group>
                </b-col>
            </b-row>
            <b-row class="mt-2 text-left">
                <b-col  md="auto">
                    Notify me about the same type of event at most once every
                </b-col>
                <b-col  md="auto">
                    <b-form-input type="number" v-model="NotificationIntervalValue">
                    </b-form-input>
                </b-col>
                <b-col  md="auto">
                    <b-form-select class="mb-3" v-model="NotificationsInterval">
                        <option value={NotificationInterval.Days}>days</option>
                        <option value={NotificationInterval.Hours}>hours</option>
                        <option value={NotificationInterval.Minutes}>minutes</option>
                    </b-form-select>
                </b-col>
            </b-row>
            <b-row class="justify-content-md-center">
                <b-col md="auto">
                    <b-button variant="primary" @click="SaveAndSubscribe">
                        Save and add current browser
                    </b-button>
                </b-col>
                <b-col md="auto">
                    <b-button variant="danger">
                        Stop receiving notifications everywhere
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import urlBase64ToUint8Array from '@/Helpers/urlBase64ToUint8Array';
import { INotificationSettings, NotificationInterval } from '@/models/INotificationSettings';
import Axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Notifications extends Vue {

    private mounted() {
        this.$store.dispatch('Notifications/notifications');
    }

    private get Notifications(): INotificationSettings {
        return this.$store.getters['Notifications/GetState'];
    }

    private ToggleItem(ItemName: string) {
        this.$store.commit('Notifications/Invert' + ItemName);
    }

    private get NotificationIntervalValue(): number {
        return this.Notifications.notificationsIntervalValue;
    }

    private set NotificationIntervalValue(v: number) {
        this.$store.commit('Notifications/notificationsIntervalValue', v);
    }

    private get NotificationsInterval(): NotificationInterval {
        return this.Notifications.notificationsInterval;
    }

    private set NotificationsInterval(v: NotificationInterval) {
        this.$store.commit('Notifications/notificationsInterval', v);
    }

    private async SaveAndSubscribe(): Promise<void> {
        try {
            const subscription = await this.subscribeUserToPush();
            await Axios.put(process.env.VUE_APP_API_URI + 'me/notification-settings',
                {
                    notifications: this.Notifications,
                    subscription
                });
        } catch (e) {
            if (e.response.status === 401) {
                // history.push("/");
            } else {
                // this.props.showErrorMessage(e.response.status);
            }
        }
    }

    private async subscribeUserToPush(): Promise<PushSubscription> {
        try {
            const registration = await this.registerServiceWorker();

            const subscribeOptions = {
                applicationServerKey: urlBase64ToUint8Array(this.$store.getters['Config/GetState'].vapidPublic),
                userVisibleOnly: true
            };

            return await registration.pushManager.subscribe(subscribeOptions);
        } catch (e) {
            // this.props.showErrorMessage('Error asking for permission');
            throw e;
        }
    }

    private registerServiceWorker(): Promise<ServiceWorkerRegistration> {
        return navigator.serviceWorker.register('/lib/service-worker.js');
    }
}
</script>
