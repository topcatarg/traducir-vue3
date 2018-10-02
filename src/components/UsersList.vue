<template>
        <b-table hover :items="Users" :fields="fields" 
            class="mx-auto mytable">
            <template slot="HEAD_User" slot-scope="data">
                <!-- A custom formatted header cell for field 'name' -->
                <div class="text-left">User</div>
            </template>
            <template slot="HEAD_Role" slot-scope="data">
                <!-- A custom formatted header cell for field 'name' -->
                <div class="text-left">Role</div>
            </template>
            <template slot="displayName" slot-scope="data">
                <b-link :href="'https://' + GetConfig.siteDomain + '/users/' + data.item.id" target="_blank">
                    {{data.item.displayName}} {{data.item.isModerator ? "♦" : ""}}
                </b-link>
            </template>
            <template slot="role" slot-scope="data">
                {{UserType(data.item.userType)}}
            </template>
            <template v-if="GetUser.canManageUsers" slot="adminButtons" slot-scope="data">
                <b-button-group size="sm">
                    <b-button variant="link" :href="'/suggestions/' + data.item.id">View suggestions</b-button>
                    <b-button v-if="data.item.userType === UserType.User" variant="warning">Make trusted user</b-button>
                    <b-button v-if="data.item.userType === UserType.Banned" variant="warning">Lift Ban</b-button>
                    <b-button v-if="data.item.userType === UserType.TrustedUser" variant="danger">Make regular user</b-button>
                    <b-button 
                        v-if="data.item.userType !== UserType.Banned 
                            && data.item.userType !== UserType.TrustedUser 
                            && data.item.userType !== UserType.Reviewer 
                            && !data.item.isModerator" variant="danger">Ban User</b-button>
                </b-button-group>
            </template>
        </b-table>

</template>

<script lang="ts">
import ITableFields from '@/Helpers/Tables/ITableFields';
import IConfig from '@/models/Config';
import IUser from '@/models/User.ts';
import IUserInfo from '@/models/UserInfo';
import { UserType, userTypeToString } from '@/models/UserType';
import Axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersList extends Vue {

    private fields: ITableFields[] = [];
    private Users: IUser[] = [];

    public constructor() {
        super();
        this.fields.push( {
            key: 'displayName',
            label: 'User'
        });
        this.fields.push( {
            key: 'role',
            label: 'Role'
        });
        this.fields.push( {
            key: 'adminButtons',
            label: ''
        });
    }

    public mounted(): void {
        this.refreshUsers();
    }

    public async refreshUsers(): Promise<void> {
        try {
            const r = await Axios.get<IUser[]>(process.env.VUE_APP_API_URI + 'users', { withCredentials : true});
            this.Users = r.data;
        } catch (e) {
            /* if (e.response.status === 401) {
                history.push("/");
            } else {
                this.props.showErrorMessage(e.response.status);
            } */
        }
    }

    get GetConfig(): IConfig {
        return this.$store.getters.GetConfig;
    }

    get GetUser(): IUserInfo {
        return this.$store.getters.GetUser;
    }

    private UserType(uT: UserType): string {
        return userTypeToString(uT);
    }
}
</script>
