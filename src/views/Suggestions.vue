<template>
  <div>
      <SuggestionsFilters />
      <hr/>
      <SuggestionsTable />
  </div>
</template>

<script lang="ts">
import SuggestionsFilters from '@/components/suggestions/SuggestionsFilters.vue';
import SuggestionsTable from '@/components/suggestions/SuggestionsTable.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    SuggestionsFilters,
    SuggestionsTable
  }
})
export default class Suggestions extends Vue {

}
</script>

