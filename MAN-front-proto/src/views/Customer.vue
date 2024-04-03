<template>
  <v-container fluid>
    <!-- MAN Logo -->
    <v-row>
      <v-col class="d-flex justify-start">
        <v-img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
          contain
          max-height="60"
          max-width="100"
        ></v-img>
      </v-col>
    </v-row>

    <div>
      <v-row class="pt-0 grey darken-2">
        <!-- Type Dropdown -->
        <v-col cols="4">
          <v-select
            :itemProps="itemProps"
            v-model="selectedType"
            :items="types"
            label="Type"
            dense
            solo
            outlined
            hide-details
          ></v-select>
        </v-col>

        <!-- Gattung Dropdown -->
        <v-col cols="4">
          <v-select
            :itemProps="itemProps"
            v-model="selectedGattung"
            :items="gattungs"
            label="Gattung"
            dense
            solo
            outlined
            hide-details
          ></v-select>
        </v-col>

        <!-- Main Group Dropdown -->
        <v-col cols="4">
          <v-select
            :itemProps="itemProps"
            v-model="selectedMainGroup"
            :items="mainGroups"
            label="Main Group"
            dense
            solo
            outlined
            hide-details
          ></v-select>
          {{ selectedModel }}
          {{ selectedMainGroup }}
          <!-- Selection -->
          <v-col v-if="selectedMainGroup != null">
            <v-card>
              <v-select
                v-for="product in comModels"
                :itemProps="itemProps"
                v-model="selectedModel"
                :items="product.types"
                :label="product.name"
                dense
                solo
                outlined
                hide-details
                class="ma-2"
              >
              </v-select>
            </v-card>
          </v-col>
        </v-col>

        <!-- export button -->
        <v-col cols="12" class="d-flex justify-end">
          <v-btn color="primary">Export</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    comModels: function () {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].name == this.selectedMainGroup) {
          return this.products[i].products;
        }
      }
      return "nothing";
    },
  },

  data() {
    return {
      selectedType: null,
      selectedMainGroup: null,
      selectedGattung: null,
      selectedModel: null,

      types: [
        { name: "12C-2T", value: "12C-2T" },
        { name: "12C-3T", value: "12C-3T" },
        { name: "12C-4T", value: "12C-4T" },

        // Daha fazla type öğesi...
      ],
      mainGroups: [
        { name: "Chair Type", value: "Chair Type" },
        { name: "Chair Color", value: "Chair Color" },
        { name: "Camera", value: "Camera" },

        // Daha fazla main group öğesi...
      ],
      gattungs: [
        {
          name: "Überwachungsanlage Fahrgastraum",
          value: "Überwachungsanlage Fahrgastraum",
        },
        // Daha fazla gattung öğesi...
      ],

      products: [
        {
          name: "Camera",
          products: [
            {
              name: "Type",
              types: [
                {
                  name: "CAM A",
                  value: "A",
                },
                {
                  name: "CAM B",
                  value: "B",
                },
              ],
            },
            {
              name: "Recorder",
              types: [
                {
                  name: "Yes",
                  value: 1,
                },
                {
                  name: "No",
                  value: 0,
                },
              ],
            },
            {
              name: "Lenght",
              types: [
                {
                  name: "1 Hour",
                  value: "1 Hour",
                },
                {
                  name: "2 Hour",
                  value: "2 Hour",
                },
              ],
            },
          ],
        },

        {
          name: "Chair Type",
          models: [
            {
              name: "Type A",
              value: "A2",
            },
            {
              name: "Type B",
              value: "B2",
            },
          ],
        },
      ],
    };
  },
  // ... methods, etc.
  methods: {
    itemProps(item) {
      return {
        title: item.name,
        value: item.value,
      };
    },

    onMainGroupChange(value) {
      // Main Group seçimi değiştiğinde tetiklenen işlemler
      console.log("Selected Main Group: ", value);
      if (value === "Camera") {
        // Camera seçildiğinde yapılacak işlemler
        // Örneğin, ek bir bileşeni göstermek veya gizlemek
      }
    },
  },
};
</script>

<style scoped></style>
