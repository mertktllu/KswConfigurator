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
          <v-btn @click="goCustomer()"> Continue As Customer </v-btn>
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
  },
};
</script>

<style scoped>
.center {
  width: 90%;
  margin: auto;
}
</style>
