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
                            v-model="FiltersViewModel.SourceRegEx"
                        />
                    </b-col>
                    <b-col > 
                        Translation Regex
                        <b-form-input 
                            class="mb-3 mt-2"
                            type="text"
                            placeholder="(?i)pregunta$"
                            v-model="FiltersViewModel.TranslationRegex"
                        />
                    </b-col>
                </b-row >
                <b-row class="text-left">
                    <b-col>
                        Strings without translation
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="FiltersViewModel.TranslationStatus" 
                            :options="TranslationStatusOptions">
                        </b-form-select>
                    </b-col>
                    <b-col>
                        Strings with pending suggestions
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="FiltersViewModel.SuggestionsStatus"
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
                            v-model="FiltersViewModel.Key"
                        />
                    </b-col>
                    <b-col>
                        Strings with urgency status
                        <b-form-select 
                            class="mb-3 mt-2"
                            v-model="FiltersViewModel.UrgencyStatus"
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
import store from '@/store';
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
    private FiltersViewModel: QueryViewModel;

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
        this.FiltersViewModel = Object.assign({}, this.QueryViewModel);
        // this.FiltersViewModel.TranslationStatus = this.QueryViewModel.TranslationStatus;
        // this.FiltersViewModel.SuggestionsStatus = this.QueryViewModel.SuggestionsStatus;
        // this.FiltersViewModel.UrgencyStatus = this.QueryViewModel.UrgencyStatus;
    }

    private GetData(): void {
        /* const v: QueryViewModel = {
            SourceRegex: this.SourceRegEx,
            TranslationRegex: this.TranslationRegex,
            Key: this.Key,
            TranslationStatus: TranslationStatus['Any String'], // this.TranslationStatusValue,
            SuggestionsStatus: SuggestionsStatus['Any string'], // this.SuggestionsStatusValue,
            UrgencyStatus: UrgencyStatus['Any string'], // this.UrgencyStatusValue,
            PushStatus: 0,
            IgnoredStatus: 0
        };*/
        this.$store.dispatch('SetQueryViewModel', this.FiltersViewModel);
    }

    private get TranslationStatusValue(): TranslationStatus {
        return this.QueryViewModel.TranslationStatus;
    }

    private get SuggestionsStatusValue(): SuggestionsStatus {
        return this.QueryViewModel.SuggestionsStatus;
    }

    private get UrgencyStatusValue(): UrgencyStatus {
        return this.QueryViewModel.UrgencyStatus;
    }

    private get QueryViewModel(): QueryViewModel {
        return this.$store.getters.GetQueryViewModel;
    }

    private ResetForm() {
        this.FiltersViewModel = Object.assign({}, this.QueryViewModel);
        this.$store.commit('SetSOStrings', []);
    }
}
</script>