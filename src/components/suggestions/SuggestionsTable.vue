<template>
    <div class="container">
        {{this.suggestions.length}}
        <b-container v-if="this.suggestions.length === 0" class="mx-auto mt-5 w-50 p-3 text-center">
            <b-row>
                <b-col>No results (sad trombone)</b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script lang="ts">
import ISOStringSuggestion from '@/models/ISOStringSuggestion';
import Axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

interface ISuggestionState {
    state: number | undefined;
}

@Component
export default class SuggestionsTable extends Vue {

    private suggestions?: ISOStringSuggestion[];

    private beforeUpdate() {
        // console.log(this.$route);
        this.userChanged();
    }

    private async userChanged(): Promise<void> {
        const userId = this.$route.params[0];
        const parts: number = parseInt(this.$route.query.state, undefined);
        // console.log('user: ' + userId);
        // console.log('query: ' + parts);
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
}
</script>

