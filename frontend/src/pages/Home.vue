<template>
  <mdb-container>
    <mdb-row v-if="!isLoaded">
      <mdb-col sm="12" class="text-center">
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden"></span>
        </div>
      </mdb-col>
    </mdb-row>
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
      <mdb-row class="mt-4">
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
import { mapGetters } from "vuex";

export default {
  components: { CardCase },
  name: "Home",
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters(["summaryCasesWorld"]),
  },
  mounted() {
    this.$store.dispatch("loadCasesWorld");
    this.isLoaded = true;
  },
};
</script>