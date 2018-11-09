<template>
  <div>
      <transition name="custom-results-transition"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated bounceOutLeft">
        <Filters class="mt-2" v-if="this.searching"/>
      </transition>
      <transition name="custom-results-transition"
          enter-active-class="animated fadeInRight"
          leave-active-class="animated bounceOutRight">
        <StatComponent key="stats" class="mt-4" v-if="!this.WithResults && this.searching" />
      </transition>      
      <transition name="custom-results-transition"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated bounceOutLeft">
        <Results 
            key="results" 
            class="mt-4" 
            v-if="this.WithResults && this.searching" 
            @row-clicked="onRowPress"/>
      </transition>
      <transition name="custom-results-transition"
        enter-active-class="animated fadeInRight"
        leave-active-class="animated bounceOutRight">
        <EditString 
          v-if="!this.searching"
          @back-editing="onEditingBack"/>
      </transition>
  </div>
</template>
<script lang="ts">
import EditString from '@/components/EditString.vue';
import Filters from '@/components/Filters.vue';
import Results from '@/components/Results.vue';
import StatComponent from '@/components/Stats.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    StatComponent,
    Filters,
    Results,
    EditString
  }
})
export default class Main extends Vue {

  private searching: boolean = true;

  private get WithResults(): boolean {
    return this.$store.getters['SOStrings/HasResults'];
  }

  private onRowPress(): void {
    this.searching = false;
  }

  private onEditingBack(): void {
    this.searching = true;
  }
}
</script>

