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
            @click="firebaseLogin"
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
import Firebase from "firebase";
import firebaseConfig from "../config/firebase";

export default {
  name: "Login",
  data() {
    return {
      guests: 4,
    };
  },
  methods: {
    firebaseLogin() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      Firebase.auth()
        .signInWithPopup(provider)
        .then(async (header) => {
          await Firebase.auth()
            .currentUser.getIdToken(true)
            .then((token) => {
              let userInfo = {
                idToken: token,
                google: header.user,
              };
              this.$store.commit("setLoginUser", userInfo);
              this.$router.push("/home");
            });
        });
    },
  },
  created() {
    if (!Firebase.apps.length) {
      this.app = Firebase.initializeApp(firebaseConfig);
    }
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
