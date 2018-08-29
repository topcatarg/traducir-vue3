<template>
    <div>
        <div className="m-2 text-center">
            <h2>Filters</h2>
        </div>
        <b-form @submit="submitForm()" @input="submitForm()">
            <b-container>
                <b-row>
                    <b-col class="">
                        Source Regex
                        <b-form-input 
                            class="mb-3" 
                            type="text"
                            placeholder="^question"
                            :value="SourceRegEx"
                        />
                    </b-col>
                    <b-col>
                        Translation Regex
                        <b-form-input 
                            type="text"
                            placeholder="(?i)pregunta$"
                            v-model="TranslationRegex"
                            
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Strings without translation
                        <b-form-select class="mb-3" 
                            v-model="TranslationStatusValue" 
                            :options="TranslationStatusOptions">
                        </b-form-select>
                    </b-col>
                    <b-col>
                        Strings with pending suggestions
                        <b-form-select class="mb-3" 
                            v-model="SuggestionsStatusValue"
                            :options="SuggestionsStatusOptions"
                            />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Key
                        <b-form-input 
                            type="text"
                            v-model="Key"
                        />
                    </b-col>
                    <b-col>
                        Strings with urgency status
                        <b-form-select class="mb-3" 
                            v-model="UrgencyStatusValue"
                            :options="UrgencyStatusOptions"/>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button @click="ResetForm">
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

    private SourceRegEx: string;
    private TranslationRegex: string;
    private Key: string;
    private TranslationStatusValue: TranslationStatus;
    private TranslationStatusOptions: object[] = [];
    private SuggestionsStatusValue: SuggestionsStatus;
    private SuggestionsStatusOptions: object[] = [];
    private UrgencyStatusValue: UrgencyStatus;
    private UrgencyStatusOptions: object[] = [];

    private submitForm: (() => void) & _.Cancelable = _.debounce(
        this.GetData, 1000
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
        this.SourceRegEx = this.QueryViewModel.SourceRegex;
        this.TranslationRegex = this.QueryViewModel.TranslationRegex;
        this.Key = this.QueryViewModel.Key;
        this.TranslationStatusValue = this.QueryViewModel.TranslationStatus;
        this.SuggestionsStatusValue = this.QueryViewModel.SuggestionsStatus;
        this.UrgencyStatusValue = this.QueryViewModel.UrgencyStatus;
    }

    private GetData(): void {
        const v: QueryViewModel = {
            SourceRegex: this.SourceRegEx,
            TranslationRegex: this.TranslationRegex,
            Key: this.Key,
            TranslationStatus: this.TranslationStatusValue,
            SuggestionsStatus: this.SuggestionsStatusValue,
            UrgencyStatus: this.UrgencyStatusValue,
            PushStatus: 0,
            IgnoredStatus: 0
        };
        this.$store.dispatch('SetQueryViewModel', v);
    }

    private get QueryViewModel(): QueryViewModel {
        return this.$store.getters.GetQueryViewModel;
    }

    private ResetForm() {
        this.SourceRegEx = '';
        this.TranslationRegex = '';
        this.Key = '';
        this.TranslationStatusValue = TranslationStatus['Any String'];
        this.SuggestionsStatusValue = SuggestionsStatus['Any string'];
        this.UrgencyStatusValue = UrgencyStatus['Any string'];
    }

}
</script>