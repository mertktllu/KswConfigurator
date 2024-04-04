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

        <v-col>
          <v-row>
            <v-col>
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
            <v-col>
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
          </v-row>
          <!-- Bus Image -->
          <v-row class="">
            <v-img class="wrapper" :src="img" alt="img">
              <svg
                class="cam"
                width="48"
                height="29"
                viewBox="0 0 48 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onclick="rotate('a!')"
              >
                <path
                  d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                  fill="#6887F5"
                />
                <rect width="29" height="29" rx="3" fill="#6887F5" />
              </svg>

              <svg
                class="cam1"
                width="48"
                height="29"
                viewBox="0 0 48 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                  fill="#6887F5"
                />
                <rect width="29" height="29" rx="3" fill="#6887F5" />
              </svg>
              <svg
                class="cam2"
                width="48"
                height="29"
                viewBox="0 0 48 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                  fill="#6887F5"
                />
                <rect width="29" height="29" rx="3" fill="#6887F5" />
              </svg>
            </v-img>
          </v-row>
        </v-col>

        <!-- Main Group Dropdown -->
        <v-col>
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
          <!-- Selection -->
          <v-col v-if="selectedMainGroup != null">
            <v-card>
              <v-select
                v-for="product in comModels"
                :itemProps="itemProps"
                v-model="selectedModel[product.name]"
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
          <v-btn color="primary">{{ imgUrl }}</v-btn>
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
          return this.products[i].subProducts;
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
      selectedModel: {},
      img: "MAN-front-proto\\src\\assets\\BusImages\\12C-2T.jpg",

      types: [
        { name: "12C-2T", value: "12C-2T" },
        { name: "18C-3T", value: "18C-3T" },
        { name: "19C-4T", value: "19C-4T" },

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
          subProducts: [
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
          subProducts: [
            {
              name: "ChairModel",
              types: [
                {
                  name: "Chair A",
                  value: "A",
                },
                {
                  name: "Chair B",
                  value: "B",
                },
              ],
            },
          ],
        },

        {
          name: "Chair Color",
          subProducts: [
            {
              name: "Color",
              types: [
                {
                  name: "Red",
                  value: "Red",
                },
                {
                  name: "Blue",
                  value: "Blue",
                },
              ],
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

<style scoped>
.wrapper {
  position: relative;
}

.cam {
  height: 10%;
  width: 10%;
  position: absolute;
  top: 66%;
  right: 3%;
  transform: rotate(220deg);
}

.cam:active {
  transform: rotate(-0.25turn);
}

.cam1 {
  height: 10%;
  width: 10%;
  position: absolute;
  top: 66%;
  right: 43%;
  transform: rotate(270deg);
}
.cam2 {
  height: 10%;
  width: 10%;
  position: absolute;
  top: 66%;
  right: 89%;
  transform: rotate();
}
</style>
