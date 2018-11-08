<template>
    <div class="container ">
        <h2 class="text-left mt-2 ml-2 font-weight-bold">
            Suggestions
        </h2>
        <hr>
        <div class="text-left font-weight-bold">
            key: 
            <b-link :href="'https://www.transifex.com/'+this.GetConfig.transifexPath+'/$?q=key%3A'+this.GetStringToEdit.key" target="_blank">{{this.GetStringToEdit.key}}</b-link>
        </div>
        <div class="text-left">
            <span class="font-weight-bold">
                This string needs a new translation ASAP: 
            </span>
            {{this.GetStringToEdit.isUrgent?'Yes':'No'}} 
            <span v-if="this.GetUser.canSuggest">
                <b-button class="ml-2" size="sm" v-if="!this.GetStringToEdit.isUrgent" variant="danger" @click="MarkUrgent">
                    Mark as urgent
                </b-button>        
                <b-button class="ml-2" size="sm" v-else variant="warning" @click="MarkUrgent">
                    Mark as non urgent
                </b-button>
            </span>
        </div>
        <div class="text-left">
            <span class="font-weight-bold">
                Raw string?:
            </span>
            <b-form-checkbox id="checkbox1"
                v-model="VM.rawString"/>
        </div>
        <div class="text-left">
            <span class="font-weight-bold">
                Original String:
            </span>
            {{this.GetStringToEdit.originalString}}
        </div>
        <div class="text-left">
            <b-button variant="primary" size="sm" @click="VM.Suggestion = GetStringToEdit.originalString">
                Copy as suggestion
            </b-button>
        </div>
        <div class="text-left">
            <span class="font-weight-bold">
                Current Translation: 
            </span>
            <span v-if="this.GetStringToEdit.translation!==null">
                {{this.GetStringToEdit.translation}}
            </span>
            <span v-else>
                <i>Missing translation </i>
            </span>
        </div>
        <div class="text-left">
            <b-button variant="primary" size="sm" @click="VM.Suggestion = GetStringToEdit.translation">
                Copy as suggestion
            </b-button>
        </div>
        <div v-if="this.GetStringToEdit.suggestions !== null">
            <b-table :items="this.GetStringToEdit.suggestions" :fields="fields" 
                class="mx-auto mytableediting mt-4">
                <template slot="delete" slot-scope="data">
                    <b-button variant="danger" size="sm" v-if="GetUser.id === data.item.createdById" @click="DeleteReview(data.item.id)">
                        DELETE
                    </b-button>
                </template>
                <template slot="votes" slot-scope="data">
                    <b-button variant="success" @click="processReview(true,data.item.id)">
                        <i class="fa fa-thumbs-up"></i>
                    </b-button>
                    <b-button variant="danger"  @click="processReview(false,data.item.id)">
                        <i class="fa fa-thumbs-down"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
        <div v-else>
            <hr>
        </div>
        <div class="text-left font-weight-bold">
            New Suggestion
            <b-form-textarea id="textarea1"
                v-model="VM.Suggestion"
                :rows="3"
                :max-rows="6">
            </b-form-textarea>
        </div>
        <div class="text-left mt-2">
            <b-button variant="primary" @click="SendTranslation(false)">
                Send new suggestion
            </b-button>
            <b-button variant="warning" @click="SendTranslation(true)">
                Send final translation
            </b-button>
            <br/>
            <b-button @click="$emit('back-editing')" class="mt-2" variant="danger">
                Back
            </b-button>
        </div>
    </div>
</template>

<script lang="ts">
import PDeleteReview from '@/Helpers/Params/DeleteReview';
import PProcessReview from '@/Helpers/Params/ProcessReview';
import PSetUrgency from '@/Helpers/Params/SetUrgency';
import ITableFields from '@/Helpers/Tables/ITableFields';
import IConfig from '@/models/Config';
import ISOStringToTranslate from '@/models/ISOStringToTranslate';
import IuserInfo from '@/models/UserInfo';
import EditingStringVM from '@/ViewModels/EditingStringVM';
import Axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class EditString extends Vue {
    private fields: ITableFields[] = [];
    private VM: EditingStringVM =
    {
        RawString: false,
        Suggestion: '',
        Approve: false
    };

    constructor() {
        super();
        this.fields.push( {
            key: 'suggestion',
            label: 'Suggestion'
        });
        this.fields.push( {
            key: 'lastStateUpdatedByName',
            label: 'Approved by'
        });
        this.fields.push( {
            key: 'createdByName',
            label: 'Created by'
        });
        this.fields.push( {
            key: 'delete',
            label: ''
        });
        this.fields.push( {
            key: 'votes',
            label: ''
        });
    }

    private get GetStringToEdit(): ISOStringToTranslate {
        return this.$store.getters['SOStrings/StringToEdit'];
    }

    private get GetConfig(): IConfig {
        return this.$store.getters['Config/GetState'];
    }

    private get GetUser(): IuserInfo {
        return this.$store.getters['UserData/GetState'];
    }

    private async MarkUrgent(): Promise<void> {
        const p: PSetUrgency  = {
            IsUrgent: !this.GetStringToEdit.isUrgent,
            StringId: this.GetStringToEdit.id
        };
        await this.$store.dispatch('SOStrings/SetUrgency', p);
    }

    private async SendTranslation(approve: boolean): Promise<void> {
        this.VM.Approve = approve;
        await this.$store.dispatch('SOStrings/postSuggestion', this.VM);
        this.$emit('back-editing');
    }

    private async DeleteReview(id: number): Promise<void> {
        const p: PDeleteReview = {
            SuggestionId: id,
            StringId: this.GetStringToEdit.id
        };
        await this.$store.dispatch('SOStrings/DeleteReview', p);
    }

    private async processReview(action: boolean, id: number): Promise<void> {
        const p: PProcessReview = {
            action,
            SuggestionId : id,
            StringId: this.GetStringToEdit.id
        };
        await this.$store.dispatch('SOStrings/processReview', p);
    }
}
</script>

<style>
.mytableediting tbody {
    background: rgb(171, 211, 173);
}

</style>