<template>
  <div>
    <the-navbar></the-navbar>
    <div class="my-5 mx-2 pt-5">
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