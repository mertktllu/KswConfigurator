<template>
  <v-container>
    <v-row>
      <v-col>
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
          max-height="300"
          max-width="300"
        ></v-img>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center"
            >Welcome to the Admin Panel</v-card-title
          >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-card-text>
            <!-- Your form or additional admin panel elements go here -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Main Group</v-card-title>
          <v-card-text>
            <v-select
              :items="mainGroupOptions"
              label="Select an option"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- Custom Part Selection -->
        <!-- <v-card>
          <v-card-title>Custom Part</v-card-title>
          <v-card-text>
            <v-radio-group v-model="selectedPart">
              <v-radio
                v-for="(part, index) in customParts"
                :key="index"
                :label="part.name"
                :value="part.color"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card> -->

        <v-card class="custom-part">
          <v-card-title>Custom Part</v-card-title>
          <v-card-text>
            <v-radio-group v-model="selectedPart">
              <v-row v-for="(part, index) in customParts" :key="index">
                <v-col>
                  <v-radio :label="part.name" :value="part.color"></v-radio>
                </v-col>
                <v-col>
                  <v-chip :color="part.color" dark>{{ part.name }}</v-chip>
                </v-col>
                <v-col>
                  <v-btn icon @click="addItem(index)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteItem(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="editItem(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      selectedPart: null,
      mainGroupOptions: ["Seat Colour", "Seat Type", "Button Type", "Camera"],
      customParts: [
        { name: "Red", color: "red" },
        { name: "Green", color: "green" },
        { name: "Blue", color: "blue" },
      ],
      selectedPart: null,
    };
  },
};
</script>

<style scoped>
.custom-part {
  background-color: darkgrey;
}
</style>
