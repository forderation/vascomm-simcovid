<template>
  <div>
    <the-navbar></the-navbar>
    <div class="m-5 pt-5">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
};
</script>