<template>
  <mdb-container>
    <mdb-row v-if="getIsLoaded">
      <mdb-col sm="12">
        <mdb-card>
          <mdb-view>
            <a href="#!">
              <img
                :src="countryFlag"
                alt="Card image cap"
                class="m-auto img-responsive p-5"
                height="300"
              />
              <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
            </a>
          </mdb-view>
          <mdb-card-body>
            <mdb-card-title class="m-4 pl-3">Country {{ getSummary.Country }} Case</mdb-card-title>
            <mdb-row class="m-4">
              <custom-chart-case
                v-for="chartData in chartSummaryData"
                :key="chartData.title"
                :title="chartData.title"
                :dataChart="chartData.dataChart"
              ></custom-chart-case>
            </mdb-row>
            <mdb-container v-if="!getIsLoaded.cases">
              <mdb-line-chart
                :data="lineChartData"
                :options="lineChartOptions"
                :height="400"
              ></mdb-line-chart>
            </mdb-container>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
    <the-spinner v-else></the-spinner>
  </mdb-container>
</template>

<script>
import CustomChartCase from "../components/custom-charts/CustomChartCase.vue";
import TheSpinner from "../components/TheSpinner.vue";
export default {
  components: { TheSpinner, CustomChartCase },
  data() {
    return {
      countryFlag: "",
      chartSummaryData: [],
      lineChartData: {},
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    getIsLoaded() {
      console.log(this.$store.getters.getIsLoadedCase);
      return this.$store.getters.getIsLoadedCase;
    },
    getSummary() {
      return this.$store.getters.getSummary;
    },
    getCountryCaseStatus() {
      const countryCaseStatus = this.$store.getters.getCountryCaseStatus;
      if (countryCaseStatus.cases != 200 || countryCaseStatus.summary != 200) {
        this.showToast("Something wrong, please try again!");
      }
      return countryCaseStatus;
    },
  },
  methods: {
    showToast(message) {
      this.$toasted.show(message, {
        theme: "bubble",
        position: "bottom-center",
        duration: 5000,
      });
    },
    loadSummaryChart() {
      const summary = this.$store.getters.getSummary;
      this.chartSummaryData = [
        {
          title: "New Case",
          dataChart: {
            death: summary.NewConfirmed,
            recovered: summary.NewDeaths,
            confirmed: summary.NewRecovered,
          },
        },
        {
          title: "Total Case",
          dataChart: {
            death: summary.TotalConfirmed,
            recovered: summary.TotalDeaths,
            confirmed: summary.TotalRecovered,
          },
        },
      ];
    },
    loadTimeLineChart() {
      const cases = this.$store.getters.getDataChartCases;
      this.countryFlag =
        "https://purecatamphetamine.github.io/country-flag-icons/3x2/" +
        this.$route.params.cid +
        ".svg";
      this.lineChartData = {
        labels: cases.labels,
        datasets: [
          {
            label: "Confirmed",
            backgroundColor: "rgba(255,224,130, 0.1)",
            borderColor: "rgba(255,224,130, 1)",
            borderWidth: 0.7,
            data: cases.datasets.confirmed,
          },
          {
            label: "Deaths",
            backgroundColor: "rgba(229,57,53,0.2)",
            borderColor: "rgba(229,57,53,1)",
            borderWidth: 0.8,
            data: cases.datasets.deaths,
          },
          {
            label: "Recovered",
            backgroundColor: "rgba(102,187,106, 0.2)",
            borderColor: "rgba(102,187,106,1)",
            borderWidth: 0.8,
            data: cases.datasets.recovered,
          },
        ],
      };
    },
  },
  async mounted() {
    this.$store.commit("setCountryCode", this.$route.params.cid);
    await this.$store.dispatch("loadCase");
    await this.$store.dispatch("loadSummary");
    this.loadTimeLineChart();
    this.loadSummaryChart();
  },
};
</script>