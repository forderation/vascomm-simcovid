<template>
  <mdb-container>
    <mdb-row>
      <mdb-card class="m-auto">
        <h3 class="m-4"><mdb-badge color="primary">Hello Nice to meet you !</mdb-badge></h3>
        <mdb-card-image
          :src="profile.imageProfile"
          alt="Google Image"
          class="p-3"
          style="margin: auto"
        ></mdb-card-image>
        <mdb-card-body>
          <mdb-card-title>Full Name: {{ profile.fullName }}</mdb-card-title>
          <mdb-card-text>Email: {{ profile.email }}</mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>
  </mdb-container>
</template>
<script>
export default {
  data() {
    return {
      profile: {
        fullName: null,
        email: null,
        imageProfile: null,
      },
    };
  },
  watch: {
    profile(newProfile) {
      return {
        fullName: newProfile.fullName,
        email: newProfile.email,
        imageProfile: newProfile.imageProfile,
      };
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.profile.fullName = user.google.Fs.sd;
    this.profile.email = user.google.Fs.lt;
    this.profile.imageProfile = user.google.Fs.wI;
  },
};
</script>