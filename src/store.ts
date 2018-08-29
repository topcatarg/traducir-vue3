import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import IConfig from './models/Config';
import QueryViewModel from './models/QueryViewModel';
import IStats from './models/Stats';
import IuserInfo from './models/UserInfo';
import { userTypeToString } from './models/UserType';

Vue.use(Vuex);

export interface State {
  Config?: IConfig|undefined;
  userData?: IuserInfo;
  stats?: IStats;
  QueryViewModel: QueryViewModel;
}

export const OriginalState: State = {
  Config: undefined,
  userData: undefined,
  stats: undefined,
  QueryViewModel: {
    SourceRegex: '',
    TranslationRegex: '',
    Key: '',
    TranslationStatus: 0,
    SuggestionsStatus: 0,
    PushStatus: 0,
    UrgencyStatus: 0,
    IgnoredStatus: 0
  }
};

export default new Vuex.Store({
  state: OriginalState,
  mutations: {
    SetUser(state, newstate: IuserInfo) {
      state.userData = newstate;
    },
    SetConfig(state, newstate: IConfig) {
      state.Config = newstate;
    },
    SetStats(state, newstate: IStats) {
      state.stats = newstate;
    },
    SetQueryViewModel(state, newstate: QueryViewModel) {
      state.QueryViewModel = newstate;
    }
  },
  actions: {
    me(context) {
      Axios.post<IuserInfo>(process.env.VUE_APP_API_URI + 'me', { }, {withCredentials: true})
      .then(data => {
        context.commit('SetUser', data.data);
      })
      .catch(error => context.commit('SetUser', undefined));
    },
    config(context) {
      Axios.get<IConfig>(process.env.VUE_APP_API_URI + 'config')
      .then(response => context.commit('SetConfig', response.data))
      .catch(error => context.commit('SetConfig', undefined));
    },
    stats(context) {
      Axios.get<IStats>(process.env.VUE_APP_API_URI + 'strings/stats')
            .then(response => context.commit('SetStats', response.data))
            .catch(error => context.commit('SetStats', undefined));
    },
    SetQueryViewModel(context, param: QueryViewModel) {
      context.commit('SetQueryViewModel', param);
    }
  },
  getters: {
    GetConfig: state => {
      return state.Config;
    },
    GetUser: state => {
      return state.userData;
    },
    GetStats: state => {
      return state.stats;
    },
    GetConfigfriendlyName: state => {
      if (state.Config !== undefined) {
        return state.Config.friendlyName;
      }
      return '';
    },
    GetUserName: state => {
      if (state.userData !== undefined) {
        return state.userData.name;
      }
      return '';
    },
    GetUserLogedin: state => {
        return state.userData !== undefined;
    },
    GetUserType: state => {
      return state.userData !== undefined ?
      userTypeToString(state.userData.userType) :
      '';
    },
    GetStatstotalStrings: state => {
      return state.stats !== undefined ?
      state.stats.totalStrings :
      0;
    },
    GetStatsurgentStrings: state => {
      return state.stats !== undefined ?
      state.stats.urgentStrings :
      0;
    },
    GetStatswaitingApproval: state => {
      return state.stats !== undefined ?
      state.stats.waitingApproval :
      0;
    },
    GetStatswithoutTranslation: state => {
      return state.stats !== undefined ?
      state.stats.withoutTranslation :
      0;
    },
    GetStatswaitingReview: state => {
      return state.stats !== undefined ?
      state.stats.waitingReview :
      0;
    },
    GetQueryViewModel: state => {
      return state.QueryViewModel;
    }
  }
});
