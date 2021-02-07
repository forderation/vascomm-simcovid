<template>
  <mdb-container>
    <mdb-row>
      <mdb-card class="m-auto">
        <mdb-col sm="12" class="p-3">
          <h3 class="my-3 m-auto">
            <mdb-badge color="primary">Hello Nice to meet you !</mdb-badge>
          </h3>
        </mdb-col>
        <mdb-card-image
          :src="profile.imageProfile"
          alt="Google Image"
          class="p-3"
          style="margin: auto"
        ></mdb-card-image>
        <mdb-card-body>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr>
                <th class="text-info">Full Name</th>
                <td>{{ profile.fullName }}</td>
              </tr>
              <tr>
                <th class="text-info">Email</th>
                <td>{{ profile.email }}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </mdb-card-body>
      </mdb-card>
    </mdb-row>
  </mdb-container>
</template>
<script>
export default {
  name: "Account",
  data() {
    return {
      profile: {
        fullName: null,
        email: null,
        imageProfile: null,
      },
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user")).google;
    this.profile.fullName = user.displayName;
    this.profile.email = user.email;
    this.profile.imageProfile = user.photoURL;
  },
};
</script>