import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { ConfigStore} from './Config/Store';
import { QueryViewModelStore } from './QueryViewModel/Store';

Vue.use(Vuex);

const store: StoreOptions<undefined> = {
    modules: {
        QueryViewModel: QueryViewModelStore,
        Config: ConfigStore
    }
};

export default new Vuex.Store<undefined>(store);
