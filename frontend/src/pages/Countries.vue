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
    <mdb-row class="mt-4" data-aos="fade-in">
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

export default {
  components: { CardCountryCase },
  name: "Countries",
  data() {
    return {
      isLoaded: true,
      countries: [],
    };
  },
  computed: {
    ...mapGetters(["countryCases"]),
  },
  mounted() {
    this.$store.dispatch("loadCasesWorld");
  },
};
</script>