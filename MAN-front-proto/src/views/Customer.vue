<!-- <template>
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
</style> -->

<!-- customer page -->

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

    <v-row class="pt-0 grey darken-2">
      <!-- Type Dropdown -->
      <v-col cols="4" class="pa-1">
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

      <!-- Main Group Dropdown -->
      <v-col cols="4" class="pa-2">
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
      </v-col>

      <!-- Gattung Dropdown -->
      <v-col cols="4" class="pa-3">
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

      <v-col v-if="selectedMainGroup === 'Camera'" cols="12">
        <v-card>
          <v-card-title>CamOption</v-card-title>
          <v-card-text>
            <!-- camera type drop down list -->
            <v-select
              :itemProps="itemProps"
              v-model="selectedCamType"
              :items="camTypes"
              label="Camera Type"
              dense
              solo
              outlined
              hide-details
            ></v-select>

            <!-- video recorder (yes or no) check bar if yes show recorder type dropdown list-->
            <v-checkbox
              v-model="videoRecorder"
              label="Video Recorder"
              dense
              hide-details
            ></v-checkbox>
            <v-select
              :disabled="!videoRecorder"
              :itemProps="itemProps"
              v-model="selectedRecorderType"
              :items="recorderTypes"
              label="Recorder Type"
              dense
              solo
              outlined
              hide-details
            ></v-select>

            <!-- recorder time drop down list -->
            <v-select
              :disabled="!videoRecorder"
              :itemProps="itemProps"
              v-model="selectedRecorderTime"
              :items="recorderTimes"
              label="Recorder Time"
              dense
              solo
              outlined
              hide-details
            ></v-select>

            <!-- monitor type drop down list-->
            <v-select
              :itemProps="itemProps"
              v-model="selectedMonitorType"
              :items="monitorTypes"
              label="Monitor Type"
              dense
              solo
              outlined
              hide-details
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- export button -->
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary">Export</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedType: null,
      selectedMainGroup: null,
      selectedGattung: null,
      selectedCamType: null,
      selectedRecorderType: null,
      videoRecorder: false,
      selectedRecorderTime: null,
      selectedMonitorType: null,

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

      camTypes: [
        { name: "Type A", value: "Type A" },
        { name: "Type B", value: "Type B" },
        { name: "Type C", value: "Type C" },

        // Daha fazla camera type öğesi...
      ],
      recorderTypes: [
        { name: "Type A", value: "Type A" },
        { name: "Type B", value: "Type B" },
        { name: "Type C", value: "Type C" },

        // Daha fazla recorder type öğesi...
      ],
      recorderTimes: [
        { name: "1 Hour", value: "1 Hour" },
        { name: "2 Hours", value: "2 Hours" },
        { name: "3 Hours", value: "3 Hours" },

        // Daha fazla recorder time öğesi...
      ],
      monitorTypes: [
        { name: "Type A", value: "Type A" },
        { name: "Type B", value: "Type B" },
        { name: "Type C", value: "Type C" },

        // Daha fazla monitor type öğesi...
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
