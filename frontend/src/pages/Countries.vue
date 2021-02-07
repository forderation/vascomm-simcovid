<template>
  <mdb-container>
    <mdb-row>
      <mdb-col sm="12">
        <mdb-card>
          <mdb-card-body cascade>
            <h5 class="blue-text pb-2 pt-1">
              <mdb-icon icon="globe-americas" /> RECENT UPDATE CASES BY COUNTRY
            </h5>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="20">
      <mdb-row class="mt-4">
        <card-country-case
          v-for="(country, index) in countryCases"
          :key="index"
          :id="country.ID"
          :nameCountry="country.Country"
          :countryCode="country.CountryCode"
          :confirmed="country.TotalConfirmed"
          :recovered="country.TotalRecovered"
        ></card-country-case>
      </mdb-row>
    </div>
    <div class="mt-4" v-if="!isSummaryLoaded">
      <the-spinner></the-spinner>
    </div>
  </mdb-container>
</template>
<script>
import CardCountryCase from "../components/custom-cards/CardCountryCase.vue";
// import { mapGetters } from "vuex";
import TheSpinner from "../components/TheSpinner.vue";

export default {
  components: { CardCountryCase, TheSpinner },
  name: "Countries",
  data() {
    return {
      limit: 6,
      busy: this.isSummaryLoaded ? false : true,
    };
  },
  computed: {
    countryCases() {
      return this.$store.state.casesModule.countries;
    },
    isSummaryLoaded() {
      return this.$store.getters.isSummaryLoaded;
    },
    getError() {
      return this.$store.getters.getErrorCountryCase;
    },
  },
  watch: {
    getError(newError) {
      if (newError != null) {
        this.$toasted.show("Sorry something wrong, please try again!", {
          theme: "bubble",
          position: "bottom-center",
          duration: 5000,
        });
      }
    },
  },
  methods: {
    loadMore() {
      const payload = {
        start: this.countryCases.length,
        end: this.countryCases.length + this.limit,
      };
      this.$store.dispatch("loadCountries", payload);
    },
  },
  mounted() {
    this.loadMore();
  },
  beforeRouteLeave(_, _2, next) {
    this.$store.commit("resetStateCountries");
    next();
  },
};
</script>