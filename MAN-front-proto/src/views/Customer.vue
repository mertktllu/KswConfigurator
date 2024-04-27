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
                :items="filteredGattungs"
                v-model="selectedGattung"
                label="Gattung"
                :disabled="!selectedMainGroup || !filteredGattungs.length"
                item-text="name"
                item-value="value"
                dense
                solo
                outlined
                hide-details
              >
              </v-select>
            </v-col>
          </v-row>
          <!-- Bus Image -->
          <v-row class="">
            <v-img
              width="500"
              class="wrapper"
              :src="`${img}`"
              alt="img"
              v-if="selectedMainGroup === 'Camera'"
            >
              <g>
                <svg
                  :style="{ transform: `rotate(${cameraRotations.cam1}deg)` }"
                  class="cam"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam1')"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{ transform: `rotate(${cameraRotations.cam2}deg)` }"
                  class="cam1"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam2')"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{ transform: `rotate(${cameraRotations.cam3}deg)` }"
                  id="cam2"
                  class="cam2"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam3')"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>
              </g>
            </v-img>
            <v-img
              v-else-if="selectedMainGroup === '528M (Rear Target Display)'"
              :src="img"
              contain
              max-height="700"
              max-width="700"
              alt="528M image"
            ></v-img>
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
            @change="onMainGroupChange"
          ></v-select>
          <!-- Selection -->
          <v-col v-if="selectedMainGroup != null">
            <v-card>
              <v-select
                v-for="product in comModels"
                :itemProps="itemProps"
                v-model="selectedModel[product.name]"
                :key="product.id"
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

          <v-col>
            <v-img
              v-if="modelImageDetails.showImage"
              :src="modelImageDetails.src"
              :alt="modelImageDetails.alt"
              class="product-image"
            >
            </v-img>
          </v-col>
        </v-col>

        <!-- export button -->
        <v-col class="custom-row">
          <v-btn class="custom-export" @click="xport" color="primary">
            Export
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn class="custom-back" color="primary" @click="goHome()"
            >Back</v-btn
          >
        </v-col>

        <v-dialog v-model="dialog" opacity="0.7" persistent max-width="600px">
          <v-card>
            <v-card-title>
              Exported Data
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content class="list-item-content"
                    >Bus Type: {{ selectedType }}</v-list-item-content
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-content class="list-item-content"
                    >Main Group: {{ selectedMainGroup }}</v-list-item-content
                  >
                </v-list-item>
                <v-list-item-group v-model="selectedModel" color="primary">
                  <v-list-item
                    v-for="(product, index) in comModels"
                    :key="index"
                  >
                    <v-list-item-content class="list-item-content"
                      >{{ product.name }}:
                      {{ selectedModel[product.name] }}</v-list-item-content
                    >
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import router from "@/router";
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

    img: function () {
      if (this.selectedMainGroup === "528M (Rear Target Display)") {
        return "../src/assets/RareDisplay/image004.png";
      } else if (this.selectedType === "12C-2T") {
        return "../src/static/12C-2T.jpg";
      } else if (this.selectedType === "18C-3T") {
        return "../src/static/18C-3T.jpg";
      } else if (this.selectedType === "19C-4T") {
        return "../src/static/19C-4T.jpg";
      }
    },

    modelImageDetails() {
      let imageDetails = {
        showImage: false,
        src: "",
        alt: "",
      };

      if (this.selectedMainGroup === "528M (Rear Target Display)") {
        switch (this.selectedModel["Model"]) {
          case "BUSTEC":
            imageDetails.showImage = true;
            imageDetails.src = "../src/assets/RareDisplay/Bustec.jpg"; // Replace with the actual path to the BUSTEC image
            imageDetails.alt = "BUSTEC Image";
            break;
          case "MODEL X":
            imageDetails.showImage = true;
            imageDetails.src = "path-to-model-x-image.png"; // Replace with the actual path to the MODEL X image
            imageDetails.alt = "Model X Image";
            break;
          // Add more cases for other models
          default:
            break;
        }
      }

      return imageDetails;
    },

    filteredGattungs() {
      if (this.selectedMainGroup) {
        return this.gattungs.filter(
          (gattung) => gattung.value === this.selectedMainGroup
        );
      }
      return [];
    },
  },

  data() {
    return {
      selectedType: null,
      selectedMainGroup: null,
      selectedGattung: null,
      selectedModel: {},
      xportdata: {},
      xportbool: false,
      dialog: false,
      cameraRotations: {
        cam1: 0,
        cam2: 0,
        cam3: 0,
      },
      types: [
        { name: "12C-2T", value: "12C-2T" },
        { name: "18C-3T", value: "18C-3T" },
        { name: "19C-4T", value: "19C-4T" },

        // Daha fazla type öğesi...
      ],
      mainGroups: [
        //{ name: "Chair Type", value: "Chair Type" },
        //{ name: "Chair Color", value: "Chair Color" },
        { name: "Camera", value: "Camera" },
        {
          name: "528M (Rear Target Display)",
          value: "528M (Rear Target Display)",
        },
        {
          name: "Sondernutzungsfläche gegenüber Tür 2", // Kapı 2'nin karşısındaki özel kullanım alanı
          value: "Sondernutzungsfläche gegenüber Tür 2",
        },
        {
          name: "Sondernutzungsfläche rechts vor Tür 2", // Kapı 2'nin önünde sağda özel kullanım alanı
          value: "Sondernutzungsfläche rechts vor Tür 2",
        },
        {
          name: "Bestuhlung", //Koltuklar
          value: "Bestuhlung",
        },
        {
          name: "Haltestangen", //Tutunma rayları
          value: "Haltestangen",
        },
        {
          name: "Abschrankung/Haarnadelstange an Tür 1", //Kapı 1'de bariyer / saç tokası çubuğu
          value: "Abschrankung/Haarnadelstange an Tür 1",
        },
      ],
      gattungs: [
        {
          name: "680A - SNF gegenüber Tür 2", // Sondernutzungsfläche gegenüber Tür 2'nin gattungu //1
          value: "Sondernutzungsfläche gegenüber Tür 2", // 680A - SNF karşı kapı 2
        },
        {
          name: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2", // Sondernutzungsfläche gegenüber Tür 2'nin gattungu //1
          value: "Sondernutzungsfläche gegenüber Tür 2", // 680D - SNF'nin önünde kapı 2'nin karşısında yaslanma plakası/katlanır koltuklar
        },
        {
          name: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2", // Sondernutzungsfläche rechts vor Tür 2'nin gattungu //2
          value: "Sondernutzungsfläche rechts vor Tür 2", // 681D - 2 numaralı kapının önündeki SNF'nin önünde yaslanma plakası/katlanır koltuklar
        },
        {
          name: "704A - Bestuhlung", // Bestuhlung'un gattungu //3
          value: "Bestuhlung",
        },
        {
          name: "700B - Farbe-Fahrgastsitzgestell", // Bestuhlung'un gattungu //3
          value: "Bestuhlung", // 700B - Renkli yolcu koltuğu çerçevesi
        },
        {
          name: "78RI - Sitzhaltegriffe", // Bestuhlung'un gattungu //3
          value: "Bestuhlung", // 78RI - Koltuk tutma kolları
        },
        {
          name: "65A6 - Farbe der Haltestangen und Trennwände", // Haltestangen'un gattungu //4
          value: "Haltestangen", // 65A6 - Tutunma raylarının ve bölmelerin rengi
        },
        {
          name: "65LD - Abschrankung an Tür 1", // Abschrankung/Haarnadelstange an Tür 1'in gattungu //5
          value: "Abschrankung/Haarnadelstange an Tür 1", // 65LD - Kapı 1'de bölme
        },
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

        {
          name: "528M (Rear Target Display)",
          subProducts: [
            {
              name: "Model",
              types: [
                {
                  name: "(NONE)",
                  value: "(NONE)",
                },
                {
                  name: "BUSTEC",
                  value: "BUSTEC",
                },
                {
                  name: "MODEL X",
                  value: "MODEL X",
                },
              ],
            },

            {
              name: "Size",
              types: [
                {
                  name: "(NONE)",
                  value: "(NONE)",
                },
                {
                  name: "19x160",
                  value: "19x160",
                },
                {
                  name: "19x120",
                  value: "19x120",
                },
              ],
            },
            {
              name: "Led Color",
              types: [
                {
                  name: "(NONE)",
                  value: "(NONE)",
                },
                {
                  name: "Amber",
                  value: "Amber",
                },
                {
                  name: "Weiss",
                  value: "Weiss",
                },
                {
                  name: "RGB",
                  value: "RGB",
                },
              ],
            },
            {
              name: "Rearmost",
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
          ],
        },
        {
          name: "Sondernutzungsfläche gegenüber Tür 2",
        },
        {
          name: "Sondernutzungsfläche rechts vor Tür 2",
        },
        {
          name: "Bestuhlung",
        },
        {
          name: "Haltestangen",
        },
        {
          name: "Abschrankung/Haarnadelstange an Tür 1",
        },
      ],
    };
  },
  // ... methods, etc.
  methods: {
    goHome() {
      router.push("/");
    },

    rotateCamera(cameraId) {
      this.cameraRotations[cameraId] += 45; // Her tıklamada 45 derece döndür
      console.log(this.rotation);
    },

    itemProps(item) {
      return {
        title: item.name,
        value: item.value,
      };
    },
    //gattung name and mainGroup
    gattungProps(item) {
      return {
        title: item.name,
        value: item.mainGroup,
      };
    },

    showExportDialog() {
      this.dialog = true;
    },

    xport() {
      // Burada 'selectedModel' öğesini ve diğer seçili verileri kullanabilirsiniz.
      // Örnek olarak sadece 'selectedType' öğesini gösteriyoruz.
      this.xportdata = {
        // Burada önceden seçilmiş model öğeleri olabilir.
        "Selected Type": this.selectedType, // 'selectedType' öğesini ekleyin.
      };
      this.showExportDialog();
    },

    onMainGroupChange() {
      this.selectedGattung = null;
      // Eğer filteredGattungs computed property'si reaktif değilse, bu metodda manuel olarak tetikleyebilirsiniz.
      this.filteredGattungs; // Bu satır computed property'yi manuel olarak tetiklemek için kullanılabilir.
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
.v-dialog {
  background-color: rgba(
    255,
    255,
    255,
    0.5
  ); /* Burada 0.5 saydamlık değeridir */
}
.custom-row {
  position: absolute; /* Adjust if necessary */
  bottom: 0; /* Adjust if necessary */
  left: 0; /* Adjust if necessary */
  right: 0; /* Adjust if necessary */
  align-items: center;
}

.custom-back {
  position: absolute;
  left: 0; /* Align to the left side */
  bottom: 0; /* Align to the bottom of the row */
}

.custom-export {
  position: absolute;
  right: 0; /* Align to the right side */
  bottom: 0; /* Align to the bottom of the row */
}
</style>
