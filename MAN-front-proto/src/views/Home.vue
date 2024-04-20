<template>
  <div class="d-flex justify-center center">
    <v-card elevation="16">
      <v-img
        class="ml-10"
        max-height="500"
        max-width="500"
        src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
      ></v-img>
      <v-card-title class="text-center"> Welcome to KSW </v-card-title>
      <v-row>
        <v-col>
          <v-dialog max-width="500" v-model="dialog">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" text="Login As Admin"> </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
                ></v-img>
                <v-form
                  ref="form"
                  v-model="valid"
                  @submit.prevent="validateUser"
                >
                  <v-card-text>
                    <v-text-field
                      v-model="email"
                      label="Email"
                      variant="solo-filled"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      variant="solo-filled"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary"
                      >Continue As Customer</v-btn
                    >
                    <v-btn color="red" text @click="closeDialog">Close</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </template>
          </v-dialog>
        </v-col>

        <v-col>
          <v-btn @click="goSAdmin()"> Super Amdin </v-btn>
        </v-col>

        <v-col>
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" text="Login As Admin"> </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card>
                <v-img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
                ></v-img>
                <v-card-text>
                  <v-text-field
                    label="Email"
                    variant="solo-filled"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    variant="solo-filled"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green" text="Login" @click="goAdmin()"></v-btn>

                  <v-btn
                    color="red"
                    text="Close"
                    @click="isActive.value = false"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      dialog: false,
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
      // Hardcoded user credentials for demonstration
      users: {
        "user1@example.com": "password1",
        "user2@example.com": "password2",
        "user3@example.com": "password3",
      },
    };
  },

  methods: {
    goAdmin() {
      router.push("/admin");
    },
    goCustomer() {
      router.push("/customer");
    },
    goSAdmin() {
      router.push("/sadmin");
    },
    validateUser() {
      if (
        this.$refs.form.validate() &&
        this.users[this.email] === this.password
      ) {
        this.$router.push("/customer"); // Doğru bilgilerle giriş yapıldı
        this.dialog = false; // Dialog'u kapat
      } else {
        alert("Incorrect username or password."); // Yanlış bilgi uyarısı
      }
    },
    checkCredentials() {
      if (this.users[this.email] && this.users[this.email] === this.password) {
        this.$router.push("/customer");
      } else {
        this.$refs.form.reset();
        alert("Incorrect username or password.");
      }
    },
    closeDialog() {
      this.dialog = false; // Dialog'u kapat
    },
  },
};
</script>

<style scoped>
.center {
  width: 90%;
  margin: auto;
}
</style>
