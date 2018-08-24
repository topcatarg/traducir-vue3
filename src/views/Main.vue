<template>
  <div>
      Main 
      <StatComponent />
  </div>
  
</template>
<script lang="ts">
import StatComponent from '@/components/Stats.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    StatComponent
  }
})
export default class Main extends Vue {
}
</script>