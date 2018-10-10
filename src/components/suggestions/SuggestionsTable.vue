<template>
    <div class="container">
        <b-container v-if="suggestions.length === 0" class="mx-auto mt-5 w-50 p-3 text-center">
            <b-row>
                <b-col>No results (sad trombone)</b-col>
            </b-row>
        </b-container>
        <b-container v-else>
            <div v-for="sug in suggestions" :key="sug.id">
                <div class="text-left">
                    <span class="font-weight-bold text-left">Original String: </span>
                    <pre class="d-inline">{{sug.originalString}}</pre>
                </div>
                <div class="text-left">
                    <span class="font-weight-bold text-left">Suggestion: </span>
                    <pre class="d-inline">{{sug.suggestion}}</pre>
                </div>
                <div class="text-left">
                    <span class="font-weight-bold">State: </span> 
                    <span :class="'badge ' + getBadgeClassFromState(sug.state)">{{StateToString(sug.state)}}</span>
                </div>
                <b-table :items="sug.histories" :fields="fields" class="mt-2">
                    <template slot="historyType" slot-scope="data">
                        <div class="text-left">
                            {{suggestionHistoryTypeToString(data.item.historyType)}}
                        </div>
                    </template>
                    <template slot="userName" slot-scope="data">
                        <div class="text-left">
                            <b-link 
                                :href="'https://' + GetSiteDomain() + '/users/' + data.item.userId"
                                target="_blank">
                                {{data.item.userName}}
                            </b-link>
                        </div>
                    </template>
                </b-table>
            </div>
        </b-container>
    </div>
</template>
<script lang="ts">
import ITableFields from '@/Helpers/Tables/ITableFields';
import ISOStringSuggestion, {StringSuggestionState, suggestionStateToString} from '@/models/ISOStringSuggestion';
import {SuggestionHistoryType, suggestionHistoryTypeToString } from '@/models/ISOStringSuggestionHistory';
import Axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

interface ISuggestionState {
    state: number | undefined;
}

@Component
export default class SuggestionsTable extends Vue {

    private suggestions?: ISOStringSuggestion[];
    private fields: ITableFields[] = [];

    constructor() {
        super();
        this.suggestions = [];
        this.fields.push( {
            key: 'historyType',
            label: 'Event'
        });
        this.fields.push( {
            key: 'userName',
            label: 'User'
        });
        this.fields.push( {
            key: 'comment',
            label: 'Comment'
        });
        this.fields.push( {
            key: 'creationDate',
            label: 'Date'
        });
    }

    private mounted() {
        this.userChanged();
    }

    @Watch('$route')
    private onRouteChange(to: object, from: object) {
        this.userChanged();
    }

    private async userChanged(): Promise<void> {
        const userId = this.$route.params[0];
        const parts: number = parseInt(this.$route.query.state, undefined);
        try {
            const r = await Axios.get<ISOStringSuggestion[]>(
                process.env.VUE_APP_API_URI + 'suggestions-by-user/' + userId,
                { params: { state: parts}, withCredentials: true});
            this.suggestions = r.data;
        } catch (e) {
            /* if (e.response.status === 401) {
                history.push("/");
            } else {
                this.props.showErrorMessage(e.response.status);
            } */
        }
    }

    private getBadgeClassFromState(state: StringSuggestionState): string | undefined {
        switch (state) {
            case StringSuggestionState.Created:
                return 'badge-secondary';
            case StringSuggestionState.ApprovedByReviewer:
            case StringSuggestionState.ApprovedByTrustedUser:
                return 'badge-success';
            case StringSuggestionState.Rejected:
                return 'badge-danger';
            case StringSuggestionState.DeletedByOwner:
                return 'badge-dark';
        }
    }

    private StateToString(name: StringSuggestionState): string {
        return suggestionStateToString(name);
    }

    private suggestionHistoryTypeToString(historyType: SuggestionHistoryType): string {
        return suggestionHistoryTypeToString(historyType);
    }

    private GetSiteDomain(): string {
        const config = this.$store.getters.GetConfig;
        if (config === undefined) {
            return '';
        } else {
            return config.siteDomain;
        }
    }
}
</script>

