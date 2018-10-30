<template>
    <div className="row text-center">
            <div className="col d-none d-lg-block">
                <b-button-group>
                    <b-button variant="outline-secondary" disabled>
                        {{GetStatstotalStrings}} total strings
                    </b-button>
                    <b-button 
                        variant="danger" 
                        v-if="Number.isInteger(GetStatsurgentStrings) && GetStatsurgentStrings > 0"
                        @click="ClickedUrgentStrings">
                        {{GetStatsurgentStrings}} marked as urgent
                    </b-button>
                    <b-button 
                        variant="outline-danger"
                        @click="ClickedWithoutTranslation">
                        {{GetStatswithoutTranslation}} without translation
                    </b-button>
                    <b-button 
                        variant="outline-primary"
                        @click="ClickedAwaitingAproval">
                        {{GetStatswaitingApproval}} suggestions awaiting approval
                    </b-button>
                    <b-button 
                        variant="outline-success"
                        @click="ClickedAwaitingReview"
                        >
                        {{GetStatswaitingReview}} approved suggestions awaiting review
                    </b-button>
                </b-button-group>
            </div>
        </div>
</template>

<script lang="ts">
import { SuggestionsStatus } from '@/Helpers/Enums/SuggestionsStatus';
import { TranslationStatus } from '@/Helpers/Enums/TranslationStatus';
import { UrgencyStatus } from '@/Helpers/Enums/UrgencyStatus';
import store from '@/store';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import QueryViewModel from '../models/QueryViewModel';

@Component
export default class StatComponent extends Vue {

    private ClickedUrgentStrings(): void {
        const v = this.GetEmptyModel();
        v.UrgencyStatus = UrgencyStatus['Is urgent'];
        this.$store.dispatch('SetQueryViewModel', v);
    }

    private ClickedWithoutTranslation(): void {
        const v = this.GetEmptyModel();
        v.TranslationStatus = TranslationStatus['Only strings without translation'];
        this.$store.dispatch('SetQueryViewModel', v);
    }

    private ClickedAwaitingAproval(): void {
        const v = this.GetEmptyModel();
        v.SuggestionsStatus = SuggestionsStatus['Strings with suggestions awaiting approval'];
        this.$store.dispatch('SetQueryViewModel', v);
    }

    private ClickedAwaitingReview(): void {
        const v = this.GetEmptyModel();
        v.SuggestionsStatus = SuggestionsStatus['Strings with approved suggestions awaiting review'];
        this.$store.dispatch('SetQueryViewModel', v);
    }

    private GetEmptyModel(): QueryViewModel {
        return {
            SourceRegex: '',
            TranslationRegex: '',
            Key: '',
            TranslationStatus: TranslationStatus['Any String'],
            SuggestionsStatus: SuggestionsStatus['Any string'],
            UrgencyStatus: UrgencyStatus['Any string'],
            PushStatus: 0,
            IgnoredStatus: 0
        };
    }
    get GetStatstotalStrings(): number {
        return this.$store.getters['Stats/GetTotalStrings'];
    }
    get GetStatsurgentStrings(): number {
        return this.$store.getters['Stats/GetUrgentStrings'];
    }
    get GetStatswaitingApproval(): number {
        return this.$store.getters['Stats/GetWaitingApproval'];
    }
    get GetStatswithoutTranslation(): number {
        return this.$store.getters['Stats/GetWithoutTranslation'];
    }
    get GetStatswaitingReview(): number {
        return this.$store.getters['Stats/GetWaitingReview'];
    }
}
</script>

