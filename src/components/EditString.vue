<template>
    <div>
        <b-button @click="$emit('back-editing')">
            Back
        </b-button>
        editing
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class EditString extends Vue {
}
</script>
