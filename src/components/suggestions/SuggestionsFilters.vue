<template>
    <div class="container mt-3">
        <b-button-group>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id">All</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=1'">Created</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=2'">Approved by a trusted user</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=3'">Approved by a reviewer</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=4'">Rejected</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=5'">Deleted by owner</b-button>
            <b-button class="mx-1" variant="outline-info" :to="'/Suggestions/' + User.id + '?state=6'">Dismissed by other string</b-button>
        </b-button-group>
    </div>
</template>
<script lang="ts">
import IuserInfo from '@/models/UserInfo';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SuggestionsFilters extends Vue {

    get User(): IuserInfo {
        return this.$store.getters.GetUser;
    }
}
</script>

