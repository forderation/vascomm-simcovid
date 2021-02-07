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
    <div class="mt-4" v-if="!isSummaryLoaded">
      <the-spinner></the-spinner>
    </div>
    <mdb-row v-else class="mt-4" data-aos="fade-in">
      <card-country-case
        v-for="country in countryCases"
        :key="country.ID"
        :id="country.ID"
        :nameCountry="country.Country"
        :countryCode="country.CountryCode"
        :confirmed="country.TotalConfirmed"
        :recovered="country.TotalRecovered"
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-delay="50"
        data-aos-duration="1000"
      ></card-country-case>
    </mdb-row>
  </mdb-container>
</template>
<script>
import CardCountryCase from "../components/custom-cards/CardCountryCase.vue";
import { mapGetters } from "vuex";
import TheSpinner from "../components/TheSpinner.vue";

export default {
  components: { CardCountryCase, TheSpinner },
  name: "Countries",
  data() {
    return {
      countries: [],
    };
  },
  computed: {
    ...mapGetters(["countryCases", "isSummaryLoaded"]),
  },
  async mounted() {
    this.$store.dispatch("loadCasesWorld");
  },
};
</script>