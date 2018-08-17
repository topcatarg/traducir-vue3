<template>
  
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"/>
      <b-navbar-brand to="/" exact>
      {{Config.friendlyName}} 
      Translations 🦄 
      {{UserName}}
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/g3rv4/Traducir" target="_blank">Main source code</b-nav-item>
          <b-nav-item href="https://github.com/topcatarg/traducir-vue3" target="_blank">This source code</b-nav-item>
          <b-nav-item to="/Users">Users</b-nav-item>
          <b-nav-item to="/Suggestions">My suggestions</b-nav-item>
          <b-nav-item to="/" exact>Login!</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      </b-navbar>
  </div>
</template>


<script lang="ts">
// import IConfig from '@/models/Config.ts';
import IConfig from '@/models/Config';
import IuserInfo from '@/models/UserInfo';
import store from '@/store';
import axios from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator';

const AppProps = Vue.extend({
  props: {
    // config: Object as () => IConfig
    // config : {IConfig: {Object}}
  }
});

@Component
export default class PersonalHeader extends AppProps {
  public async mounted(): Promise<void> {
    store.dispatch('me');
    store.dispatch('config');
    store.dispatch('stats');
  }
  get Config(): IConfig {
    return this.$store.getters.GetConfig;
  }
  get User(): IuserInfo {
    return this.$store.getters.GetUser;
  }
  get UserName(): string {
      if (this.User === undefined) {
        return 'nadie';
      }
      return this.User.name;
  }
}
</script>