<template>
  <mdb-col :sm="sm">
    <mdb-card>
      <mdb-card-body>
        <mdb-card-title>{{ title }}</mdb-card-title>
        <mdb-container>
          <mdb-pie-chart
            datalabels
            :data="pieChartData"
            :options="pieChartOptions"
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
    sm: {
      default: "6"
    },
    title: {
      required: true,
      type: String,
    },
    dataChart: {
      required: true,
    },
  },
  data() {
    return {
      pieChartData: {
        labels: ["Death", "Recovered", "Confirmed"],
        datasets: [
          {
            data: [
              this.dataChart.death,
              this.dataChart.recovered,
              this.dataChart.confirmed,
            ],
            backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
            hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          datalabels: {
            color: "white",
            align: "center",
            font: {
              size: 16,
            },
            formatter: (value) => {
              const [dataset] = this.pieChartData.datasets;
              const setValue = dataset.data.reduce((a, b) => a + b);
              return `${Math.round((value / setValue) * 100)}%`;
            },
          },
        },
      },
    };
  },
};
</script>