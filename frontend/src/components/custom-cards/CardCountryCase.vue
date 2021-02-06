<template>
  <mdb-col sm="4" class="p-3">
    <mdb-card>
      <mdb-card-body>
        <h3 class="font-weight-bold">
          <i class="france flag"></i> {{ nameCountry }}
        </h3>
        <h5>
          <mdb-badge color="danger-color"
            ><mdb-icon icon="calendar-alt" /> Total Cases:
            <number
              :from="0"
              :to="confirmed"
              :duration="2"
              :delay="2"
              easing="Power1.easeOut"
            />
          </mdb-badge>
        </h5>
        <h5>
          <mdb-badge color="default-color"
            ><mdb-icon icon="calendar-alt" /> Total Recovered:
            <number
              :from="0"
              :to="recovered"
              :duration="2"
              :delay="2"
              easing="Power1.easeOut"
            />
          </mdb-badge>
        </h5>
        <mdb-btn color="primary" class="m-0 mt-3 w-100"
          ><mdb-icon icon="info-circle" /> Details</mdb-btn
        >
      </mdb-card-body>
    </mdb-card>
  </mdb-col>
</template>

<script>
export default {
  name: "CardCountryCase",
  props: {
    id: {
      type: String,
      required: true,
    },
    nameCountry: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Number,
      required: true,
    },
    recovered: {
      type: Number,
      required: true,
    },
  },
};
</script>