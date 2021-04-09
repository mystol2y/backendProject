import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const axios = require("axios");
export default new Vuex.Store({
    state: {
        nav: {
            home: true,
            news: true,
            activity: true,
            permission: true,
            register: true,
            login: true,
            logout: false,
        },
        profile: "",
        content: "",
        news: "",
        edit_event: "",
        admin: ""
    },
    mutations: {
        setAdmin(state, array) {
            state.admin = array;
        },
        unsetAdmin(state) {
            state.admin = ""
        },
        setProfile(state, array) {
            state.profile = array;
        },
        addContent(state, content) {
            state.content = content
        },
        addNews(state, news) {
            state.news = news
        },
        addEditEvents(state, events) {
            state.edit_event = events
        }
    },

    actions: {
        addAdmin(context, array) {
            // console.log(array);
            context.commit('setAdmin', array);
        },
        removeAdmin(context) {
            // console.log(array);
            context.commit('unsetAdmin');
        },
        addProfile(context, array) {
            // console.log(array);
            context.commit('setProfile', array);
        },
        removeProfile(context) {
            context.commit('unsetProfile');
        },
        addContent(context, content) {
            // console.log(content);
            context.commit('addContent', content);
            // alert('content');
        },
        addNews(context, news) {
            // console.log(content);
            context.commit('addNews', news);
            // alert('content');
        },
        addEditEvents(context, events) {
            // console.log(content);
            context.commit('addEditEvents', events);
            // alert('content');
        }
    },
    modules: {},
    getters: {
        getProfile(state) {
            return state.profile
        },
        getNav(state) {
            return state.nav
        },
        getContent(state) {
            return state.content
        },
        getNews(state) {
            return state.news
        },
        getEditEvents(state) {
            return state.edit_event
        },
        getAdmin(state) {
            return state.admin
        }
    }
})