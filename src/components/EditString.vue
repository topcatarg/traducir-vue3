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
        <hr>
        <b-table :items="this.GetStringToEdit.suggestions" :fields="fields" 
            class="mx-auto mytableediting">
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
        return this.$store.getters.GetStringToEdit;
    }

    private get GetConfig(): IConfig {
        return this.$store.getters.GetConfig;
    }

    private get GetUser(): IuserInfo {
        return this.$store.getters.GetUser;
    }

    private async MarkUrgent(): Promise<void> {
        try {
            await Axios.put(process.env.VUE_APP_API_URI + 'manage-urgency', {
                IsUrgent: !this.GetStringToEdit.isUrgent,
                StringId: this.GetStringToEdit.id
            }, { withCredentials: true });
            this.$store.dispatch('RefreshString', this.GetStringToEdit.id);
            /*if (this.props.str) {
                this.props.refreshString(this.props.str.id);
            }*/
        } catch (e) {
            /* if (e.response.status === 400) {
                this.props.showErrorMessage("Failed updating the urgency... maybe a race condition?");
            } else {
                this.props.showErrorMessage(e.response.status);
            }*/
        }
    }

    private SendTranslation(approve: boolean): void {
        this.VM.Approve = approve;
        this.$store.dispatch('postSuggestion', this.VM);
        this.$emit('back-editing');
    }

    private async DeleteReview(id: number): Promise<void> {
        try {
            await Axios.delete(process.env.VUE_APP_API_URI + 'suggestions/' + id, {withCredentials: true});
            this.$store.dispatch('RefreshString', this.GetStringToEdit.id);
        } catch (e) {
            if (e.response.status === 400) {
                //  this.props.showErrorMessage("Error deleting the suggestion. Do you have enough rights?");
            } else {
                // this.props.showErrorMessage(e.response.status);
            }
        }
    }

    private async processReview(action: boolean, id: number): Promise<void> {
        /* this.setState({
            isButtonDisabled: true
        });*/
        try {
            await Axios.put(process.env.VUE_APP_API_URI + 'review', {
                Approve: action,
                SuggestionId: id
            }, {withCredentials: true});
            this.$store.dispatch('RefreshString', this.GetStringToEdit.id);
            // history.push("/filters");
        } catch (e) {
            if (e.response.status === 400) {
                // this.props.showErrorMessage("Error reviewing the suggestion. Do you have enough rights?");
            } else {
                // this.props.showErrorMessage(e.response.status);
            }
            /* this.setState({
                isButtonDisabled: false
            }); */
        }
    }
}
</script>

<style>
.mytableediting tbody {
    background: rgb(171, 211, 173);
}

</style>