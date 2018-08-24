<template>
  <div>
      <Filters class="mt-2"/>
      
      <StatComponent />
  </div>
</template>
<script lang="ts">
import Filters from '@/components/Filters.vue';
import StatComponent from '@/components/Stats.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    StatComponent,
    Filters
  }
})
export default class Main extends Vue {
}
</script>