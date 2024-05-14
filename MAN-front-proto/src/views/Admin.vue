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
          <v-card-title
            >Gattung

            <v-dialog max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="green"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Add Gattung">
                  <v-card-text>
                    <v-text-field
                      v-model="firstname"
                      :counter="10"
                      :rules="nameRules"
                      label="Name of Gattung"
                      hide-details
                      required
                    ></v-text-field>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-dialog max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="red"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Delete A Gattung">
                  <v-card class="ma-3" v-for="gattung in gattungs">
                    {{ gattung.name }}

                    <v-btn size="x-small" icon class="ml-5" color="red"
                      ><v-icon>mdi-delete</v-icon></v-btn
                    >
                  </v-card>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-dialog max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="yellow"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit A Gattung">
                  <v-select
                    :itemProps="itemProps"
                    :items="gattungs"
                    v-model="selectedGattung"
                    label="Select an option"
                  ></v-select>

                  <v-textfield>
                    <v-text-field clearable label="New Name"></v-text-field>
                  </v-textfield>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-select
              :itemProps="itemProps"
              :items="gattungs"
              v-model="selectedGattung"
              label="Select an option"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title
            >Main Group
            <v-btn size="small" icon class="ml-5" color="green"
              ><v-icon>mdi-plus</v-icon></v-btn
            >

            <v-btn size="small" icon class="ml-5" color="red"
              ><v-icon>mdi-delete</v-icon></v-btn
            >
            <v-btn size="small" icon class="ml-5" color="yellow"
              ><v-icon>mdi-pencil</v-icon></v-btn
            ></v-card-title
          >
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
      dialog: false,
      search: "",
      selectedPart: null,
      mainGroupOptions: ["Seat Colour", "Seat Type", "Button Type", "Camera"],
      customParts: [
        { name: "Red", color: "red" },
        { name: "Green", color: "green" },
        { name: "Blue", color: "blue" },
      ],
      selectedPart: null,
      selectedGattung: null,

      gattungs: [
        {
          name: "680A - SNF gegenüber Tür 2", // Sondernutzungsfläche gegenüber Tür 2'nin gattungu //1
          value: "Sondernutzungsfläche gegenüber Tür 2", // 680A - SNF karşı kapı 2
          customParts: [
            { name: "Red", color: "red" },
            { name: "Green", color: "green" },
            { name: "Blue", color: "blue" },
          ],
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
    };
  },

  methods: {
    clicked() {
      console.log(this.gattungs);
    },

    itemProps(item) {
      return {
        title: item.name,
        value: item.value,
      };
    },
  },
};
</script>

<style scoped>
.custom-part {
  background-color: rgb(204, 204, 204);
}
</style>
