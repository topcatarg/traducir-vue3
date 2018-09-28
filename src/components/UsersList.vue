<template>
        <b-table hover :items="SOStrings" :fields="fields" 
            class="mx-auto mytable" @row-clicked="onClickRow">
            <template slot="HEAD_User" slot-scope="data">
                <!-- A custom formatted header cell for field 'name' -->
                <div class="text-left">User</div>
            </template>
            <template slot="HEAD_Role" slot-scope="data">
                <!-- A custom formatted header cell for field 'name' -->
                <div class="text-left">Role</div>
            </template>
            <template slot="User" slot-scope="data">
                <div class="text-left">
                    {{data.item.originalString}}
                </div>
            </template>
            <template slot="Role" slot-scope="data">
                <template v-if="data.item.translation!==null">
                    {{data.item.translation}}
                </template>
                <template v-else-if="!GetUserLogedin || !GetTrustedUser">
                </template>
                <template v-else>
                    <template v-if="data.item.isIgnored">
                        <b-button :size="sm" :variant="warning">Stop ignoring</b-button>
                    </template>
                    <template v-else>
                        <b-button size="sm" variant="warning">Ignore!</b-button>
                    </template>
                </template>
            </template>
        </b-table>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersList extends Vue {}
</script>
