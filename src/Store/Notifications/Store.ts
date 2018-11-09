import { INotificationSettings } from '@/models/INotificationSettings';
import Vue from 'vue';
import Vuex from 'vuex';
import { ActionTree, MutationTree } from 'vuex';
import { Module } from 'vuex';
import { actions } from './Actions';
import { getters } from './Getters';
import { mutations } from './Mutations';
import { state } from './State';

const namespaced: boolean = true;

export const NotificationStore: Module<INotificationSettings, undefined> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
