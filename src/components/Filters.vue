<template>
    <div>
        <div className="m-2 text-center">
            <h2>Filters</h2>
        </div>
        <b-form @submit="submitForm()" @input="submitForm()">
            <b-container >
                <b-row class="text-left">
                    <b-col >
                        Source Regex
                        <b-form-input 
                            class="mb-3 mt-2" 
                            type="text"
                            placeholder="^question"
                            v-model="SourceRegex"
                        />
                    </b-col>
                    <b-col > 
                        Translation Regex
                        <b-form-input 
                            class="mb-3 mt-2"
                            type="text"
                            placeholder="(?i)pregunta$"
                            v-model="TranslationRegex"
                        />
                    </b-col>
                </b-row >
                <b-row class="text-left">
                    <b-col>
                        Strings without translation
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="TranslationStatus" 
                            :options="TranslationStatusOptions">
                        </b-form-select>
                    </b-col>
                    <b-col>
                        Strings with pending suggestions
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="SuggestionsStatus"
                            :options="SuggestionsStatusOptions"
                            />
                    </b-col>
                </b-row>
                <b-row class="text-left">
                    <b-col>
                        Key
                        <b-form-input 
                            class="mb-3 mt-2"
                            type="text"
                            v-model="Key"
                        />
                    </b-col>
                    <b-col>
                        Strings with urgency status
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="UrgencyStatus"
                            :options="UrgencyStatusOptions"/>
                    </b-col>
                </b-row>
                <b-row class="mb-3 mt-2 ">
                    <b-col>
                        <b-button @click="ResetForm" >
                            Reset
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script lang="ts">
import { PushStatus } from '@/Helpers/Enums/PushStatus';
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SuggestionsStatus } from '../Helpers/Enums/SuggestionsStatus';
import { TranslationStatus } from '../Helpers/Enums/TranslationStatus';
import { UrgencyStatus } from '../Helpers/Enums/UrgencyStatus';
import QueryViewModel from '../models/QueryViewModel';

@Component
export default class Filters extends Vue {

    private TranslationStatusOptions: object[] = [];
    private SuggestionsStatusOptions: object[] = [];
    private UrgencyStatusOptions: object[] = [];

    private submitForm: (() => void) & _.Cancelable = _.debounce(
        this.GetData,
        1000
    );

    constructor() {
        super();
        let len = Object.keys(TranslationStatus).length / 2;
        for (let index = 0; index < len; index++) {
            this.TranslationStatusOptions.push({
            value: index,
            text: TranslationStatus[index]
            });
        }
        len = Object.keys(SuggestionsStatus).length / 2;
        for (let index = 0; index < len; index++) {
            this.SuggestionsStatusOptions.push({
            value: index,
            text: SuggestionsStatus[index]
            });
        }
        len = Object.keys(UrgencyStatus).length / 2;
        for (let index = 0; index < len; index++) {
            this.UrgencyStatusOptions.push({
            value: index,
            text: UrgencyStatus[index]
            });
        }
    }

    private GetData(): void {
        this.$store.dispatch('SOStrings/FillSOStrings', this.QueryViewModel);
    }

    private get SourceRegex(): string {
        return this.$store.getters['QueryViewModel/SourceRegex'];
    }
    private set SourceRegex(s: string) {
        this.$store.commit('QueryViewModel/SourceRegex', s);
    }
    private get TranslationRegex(): string {
        return this.$store.getters['QueryViewModel/TranslationRegex'];
    }
    private set TranslationRegex(s: string) {
        this.$store.commit('QueryViewModel/TranslationRegex', s);
    }
    private get Key(): string {
        return this.$store.getters['QueryViewModel/Key'];
    }
    private set Key(s: string) {
        this.$store.commit('QueryViewModel/Key', s);
    }
    private get TranslationStatus(): TranslationStatus {
        return this.$store.getters['QueryViewModel/TranslationStatus'];
    }
    private set TranslationStatus(s: TranslationStatus) {
        this.$store.commit('QueryViewModel/TranslationStatus', s);
    }
    private get SuggestionsStatus(): SuggestionsStatus {
        return this.$store.getters['QueryViewModel/SuggestionsStatus'];
    }
    private set SuggestionsStatus(s: SuggestionsStatus) {
        this.$store.commit('QueryViewModel/SuggestionsStatus', s);
    }
    private get UrgencyStatus(): UrgencyStatus {
        return this.$store.getters['QueryViewModel/UrgencyStatus'];
    }
    private set UrgencyStatus(s: UrgencyStatus) {
        this.$store.commit('QueryViewModel/UrgencyStatus', s);
    }
    private get QueryViewModel(): QueryViewModel {
        return this.$store.getters['QueryViewModel/State'];
    }

    private ResetForm() {
        this.$store.dispatch('QueryViewModel/reset');
    }
}
</script>