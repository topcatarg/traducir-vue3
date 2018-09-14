<template>
    <div class="container">
        <b-table hover :items="SOStrings" :fields="fields" 
            class="mx-auto mytable" @row-clicked="onClickRow">
            <template slot="HEAD_originalString" slot-scope="data">
                <!-- A custom formatted header cell for field 'name' -->
                <div class="text-left">String</div>
            </template>
            <template slot="originalString" slot-scope="data">
                <div class="text-left">
                    {{data.item.originalString}}
                </div>
            </template>
            <template slot="translation" slot-scope="data">
                <template v-if="data.item.translation!==null">
                    {{data.item.translation}}
                </template>
                <template v-else-if="!GetUserLogedin || !GetTrustedUser">
                </template>
                <template v-else>
                    <template v-if="data.item.isIgnored">
                        <b-button :size="sm" :variant="warning">Stop ignoring</b-button>
                    </template>
                    <template v-else>
                        <b-button size="sm" variant="warning">Ignore!</b-button>
                    </template>
                </template>
            </template>
            <template slot="suggestions" slot-scope="data">
                <span v-if="NumberOfApproved(data.item.suggestions)>0" class="text-success">
                    {{ NumberOfApproved(data.item.suggestions) }}
                </span>
                <span v-if="NumberOfApproved(data.item.suggestions)>0 && NumberOfPending(data.item.suggestions)>0">
                    -
                </span>
                <span v-if="NumberOfPending(data.item.suggestions)>0" class="text-danger">
                    {{ NumberOfPending(data.item.suggestions) }}
                </span>
            </template>
        </b-table>
    </div>
</template>
<script lang="ts">
import ITableFields from '@/Helpers/Tables/ITableFields';
import ISOString from '@/models/ISOString';
import store from '@/store';
import * as _ from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ISOStringSuggestion, { StringSuggestionState } from '../models/ISOStringSuggestion';

@Component
export default class Results extends Vue {
    private fields: ITableFields[] = [];

    constructor() {
        super();
        this.fields.push( {
            key: 'originalString',
            label: 'String'
        });
        this.fields.push( {
            key: 'translation',
            label: 'Translation'
        });
        this.fields.push( {
            key: 'suggestions',
            label: 'Suggestions'
        });
    }

    private get SOStrings(): ISOString[] {
        return this.$store.getters.GetSOStrings;
    }

    private get GetUserLogedin(): boolean {
        return this.$store.getters.GetUserLogedin;
    }

    private get GetTrustedUser(): boolean {
        return this.$store.getters.GetTrustedUser;
    }

    private NumberOfApproved(suggestions: ISOStringSuggestion[]): number {
        return _.filter(suggestions, s => s.state === StringSuggestionState.ApprovedByTrustedUser).length;
    }

    private NumberOfPending(suggestions: ISOStringSuggestion[]): number {
        return _.filter(suggestions, s => s.state === StringSuggestionState.Created).length;
    }

    private onClickRow(item: ISOString): void {
        // Get this data to the store

        // emit to parent to change the control to show
        this.$emit('row-clicked');
    }
}
</script>

<style>
.mytable thead {
    background: rgb(233,236,239);
}
</style>