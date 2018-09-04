<template>
  
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse" class="container"/>
      <b-navbar-brand to="/" exact>
      {{ConfigFriendlyName}} 
      Translations 🦄
      <span v-if="this.UserLogedin">
        {{UserName}}
        ({{UserType}})
      </span>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/g3rv4/Traducir" target="_blank">Main source code</b-nav-item>
          <b-nav-item href="https://github.com/topcatarg/traducir-vue3" target="_blank">This source code</b-nav-item>
          <b-nav-item to="/Users">Users</b-nav-item>
          <b-nav-item to="/Suggestions">My suggestions</b-nav-item>
          <b-nav-item :href="home + 'login?returnUrl=' + location" v-if="!this.UserLogedin">Log in!</b-nav-item>
          <b-nav-item :href="home + 'logout?returnUrl=' + location" v-if="this.UserLogedin">Log out</b-nav-item>
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

  private location: string = location.href;
  private home?: string = process.env.VUE_APP_BASE_URI;

  public mounted(): void {
    store.dispatch('me');
    store.dispatch('config');
    store.dispatch('stats');
  }

  get ConfigFriendlyName(): string {
    return this.$store.getters.GetConfigfriendlyName;
  }
  get UserName(): string {
    return this.$store.getters.GetUserName;
  }
  get UserLogedin(): boolean {
    return this.$store.getters.GetUserLogedin;
  }
  get UserType(): string {
    return this.$store.getters.GetUserType;
  }
  private Login(): void {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    axios.get(process.env.VUE_APP_BASE_URI + '/app/login');
  }
}
</script>