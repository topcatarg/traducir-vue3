<template>
  <div class="container mt-2">
      <h2>Users</h2>
      <UsersList/>
  </div>
</template>
<script lang="ts">
import UsersList from '@/components/UsersList.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components : {
    UsersList
  }
})
export default class Users extends Vue {
}
</script>