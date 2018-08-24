<template>
    <div>
        <div className="m-2 text-center">
            <h2>Filters</h2>
        </div>
        <b-container>
            <b-row>
                <b-col>
                    Source Regex
                    <b-form-input 
                        type="text"
                        placeholder="^question"
                    />
                </b-col>
                <b-col>
                    Translation Regex
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Strings without translation
                </b-col>
                <b-col>
                    Strings with pending suggestions
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    Key
                </b-col>
                <b-col>
                    Strings with urgency status
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script lang="ts">
import store from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Filters extends Vue {
}
</script>