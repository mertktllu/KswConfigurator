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
              <v-btn v-bind="activatorProps" text="Login As Customer"> </v-btn>
            </template>

            <v-card>
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
              ></v-img>
              <v-form ref="form" v-model="valid" @submit.prevent="validateUser">
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
          </v-dialog>
        </v-col>

        <v-col>
          <v-btn @click="goSAdmin()"> Super Admin </v-btn>
        </v-col>

        <v-col>
          <v-dialog max-width="500" v-model="dialogAdmin">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn v-bind="activatorProps" text="Login As ADMIN"> </v-btn>
            </template>

            <v-card>
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
              ></v-img>
              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="validateAdmin"
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
                  <v-btn type="submit" color="primary">Continue As Admin</v-btn>
                  <v-btn color="red" text @click="closeDialogAdmin"
                    >Close</v-btn
                  >
                </v-card-actions>
              </v-form>
            </v-card>
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
      dialogAdmin: false,
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
      admins: {
        "admin1@example.com": "password1",
        "admin2@example.com": "password2",
        "admin3@example.com": "password3",
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
    validateAdmin() {
      if (
        this.$refs.form.validate() &&
        this.admins[this.email] === this.password
      ) {
        this.$router.push("/admin"); // Doğru bilgilerle giriş yapıldı
        this.dialogAdmin = false; // Dialog'u kapat
      } else {
        alert("Incorrect username or password."); // Yanlış bilgi uyarısı
      }
    },
    closeDialog() {
      this.dialog = false; // Dialog'u kapat
      this.email = "";
      this.password = "";
    },
    closeDialogAdmin() {
      this.dialogAdmin = false;
      this.email = "";
      this.password = "";
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
