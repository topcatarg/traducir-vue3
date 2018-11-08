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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class StatComponent extends Vue {

    private ClickedUrgentStrings(): void {
        this.$store.commit('QueryViewModel/UrgencyStatus', UrgencyStatus['Is urgent']);
        this.$store.dispatch('SOStrings/FillSOStrings', this.$store.getters['QueryViewModel/State']);
    }

    private ClickedWithoutTranslation(): void {
        this.$store.commit('QueryViewModel/TranslationStatus', TranslationStatus['Only strings without translation']);
        this.$store.dispatch('SOStrings/FillSOStrings', this.$store.getters['QueryViewModel/State']);
    }

    private ClickedAwaitingAproval(): void {
        this.$store.commit('QueryViewModel/SuggestionsStatus',
            SuggestionsStatus['Strings with suggestions awaiting approval']);
        this.$store.dispatch('SOStrings/FillSOStrings', this.$store.getters['QueryViewModel/State']);
    }

    private ClickedAwaitingReview(): void {
        this.$store.commit('QueryViewModel/SuggestionsStatus',
            SuggestionsStatus['Strings with approved suggestions awaiting review']);
        this.$store.dispatch('SOStrings/FillSOStrings', this.$store.getters['QueryViewModel/State']);
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

