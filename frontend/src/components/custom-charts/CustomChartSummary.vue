<template>
  <mdb-col sm="6">
    <mdb-card>
      <mdb-card-body>
        <mdb-card-title>{{ title }}</mdb-card-title>
        <mdb-container>
          <mdb-bar-chart
            :data="barChartData"
            :options="barChartOptions"
            :height="300"
          />
        </mdb-container>
      </mdb-card-body>
    </mdb-card>
  </mdb-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    dataChart: {
      required: true,
    },
  },
  data() {
    return {
      barChartData: {
        labels: ["Death", "Confirmed", "Recovered"],
        datasets: [
          {
            label: this.title,
            data: [
              this.dataChart.death,
              this.dataChart.confirmed,
              this.dataChart.recovered,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
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
};
</script>