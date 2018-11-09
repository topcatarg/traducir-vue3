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
                        <b-list-group-item :variant="this.Notifications.Urgent?'green':'red'">Urgent Strings</b-list-group-item>
                        <b-list-group-item>Suggestions awaiting approval</b-list-group-item>
                        <b-list-group-item>Suggestions awaiting review</b-list-group-item>
                        <b-list-group-item>Strings pushed to Transifex</b-list-group-item>
                    </b-list-group>
                </b-col>
                <b-col class="text-center h3">
                    Your suggestion notifications
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import { INotificationSettings } from '@/models/INotificationSettings';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Notifications extends Vue {

    private mounted() {
        this.$store.dispatch('Notifications/notifications');
    }

    private get Notifications(): INotificationSettings {
        return this.$store.getters['Notifications/state'];
    }
}
</script>
