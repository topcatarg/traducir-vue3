import QueryViewModel from '@/models/QueryViewModel';
import Vue from 'vue';
import Vuex from 'vuex';
import { ActionTree, MutationTree } from 'vuex';
import { Module } from 'vuex';
import { getters } from './Getters';
import { mutations } from './Mutations';
import { state } from './State';

const namespaced: boolean = true;

export const QueryViewModelStore: Module<QueryViewModel, undefined> = {
    namespaced,
    state,
    getters,
    mutations
};
