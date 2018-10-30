import ISOString from '@/models/ISOString';
import ISOStringToTranslate, {SOStringToTranslate, SoStringToTranslateClass} from '@/models/ISOStringToTranslate';
import EditingStringVM from '@/ViewModels/EditingStringVM';
import Axios from 'axios';
import * as _ from 'lodash';
import Vue from 'vue';
import Vuex from 'vuex';
import IConfig from './models/Config';
import QueryViewModel from './models/QueryViewModel';
import IStats from './models/Stats';
import IuserInfo from './models/UserInfo';
import { UserType, userTypeToString } from './models/UserType';

Vue.use(Vuex);

export interface State {
  // Config?: IConfig | undefined;
  // userData?: IuserInfo;
  // stats?: IStats;
  HasError: boolean;
  // SOStrings: ISOString[];
  StringToEdit?: ISOString;
}

export const OriginalState: State = {
  // Config: undefined,
  // userData: undefined,
  // stats: undefined,
  HasError: false,
  // SOStrings: [],
  StringToEdit: undefined
};

export default new Vuex.Store({
  state: OriginalState,
  mutations: {
    SetUser(state, newstate: IuserInfo) {
      state.userData = newstate;
    },
    SetStats(state, newstate: IStats) {
      state.stats = Object.assign({}, newstate);
      // state.stats = newstate;
    },
    SetSOStrings(state, newstate: ISOString[]) {
      // state.SOStrings = Object.assign({}, newstate);
      state.SOStrings = newstate;
    },
    SetHasError(state, newstate: boolean) {
      state.HasError = newstate;
    },
    SetStringToEdit(state, newstate: ISOString) {
      state.StringToEdit = Object.assign({}, newstate);
    }
  },
  actions: {
    me(context) {
      Axios.post<IuserInfo>(process.env.VUE_APP_API_URI + 'me', {}, { withCredentials: true })
      // Axios.post<IuserInfo>('app/me', {}, { withCredentials: true })
        .then(data => {
          context.commit('SetUser', data.data);
        })
        .catch(error => context.commit('SetUser', undefined));
    },
    config(context) {
      Axios.get<IConfig>(process.env.VUE_APP_API_URI + 'config')
      // Axios.get<IConfig>('/app/api/config')
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
      Axios.post<ISOString[]>(process.env.VUE_APP_API_URI + 'strings/query',
        param, { withCredentials: true })
        .then(response => {
          context.commit('SetSOStrings', response.data);
          context.commit('SetHasError', false);
        });
    },
    async RefreshString(context, StringId: number) {
      const r = await Axios.get<ISOString>(process.env.VUE_APP_API_URI + `strings/` + StringId);
      await context.dispatch('updateStrings', [r.data]);
    },
    async updateStrings(context, strs: ISOString[]): Promise<void> {
      const newStrings = context.state.SOStrings.slice();
      for (const str of strs) {
        const idx = _.findIndex(newStrings, s => s.id === str.id);
        if (idx === -1) {
            continue;
        }
        str.touched = true;
        newStrings[idx] = str;
      }
      context.commit('SetStringToEdit', strs.length === 1 ? strs[0] : undefined);
      context.commit('SetSOStrings', newStrings);
      context.dispatch('stats');
    },
    async postSuggestion(context, data: EditingStringVM ): Promise<void> {
      if (context.state.StringToEdit === undefined) {
        return;
      }
      try {
        await Axios.put(process.env.VUE_APP_API_URI + 'suggestions', {
            Approve: data.Approve,
            RawString: data.RawString,
            StringId: context.state.StringToEdit.id,
            Suggestion: data.Suggestion
        }, { withCredentials: true });
        context.dispatch('RefreshString', context.state.StringToEdit.id);
      } catch (e) {
        context.commit('SetHasError', true);
      }
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
    GetTrustedUser: state => {
      return state.userData !== undefined ?
      state.userData.userType >= UserType.TrustedUser :
      false;
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
    GetHasResults: state => {
      return state.SOStrings.length > 0;
    },
    GetSOStrings: state => {
      return state.SOStrings;
    },
    GetStringToEdit: state => {
      return state.StringToEdit;
    }
  }
});
