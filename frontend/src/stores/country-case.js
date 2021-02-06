import $axios from '../config/axios';
import { v4 as uuidv4 } from 'uuid';

const countryCaseModule = {
    state: {
        cases: [],
        summary: {
            dateUpdate: null,
            confirmed: null,
            death: null,
            recovered: null
        },
        isLoaded: {
            cases: false,
            summary: false
        },
    },
    getters: {
        cases: state => {
            return state.cases;
        },
        isLoaded: state => {
            return state.isLoaded;
        },
        summary: state => {
            return state.summary;
        },
    },
    mutations: {
        setCases(state, payload) {

        },
        setSummary(state, payload) {

        },
        setLoading(state, payload) {
            if (payload.hasOwnProperty('cases')) {
                state.isLoaded.cases = payload.cases;
            }
            if (payload.hasOwnProperty('summary')) {
                state.isLoaded.summary = payload.summary;
            }
        }
    },
    actions: {
        loadCase({ commit }) {
            $axios
                .get('/cases/summaries')
                .then(response => response.data)
                .then(items => {
                    commit('setCasesWorld', items)
                })
        },
        loadSummary({ commit }) {
            $axios
                .get('/cases/summaries')
                .then(response => response.data)
                .then(items => {
                    commit('setCasesWorld', items)
                })
        }
    },
}

export default countryCaseModule