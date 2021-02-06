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
        countries: []
    },
    getters: {
        summaryCasesWorld: state => {
            return state.summaryCasesWorld;
        },
        countryCases: state => {
            return state.countries;
        },
        countryCasesLimit: (state) => (start, end) => {
            return state.countries.slice(start, end)
        }
    },
    mutations: {
        setCasesWorld(state, payload) {
            const global = payload.global
            state.summaryCasesWorld.dateUpdate = global.HumanDate
            state.countries = payload.countries
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
        }
    },
    actions: {
        loadCasesWorld({ commit }) {
            $axios
                .get('/cases/summaries')
                .then(response => response.data)
                .then(items => {
                    commit('setCasesWorld', items)
                })
        }
    },
}

export default casesModule