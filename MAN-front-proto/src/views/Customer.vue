<template>
  <v-img
    max-height="300"
    max-width="300"
    src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
  ></v-img>
  <div class="justify-center center">
    <v-row>
      <v-col>
        <div class="">
          <v-card height="400">
            <v-card-title>
              <v-col class="text-center"> Gattung Name </v-col>
            </v-card-title>
            <v-card-text class="d-flex justify-center">
              <v-img max-height="400" max-width="400" :src="radios"></v-img>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col>
        <div class="">
          <v-card>
            <v-card-title>
              <v-col>
                <v-select :items="items" item-title="title" label="Main Group">
                  <template>
                    <v-list-item></v-list-item>
                  </template>
                </v-select>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-radio-group v-model="radios">
                <v-radio
                  v-for="(item, index) in itemTypes"
                  :key="index"
                  :label="item.type"
                  :value="item.image"
                >
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
          <v-btn color="green">Download</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    radios: "",
    items: [
      {
        title: "Chair Color",
        options: [{ title: "Type A" }, { title: "Type B" }],
      },
      { title: "Chair Type", options: [{ title: "Red" }, { title: "Blue" }] },
    ],

    itemTypes: [
      {
        type: "Red",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/4/43/Red_flag.svg",
      },
      {
        type: "Blue",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solid_blue.svg/768px-Solid_blue.svg.png",
      },
      {
        type: "Green",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/Green_dark_square.jpg",
      },
    ],
  }),
};
</script>

<style scoped>
.center {
  height: 90%;
  width: 90%;
  margin: auto;
}
</style>
