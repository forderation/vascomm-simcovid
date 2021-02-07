import $axios from '../config/axios'

const countryCaseModule = {
    state: {
        countryCode: null,
        casesCountry: [],
        summary: {},
        countryIsLoaded: {
            cases: false,
            summary: false
        },
        error: null,
    },
    getters: {
        getCases: (state) => {
            return state.casesCountry
        },
        getCountryCode: (state) => {
            return state.countryCode
        },
        getIsLoadedCase: (state) => {
            return state.countryIsLoaded.cases
        },
        getIsLoadedSummary: (state) => {
            return state.countryIsLoaded.summary
        },
        getErrorCountryCase: (state) => {
            return state.error;
        },
        getSummary: (state) => {
            return state.summary
        },
        getDataChartCases: (state) => {
            const chartData = {
                datasets: {
                    confirmed: [],
                    deaths: [],
                    recovered: [],
                },
                labels: [],
            }
            state.casesCountry.forEach(function (itemCase) {
                chartData.labels.push(itemCase.HumanDate)
                chartData.datasets.confirmed.push(itemCase.Confirmed)
                chartData.datasets.deaths.push(itemCase.Deaths)
                chartData.datasets.recovered.push(itemCase.Recovered)
            })
            return chartData
        }
    },
    mutations: {
        setCases(state, payload) {
            state.casesCountry = payload
        },
        setCountryCode(state, payload) {
            state.countryCode = payload
        },
        setSummary(state, payload) {
            state.summary = payload.country
        },
        setLoading(state, payload) {
            if (payload.hasOwnProperty('cases')) {
                state.countryIsLoaded.cases = payload.cases
            }
            if (payload.hasOwnProperty('summary')) {
                state.countryIsLoaded.summary = payload.summary
            }
        },
        setError(state, payload) {
            state.error = payload.error
        }
    },
    actions: {
        loadCase({commit, getters, rootState}) {
            commit('setLoading', {cases: false})
            return $axios
                .get('/country/cases/' + getters.getCountryCode, {
                    headers: {Authorization: `Bearer ${rootState.loginUser.idToken}`}
                })
                .catch(error => {
                    commit('setError', {error: error})
                })
                .then(response => response.data)
                .then(items => {
                    commit('setCases', items)
                })
                .finally(() => commit('setLoading', {cases: true}))
        },
        loadSummary({commit, getters, rootState}) {
            commit('setLoading', {summary: false})
            return $axios
                .get('/cases/summary/' + getters.getCountryCode, {
                    headers: {Authorization: `Bearer ${rootState.loginUser.idToken}`}
                })
                .then(response => response.data)
                .then(items => {
                    commit('setSummary', items)
                })
                .catch((error) => {
                    commit('setError', {error: error})
                })
                .finally(() => commit('setLoading', {summary: true}))
        }
    },
}

export default countryCaseModule