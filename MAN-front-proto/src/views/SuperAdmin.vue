<template>
  <v-img
    class="justify-center center"
    max-height="500"
    max-width="500"
    src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
  ></v-img>
  <div class="justify-center center">
    <v-card-title class="text-center">Reviews</v-card-title>

    <v-card class="mb-1" color="blue" v-for="user in users" :key="user.id">
      <v-row>
        <v-col>
          {{ user.name }}
        </v-col>
        <v-col cols="2">
          {{ user.id }}
        </v-col>
        <v-col>
          {{ user.change }}
        </v-col>
        <v-col cols="2">
          <v-btn
            size="small"
            v-on:click="sendConfirm(user.Advertidmodel, user.User?.ID, userId)"
            color="green"
          >
            <v-icon>mdi-check</v-icon></v-btn
          >
          <v-btn
            size="small"
            v-on:click="sendDeny(user.Advertidmodel, user.User?.ID)"
            color="red"
          >
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: "Semih ", id: "1", change: "Lorem ipsum" },
        { name: "Mert", id: "2", change: "Lorem ipsum2" },
        { name: "Harun", id: "3", change: "Lorem ipsum3" },
        { name: "Bahadır", id: "4", change: "Lorem ipsum3" },
      ],
    };
  },
};
</script>

<style scoped>
.center {
  height: 50%;
  width: 60%;
  margin: auto;
}
</style>
