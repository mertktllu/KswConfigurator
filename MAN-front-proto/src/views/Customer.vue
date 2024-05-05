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
                @change="onGattungChange"
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
          <v-col v-if="availableSubProducts.length">
            <v-card
              v-for="subProduct in availableSubProducts"
              :key="subProduct.name"
            >
              <v-card-title>{{ subProduct.name }}</v-card-title>
              <v-card-text>
                <!-- Normal select dropdown -->
                <v-select
                  v-if="subProduct.inputType !== 'text'"
                  :item-props="subProduct.name || itemProps"
                  :items="subProduct.options"
                  :item-text="(item) => item.name || item"
                  :item-value="(item) => item.value || item"
                  v-model="selectedModel[subProduct.name]"
                  label="Select option"
                  :disabled="!subProduct.options.length"
                  dense
                  solo
                  outlined
                  hide-details
                ></v-select>
                <!-- Text input for RAL codes -->
                <div
                  v-else-if="
                    subProduct.gattung ===
                    '65A6 - Farbe der Haltestangen und Trennwände'
                  "
                >
                  <v-text-field
                    v-model="selectedModel[subProduct.name]"
                    :label="subProduct.inputPlaceholder"
                    dense
                    solo
                    outlined
                    hide-details="auto"
                    @input="formatRALCode(subProduct.name)"
                    @click="showRALPrefix(subProduct.name)"
                  ></v-text-field>
                </div>
              </v-card-text>
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
  mounted() {
    // Perform actions when the component is fully mounted in the DOM, e.g., fetch data from an API
    console.log("Component mounted!");
  },
  computed: {
    comModels() {
      const found = this.products.find(
        (p) => p.name === this.selectedMainGroup
      );
      return found ? found.subProducts : [];
    },
    comModelsGat() {
      const foundGattung = this.gattungProducts.find(
        (g) => g.name === this.selectedGattung
      );
      if (foundGattung) {
        return foundGattung.subProducts;
      } else {
        console.error(
          `No sub-products found for the selected Gattung: ${this.selectedGattung}`
        );
        return [];
      }
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
      return this.gattungs.filter(
        (g) => g.mainGroup === this.selectedMainGroup
      );
    },

    availableSubProducts() {
      // Only show subproducts related to a gattung if a gattung is selected, otherwise show subproducts directly related to the main group
      if (this.selectedGattung) {
        // Find subproducts for the selected gattung
        const group = this.products.find(
          (p) => p.mainGroup === this.selectedMainGroup
        );
        return group
          ? group.subProducts.filter(
              (sp) => sp.gattung === this.selectedGattung
            )
          : [];
      } else if (!this.filteredGattungs.length) {
        // If there are no gattungs, return the subproducts for the main group
        const group = this.products.find(
          (p) => p.mainGroup === this.selectedMainGroup
        );
        return group ? group.subProducts : [];
      }
      return []; // No subproducts available if conditions are not met
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
          value: "680A - SNF gegenüber Tür 2",
          mainGroup: "Sondernutzungsfläche gegenüber Tür 2", // 680A - SNF karşı kapı 2
        },
        {
          name: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2", // Sondernutzungsfläche gegenüber Tür 2'nin gattungu //1
          value: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2",
          mainGroup: "Sondernutzungsfläche gegenüber Tür 2", // 680D - SNF'nin önünde kapı 2'nin karşısında yaslanma plakası/katlanır koltuklar
        },
        {
          name: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2", // Sondernutzungsfläche rechts vor Tür 2'nin gattungu //2
          value: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2",
          mainGroup: "Sondernutzungsfläche rechts vor Tür 2", // 681D - 2 numaralı kapının önündeki SNF'nin önünde yaslanma plakası/katlanır koltuklar
        },
        {
          name: "704A - Bestuhlung", // Bestuhlung'un gattungu //3
          value: "704A - Bestuhlung",
          mainGroup: "Bestuhlung",
        },
        {
          name: "700B - Farbe-Fahrgastsitzgestell", // Bestuhlung'un gattungu //3
          value: "700B - Farbe-Fahrgastsitzgestell",
          mainGroup: "Bestuhlung", // 700B - Renkli yolcu koltuğu çerçevesi
        },
        {
          name: "78RI - Sitzhaltegriffe", // Bestuhlung'un gattungu //3
          value: "78RI - Sitzhaltegriffe",
          mainGroup: "Bestuhlung", // 78RI - Koltuk tutma kolları
        },
        {
          name: "65A6 - Farbe der Haltestangen und Trennwände", // Haltestangen'un gattungu //4
          value: "65A6 - Farbe der Haltestangen und Trennwände",
          mainGroup: "Haltestangen", // 65A6 - Tutunma raylarının ve bölmelerin rengi
        },
        {
          name: "65LD - Abschrankung an Tür 1", // Abschrankung/Haarnadelstange an Tür 1'in gattungu //5
          value: "65LD - Abschrankung an Tür 1",
          mainGroup: "Abschrankung/Haarnadelstange an Tür 1", // 65LD - Kapı 1'de bölme
        },
      ],

      products: [
        {
          mainGroup: "Camera",
          subProducts: [
            { name: "Type", options: ["CAM A", "CAM B"] },
            { name: "Recorder", options: ["Yes", "No"] },
            { name: "Length", options: ["1 Hour", "2 Hour"] },
          ],
        },
        {
          mainGroup: "528M (Rear Target Display)",
          subProducts: [
            { name: "Model", options: ["NONE", "BUSTEC", "MODEL X"] },
            { name: "Size", options: ["NONE", "19x160", "19x120"] },
            { name: "Led Color", options: ["NONE", "Amber", "Weiss", "RGB"] },
            { name: "Rearmost", options: ["Yes", "No"] },
          ],
        },
        {
          mainGroup: "Sondernutzungsfläche gegenüber Tür 2",
          subProducts: [
            {
              gattung: "680A - SNF gegenüber Tür 2",
              name: "a1",
              options: [
                "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Mit E-scooter Piktogramm.",
              ],
            },
            {
              gattung: "680A - SNF gegenüber Tür 2",
              name: "b1",
              options: [
                "Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff.",
              ],
            },
            {
              gattung: "680A - SNF gegenüber Tür 2",
              name: "c1",
              options: [
                "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff.",
              ],
            },
            {
              gattung: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2",
              name: "a2",
              options: ["Armlehne mit halter ohne Schloss"],
            },
            {
              gattung: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2",
              name: "b2",
              options: ["Mit klappbarer Armlehne auf dem Bügel"],
            },
            {
              gattung: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2",
              name: "c2",
              options: ["Ausführung Trennwand mit Glasscheibe"],
            },
            {
              gattung: "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2",
              name: "d2",
              options: [
                "Bügel (Überstand min. 280mm) E-Scooter tauglich ausführen",
              ],
            },
          ],
        },
        {
          mainGroup: "Sondernutzungsfläche rechts vor Tür 2",
          subProducts: [
            {
              gattung: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2",
              name: "*",
              options: ["Armlehne mit halter ohne Schloss"],
            },
            {
              gattung: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2",
              name: "**",
              options: ["mit klappbarer Armlehne auf dem Bügel"],
            },
            {
              gattung: "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2",
              name: "***",
              options: ["Ausführung Trennwand mit Glasscheibe"],
            },
          ],
        },
        {
          mainGroup: "Bestuhlung",
          subProducts: [
            {
              gattung: "704A - Bestuhlung",
              name: "mit Schaum Sitzpolster",
              options: ["ohne", "20mm", "30mm", "45mm"],
            },
            {
              gattung: "704A - Bestuhlung",
              name: "mit Schaum Rückenpolster",
              options: ["ohne", "20mm", "30mm", "45mm"],
            },
            {
              gattung: "704A - Bestuhlung",
              name: "Alle Sitze ohne Logo/Branding. ",
              options: ["Alle Sitze ohne Logo/Branding."],
            },
            {
              gattung: "704A - Bestuhlung",
              name: "STER 8 MS",
              options: ["mit Schutzband", "ohne Schutzband"],
            },
            {
              gattung: "700B - Farbe-Fahrgastsitzgestell",
              name: "Fahrgastsitzgestell RAL 7037",
              options: ["Fahrgastsitzgestell RAL 7037"],
            },
            {
              gattung: "78RI - Sitzhaltegriffe",
              name: "Topcloser in RAL 1023 verkehrsgelb",
              options: ["Topcloser in RAL 1023 verkehrsgelb"],
            },
            {
              gattung: "78RI - Sitzhaltegriffe",
              name: "Topcloser in RAL 7037 verkehrsgelb",
              options: ["Topcloser in RAL 7037 verkehrsgelb"],
            },
            {
              gattung: "78RI - Sitzhaltegriffe",
              name: "Topcloser in RAL 1023 verkehrsgelb für EM sitz",
              options: ["Topcloser in RAL 1023 verkehrsgelb für EM sitz"],
            },
          ],
        },
        {
          mainGroup: "Haltestangen",
          subProducts: [
            {
              gattung: "65A6 - Farbe der Haltestangen und Trennwände",
              name: "Nur Knoten in",
              inputType: "text",
              inputPlaceholder: "RAL Code eingeben",
            },
            {
              gattung: "65A6 - Farbe der Haltestangen und Trennwände",
              name: "Nur Deckenhaltestangen in",
              inputType: "text",
              inputPlaceholder: "RAL Code eingeben",
            },
          ],
        },
        {
          mainGroup: "Abschrankung/Haarnadelstange an Tür 1",
          subProducts: [
            {
              gattung: "65LD - Abschrankung an Tür 1",
              options: [{ name: "zusätzlich Teleskopabschrankung an Tür 1" }],
            },
          ],
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
      this.selectedModel = {};
      this.updateAvailableSubProducts();
    },
    updateAvailableSubProducts() {
      this.availableSubProducts = this.getSubProductsForMainGroup(
        this.selectedMainGroup
      );
    },
    getSubProductsForMainGroup(mainGroup) {
      // This method retrieves subproducts directly linked to a main group without gattungs
      const found = this.products.find((p) => p.mainGroup === mainGroup);
      return found ? found.subProducts : [];
    },

    getSubProducts() {
      if (this.selectedGattung) {
        return (
          this.products.find(
            (p) =>
              p.mainGroup === this.selectedMainGroup &&
              p.gattung === this.selectedGattung
          )?.subProducts || []
        );
      }
      return (
        this.products.find((p) => p.mainGroup === this.selectedMainGroup)
          ?.subProducts || []
      );
    },

    onGattungChange() {
      this.selectedModel = {};
    },
    formatRALCode(fieldName) {
      let value = this.selectedModel[fieldName];
      // Kullanıcının girdisini RAL kodu formatına getir
      if (value && !value.startsWith("RAL")) {
        value = "RAL " + value;
        // RAL kodunu güncelle, ancak RAL'yi silemez
        this.selectedModel[fieldName] = value;
      }
    },
    showRALPrefix(fieldName) {
      // Metin alanına tıklandığında, eğer boşsa "RAL " ön eki ekleyin
      if (!this.selectedModel[fieldName]) {
        this.selectedModel[fieldName] = "RAL ";
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
