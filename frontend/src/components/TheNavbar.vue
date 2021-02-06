<template>
  <div>
    <mdb-navbar color="indigo" dark position="top">
      <mdb-navbar-brand class="font-weight-bolder">
        <span> <mdb-icon icon="pastafarianism" /> Vascomm - SimCovid</span>
      </mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right v-if="isAuth">
          <router-link to="/home" custom v-slot="{ href, navigate, isActive }">
            <mdb-nav-item
              :href="href"
              :class="{ active: isActive }"
              @click="navigate"
            >
              <mdb-icon icon="home" /> Home</mdb-nav-item
            >
          </router-link>
          <router-link
            to="/countries"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <mdb-nav-item
              :href="href"
              :class="{ active: isActive }"
              @click="navigate"
            >
              <mdb-icon icon="globe-asia" /> Countries</mdb-nav-item
            >
          </router-link>
          <router-link
            to="/account"
            custom
            v-slot="{ href, navigate, isActive }"
          >
            <mdb-nav-item
              :href="href"
              :class="{ active: isActive }"
              @click="navigate"
            >
              <mdb-icon icon="user-alt" /> Account</mdb-nav-item
            >
          </router-link>
          <mdb-nav-item @click="logout">
            <mdb-icon icon="sign-out-alt" /> Logout</mdb-nav-item
          >
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  computed: {
    isAuth() {
      return this.$store.getters.getLoginUserInfo;
    },
  },
  methods: {
    logout() {
      this.$store.commit("setLogoutUser");
      this.$router.push("/login");
    },
  },
};
</script>