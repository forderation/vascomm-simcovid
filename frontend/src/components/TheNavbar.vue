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
          <mdb-nav-item @click="showModalLogout">
            <mdb-icon icon="sign-out-alt" /> Logout</mdb-nav-item
          >
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <mdb-modal :show="modalLogout" @close="closeModalLogout">
      <mdb-modal-header>
        <mdb-modal-title>Confirm Logout</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <span>Are you sure want to logout ?</span>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click="closeModalLogout">No</mdb-btn>
        <mdb-btn color="primary" @click="logout">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      modalLogout: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.getLoginUserInfo;
    },
  },
  methods: {
    showModalLogout() {
      this.modalLogout = true;
    },
    closeModalLogout() {
      this.modalLogout = false;
    },
    logout() {
      this.$store.commit("setLogoutUser");
      this.$router.push("/login");
      this.closeModalLogout();
    },
  },
};
</script>