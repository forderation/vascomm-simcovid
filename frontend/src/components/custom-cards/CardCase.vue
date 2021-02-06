<template>
  <mdb-card wide>
    <mdb-view hover cascade>
      <a href="#!">
        <mdb-card-image
          :src="image"
          alt="Card image cap"
          style="height: 200px"
        ></mdb-card-image>
        <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
      </a>
    </mdb-view>
    <mdb-card-body cascade>
      <h5 class="pink-text pb-2 pt-1">{{ title }}</h5>
      <mdb-list-group>
        <mdb-list-group-item v-for="caseItem in cases" :key="caseItem.id"
          >{{ caseItem.title }}
          <mdb-badge color="primary" pill
            >
            <number
              :from="0"
              :to="caseItem.count"
              :duration="2"
              :delay="1"
              easing="Power1.easeOut"
            />
          </mdb-badge>
        </mdb-list-group-item>
      </mdb-list-group>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
export default {
  name: "CardCase",
  props: {
    title: {
      type: String,
      required: true,
    },
    cases: {
      type: Array,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
};
</script>