<template>
  <mdb-container>
    <the-spinner v-if="!isSummaryLoaded"></the-spinner>
    <div v-else>
      <mdb-row>
        <mdb-col sm="12">
          <mdb-card>
            <mdb-card-body cascade>
              <h5 class="blue-text pb-2 pt-1">
                <mdb-icon icon="globe-americas" /> CASES AROUNT THE WORLD
              </h5>
              <h5 class="pink-text pb-2 pt-1">
                <mdb-icon far icon="calendar-alt" /> Updated :
                {{ summaryCasesWorld.dateUpdate }}
              </h5>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
      <mdb-row class="my-4">
        <custom-chart-summary
          v-for="chart in dataCharts"
          :key="chart.title"
          :title="chart.title"
          :dataChart="chart.dataChart"
        ></custom-chart-summary>
      </mdb-row>
      <mdb-row class="my-3">
        <mdb-col sm="4">
          <card-case
            :title="'Confirmed Case'"
            :image="'/assets/confirm.jpg'"
            :cases="summaryCasesWorld.confirmed"
          ></card-case>
        </mdb-col>
        <mdb-col sm="4">
          <card-case
            :title="'Death Case'"
            :image="'/assets/death.jpg'"
            :cases="summaryCasesWorld.death"
          ></card-case>
        </mdb-col>
        <mdb-col sm="4">
          <card-case
            :title="'Recovered Case'"
            :image="'/assets/recovered.jpg'"
            :cases="summaryCasesWorld.recovered"
          ></card-case>
        </mdb-col>
      </mdb-row>
    </div>
  </mdb-container>
</template>
<script>
import CardCase from "../components/custom-cards/CardCase.vue";
import TheSpinner from "../components/TheSpinner.vue";
import CustomChartSummary from "../components/custom-charts/CustomChartSummary.vue";

import { mapGetters } from "vuex";

export default {
  components: { CardCase, TheSpinner, CustomChartSummary },
  name: "Home",
  data() {
    return {
      dataCharts: [],
    };
  },
  computed: {
    ...mapGetters(["summaryCasesWorld", "isSummaryLoaded", "statusCode"]),
  },
  methods: {
    initDataCharts() {
      const summaryCasesWorld = this.$store.getters.summaryCasesWorld;
      this.dataCharts.push({
        title: "New Cases",
        dataChart: {
          death: summaryCasesWorld.death[0].count,
          confirmed: summaryCasesWorld.confirmed[0].count,
          recovered: summaryCasesWorld.recovered[0].count,
        },
      });
      this.dataCharts.push({
        title: "Total Cases",
        dataChart: {
          death: summaryCasesWorld.death[1].count,
          confirmed: summaryCasesWorld.confirmed[1].count,
          recovered: summaryCasesWorld.recovered[1].count,
        },
      });
    },
  },
  async mounted() {
    await this.$store.dispatch("loadSummaryCases");
    this.initDataCharts();
  },
};
</script>