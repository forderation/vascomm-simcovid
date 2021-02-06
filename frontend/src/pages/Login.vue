<template>
  <mdb-row>
    <mdb-col md="12" class="pb-2">
      <mdb-card class="grey lighten-4">
        <mdb-view>
          <a href="#!">
            <img src="/assets/login-card.jpg" class="card-image" alt="" />
            <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
          </a>
        </mdb-view>
        <mdb-card-header class="pt-4 info-color-dark text-center text-white">
          <mdb-card-title><strong>Welcome to Sim-Covid</strong></mdb-card-title>
          <p>Please login first</p>
        </mdb-card-header>
        <mdb-card-body>
          <mdb-btn
            class="btn-gplus float-right"
            @click="loginWithGoogle"
            icon="google-plus-g"
            fab
            >Login with google account</mdb-btn
          >
        </mdb-card-body>
      </mdb-card>
    </mdb-col>
  </mdb-row>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      guests: 4,
    };
  },
  methods: {
    loginWithGoogle() {
      this.$gAuth
        .signIn()
        .then((GoogleUser) => {
          let userInfo = {
            loginType: "google",
            google: GoogleUser,
          };
          this.$store.commit("setLoginUser", userInfo);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
.card-image {
  width: 100%;
  height: 300px;
  object-fit: scale-down;
  object-position: center;
  background-color: white;
}
</style>
