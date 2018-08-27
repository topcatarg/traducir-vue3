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
                            v-model="SourceRegEx"
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
import store from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SuggestionsStatus } from '../Helpers/Enums/SuggestionsStatus';
import { TranslationStatus } from '../Helpers/Enums/TranslationStatus';
import { UrgencyStatus } from '../Helpers/Enums/UrgencyStatus';
import * as _ from "lodash";

@Component
export default class Filters extends Vue {
    private SourceRegEx: string = '';
    private TranslationRegex: string = '';
    private Key: string = '';
    private TranslationStatusValue: TranslationStatus = TranslationStatus['Any String'];
    private TranslationStatusOptions: object[] = [];
    private SuggestionsStatusValue: SuggestionsStatus = SuggestionsStatus['Any string'];
    private SuggestionsStatusOptions: object[] = [];
    private UrgencyStatusValue: UrgencyStatus = UrgencyStatus['Any string'];
    private UrgencyStatusOptions: object[] = [];

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

    private ResetForm() {
        this.SourceRegEx = '';
        this.TranslationRegex = '';
        this.Key = '';
        this.TranslationStatusValue = TranslationStatus['Any String'];
        this.SuggestionsStatusValue = SuggestionsStatus['Any string'];
        this.UrgencyStatusValue = UrgencyStatus['Any string'];
    }

    public submitForm: (() => Promise<void>) & _.Cancelable = _.debounce(async () => {
        alert("cargando");
    }, 1000);
}
</script>