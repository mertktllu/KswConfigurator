<template>
  <div class="d-flex justify-center center">
    <v-card elevation="16" class="login-card">
      <v-img
        class="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
      ></v-img>
      <v-card-title class="text-center title">Welcome to KSW</v-card-title>
      <v-form ref="form" v-model="valid" @submit.prevent="validateUser">
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            variant="outlined"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="primary" class="continue-btn"
            >Continue</v-btn
          >
          <v-btn color="red" text @click="clearForm" class="clear-btn"
            >Clear</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>

    <!-- Success log -->
    <v-alert
      v-if="$store.state.showSuccessLog"
      type="success"
      dismissible
      style="
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background-color: green;
        color: white;
      "
    >
      Export finished successfully!
    </v-alert>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      name: "Home",
      email: "",
      password: "",
      valid: true,
      showPassword: false,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
      ],
    };
  },

  methods: {
    async validateUser() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post("https://kswconfigurator-7fc475022be0.herokuapp.com/login", {
            email: this.email,
            password: this.password,
          });

          if (response.data.success) {
            const role = response.data.role;
            if (role === "SuperAdmin") {
              this.$router.push("/sadmin");
            } else if (role === "Admin") {
              this.$router.push("/admin");
            } else if (role === "Customer") {
              this.$router.push("/customer");
            }
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          alert("An error occurred during login.");
        }
      }
    },
    clearForm() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style scoped>
.center {
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  max-width: 600px;
  padding: 50px;
  text-align: center;
  border-radius: 10px;
}
.logo {
  width: 200px;
  height: 100px;
  margin: 0 auto 10px auto;
}
.title {
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}
.v-text-field {
  margin-bottom: 10px;
}
.continue-btn,
.clear-btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
