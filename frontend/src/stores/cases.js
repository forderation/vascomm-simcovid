import $axios from '../config/axios';
import { v4 as uuidv4 } from 'uuid';

const casesModule = {
    state: {
        summaryCasesWorld: {
            dateUpdate: null,
            confirmed: [],
            death: [],
            recovered: []
        },
        countries: [],
        isSummaryLoaded: false,
        error: null,
        maxLength: -1
    },
    getters: {
        summaryCasesWorld: (state) => {
            return state.summaryCasesWorld;
        },
        countryCases: (state) => {
            return state.countries;
        },
        isSummaryLoaded: (state) => {
            return state.isSummaryLoaded
        },
        stateError: (state) => {
            return state.error
        },
        maxLength: (state) => {
            return state.maxLength
        }
    },
    mutations: {
        setCasesWorld(state, payload) {
            const global = payload.global
            state.summaryCasesWorld.dateUpdate = global.HumanDate
            state.summaryCasesWorld.confirmed = [
                {
                    id: uuidv4(),
                    title: "New Confirmed",
                    count: global.NewConfirmed,
                },
                {
                    id: uuidv4(),
                    title: "Total Confirmed",
                    count: global.TotalConfirmed,
                },
            ]
            state.summaryCasesWorld.death = [
                {
                    id: uuidv4(),
                    title: "New Deaths",
                    count: global.NewDeaths,
                },
                {
                    id: uuidv4(),
                    title: "Total Deaths",
                    count: global.TotalDeaths,
                },
            ]
            state.summaryCasesWorld.recovered = [
                {
                    id: uuidv4(),
                    title: "New Recovered",
                    count: global.NewRecovered,
                },
                {
                    id: uuidv4(),
                    title: "Total Recovered",
                    count: global.TotalRecovered,
                },
            ]
        },
        setCountries(state, payload) {
            state.countries = state.countries.concat(payload.countries);
            state.maxLength = payload.length
        },
        resetStateCountries(state) {
            state.countries = [];
            state.maxLength = -1
            state.isSummaryLoaded = false;
        },
        setSummaryLoaded(state, payload) {
            state.isSummaryLoaded = payload.status;
        },
        setError(state, payload) {
            state.error = payload.status;
        }
    },
    actions: {
        loadSummaryCases({ commit }) {
            commit('setSummaryLoaded', { status: false })
            return $axios
                .get('/cases/summaries')
                .then(response => response.data)
                .then(items => {
                    commit('setCasesWorld', items)
                }).catch(error => {
                    commit('setError', { status: error })
                }).finally(() => {
                    commit('setSummaryLoaded', { status: true })
                })
        },
        loadCountries({ commit, getters }, payload) {
            const startIndex = payload.start
            const endIndex = payload.end
            const maxLength = getters.maxLength
            console.log(maxLength + "endIndex " + endIndex)
            if ((maxLength === -1 || endIndex <= maxLength) && getters.isSummaryLoaded) {
                commit('setSummaryLoaded', { status: false })
                return $axios
                    .get(`/country/countries?start=${startIndex}&end=${endIndex}`)
                    .then((response) => response.data)
                    .then((items) => {
                        commit('setCountries', items)
                    }).catch((error) => {
                        commit('setError', { status: error })
                    }).finally(() => {
                        commit('setSummaryLoaded', { status: true })
                    })
            }

        },
    },
}

export default casesModule