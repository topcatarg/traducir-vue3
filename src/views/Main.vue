<template>
  <div>
      <Filters class="mt-2"/>
      
      <StatComponent class="mt-4" v-if="!this.WithResults" />

      <Results class="mt-4" v-if="this.WithResults" />
  </div>
</template>
<script lang="ts">
import Filters from '@/components/Filters.vue';
import Results from '@/components/Results.vue';
import StatComponent from '@/components/Stats.vue';
import store from '@/store';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    StatComponent,
    Filters,
    Results
  }
})
export default class Main extends Vue {
  private get WithResults(): boolean {
    return this.$store.getters.GetHasResults;
  }
}
</script>