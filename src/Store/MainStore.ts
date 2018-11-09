import { NotificationStore } from '@/Store/Notifications/Store';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { ConfigStore} from './Config/Store';
import { QueryViewModelStore } from './QueryViewModel/Store';
import { SOStringsStore } from './SOStrings/Store';
import { StatsDataStore } from './Stats/Store';
import { UserDataStore } from './UserData/Store';

Vue.use(Vuex);

const store: StoreOptions<undefined> = {
    modules: {
        QueryViewModel: QueryViewModelStore,
        Config: ConfigStore,
        UserData: UserDataStore,
        Stats: StatsDataStore,
        SOStrings: SOStringsStore,
        Notifications: NotificationStore
    }
};

export default new Vuex.Store<undefined>(store);
