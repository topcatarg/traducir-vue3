import PDeleteReview from '@/Helpers/Params/DeleteReview';
import PProcessReview from '@/Helpers/Params/ProcessReview';
import PSetUrgency from '@/Helpers/Params/SetUrgency';
import ISOString from '@/models/ISOString';
import QueryViewModel from '@/models/QueryViewModel';
import { IState } from '@/Store/SOStrings/State';
import EditingStringVM from '@/ViewModels/EditingStringVM';
import Axios from 'axios';
import _ from 'lodash';
import { ActionTree } from 'vuex';

export const actions: ActionTree<IState, undefined> = {
  FillSOStrings(context, param: QueryViewModel) {
    Axios.post<ISOString[]>(process.env.VUE_APP_API_URI + 'strings/query',
      param, { withCredentials: true })
      .then(response => {
        context.commit('SetState', response.data);
        // context.commit('SetHasError', false);
      });
  },
  async SetUrgency(context, param: PSetUrgency) {
    try {
      await Axios.put(process.env.VUE_APP_API_URI + 'manage-urgency',
        param,
        { withCredentials: true });
      context.dispatch('RefreshString', param.StringId);
      /*if (this.props.str) {
          this.props.refreshString(this.props.str.id);
      }*/
    } catch (e) {
      /* if (e.response.status === 400) {
          this.props.showErrorMessage("Failed updating the urgency... maybe a race condition?");
      } else {
          this.props.showErrorMessage(e.response.status);
      }*/
    }
  },
  async RefreshString(context, StringId: number) {
    const r = await Axios.get<ISOString>(process.env.VUE_APP_API_URI + `strings/` + StringId);
    await context.dispatch('updateStrings', [r.data]);
  },
  async updateStrings(context, strs: ISOString[]): Promise<void> {
    const newStrings = context.state.ISOString.slice();
    for (const str of strs) {
      const idx = _.findIndex(newStrings, s => s.id === str.id);
      if (idx === -1) {
          continue;
      }
      str.touched = true;
      newStrings[idx] = str;
    }
    context.commit('StringToEdit', strs.length === 1 ? strs[0] : undefined);
    context.commit('SetState', newStrings);
    context.dispatch('Stats/stats', {}, {root : true});
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
  },
  async DeleteReview(context, param: PDeleteReview): Promise<void> {
    try {
        await Axios.delete(process.env.VUE_APP_API_URI + 'suggestions/' + param.SuggestionId, {withCredentials: true});
        context.dispatch('RefreshString', param.StringId);
    } catch (e) {
        if (e.response.status === 400) {
            //  this.props.showErrorMessage("Error deleting the suggestion. Do you have enough rights?");
        } else {
            // this.props.showErrorMessage(e.response.status);
        }
    }
  },
  async processReview(context, param: PProcessReview): Promise<void> {
    try {
        await Axios.put(process.env.VUE_APP_API_URI + 'review', {
            Approve: param.action,
            SuggestionId: param.SuggestionId
        }, {withCredentials: true});
        context.dispatch('RefreshString', param.StringId);
        // history.push("/filters");
    } catch (e) {
        if (e.response.status === 400) {
            // this.props.showErrorMessage("Error reviewing the suggestion. Do you have enough rights?");
        } else {
            // this.props.showErrorMessage(e.response.status);
        }
    }
  }
};
