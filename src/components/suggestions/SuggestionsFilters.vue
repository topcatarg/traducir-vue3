<template>
    <div class="container mt-3">
        <b-button-group>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId()">All</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=1'">Created</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=2'">Approved by a trusted user</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=3'">Approved by a reviewer</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=4'">Rejected</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=5'">Deleted by owner</b-button>
            <b-button exact class="mx-1" variant="outline-info" :to="'/Suggestions/' + GetUserId() + '?state=6'">Dismissed by other string</b-button>
        </b-button-group>
    </div>
</template>
<script lang="ts">
import IuserInfo from '@/models/UserInfo';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class SuggestionsFilters extends Vue {

    private GetUserId(): string {
        return this.$route.params[0];
    }

}
</script>

