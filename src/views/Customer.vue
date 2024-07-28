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
      <v-col class="language-switcher">
        <v-btn icon @click="changeLanguage('en')" class="flag-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
            alt="English"
            class="flag-icon"
          />
        </v-btn>
        <span class="separator">/</span>
        <v-btn icon @click="changeLanguage('de')" class="flag-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg"
            alt="Deutsch"
            class="flag-icon"
          />
        </v-btn>
        <v-text-field
          v-if="!selectedType"
          v-model="searchQuery"
          append-icon="mdi-magnify"
          :label="$t('search')"
          class="ml-4"
          solo
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>

    <div>
      <v-row v-if="!selectedType" class="vehicle-container">
        <v-col cols="12" class="text-center">
          <h1>{{ $t("title") }}</h1>
        </v-col>
        <v-row class="vehicle-row">
          <!-- Vehicle type cards -->
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(type, index) in filteredTypes"
            :key="index"
            class="vehicle-col"
          >
            <v-card @click="selectVehicle(type)" hoverable class="vehicle-card">
              <v-img :src="type.image" class="vehicle-image"></v-img>
              <v-card-title class="vehicle-title">{{ type.name }}</v-card-title>
              <v-card-subtitle> </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <v-col class="custom-row">
          <v-btn class="custom-back" color="primary" @click="goHome">
            {{ $t("back") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-dialog v-model="vehicleDialog" persistent max-width="600px">
        <v-card>
          <v-card-title> {{ $t("title") }} </v-card-title>
          <v-card-text class="text-center">
            <v-img
              :src="selectedVehicleImage"
              max-height="300px"
              @load="onImageLoad"
              @error="onImageError"
            ></v-img>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="primary" @click="chooseVehicle">{{
              $t("choose")
            }}</v-btn>
            <v-btn color="red" text @click="vehicleDialog = salse">{{
              $t("close")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row v-if="selectedType" class="pt-0 grey darken-2">
        <!-- Type Dropdown -->

        <v-col>
          <v-row>
            <v-col>
              <v-text-field
                v-model="selectedType.name"
                :label="$t('type')"
                dense
                solo
                outlined
                hide-details
                readonly
                class="bold-text"
              ></v-text-field>
            </v-col>

            <!-- Maingrup Dropdown -->
            <v-col>
              <v-select
                :item-props="itemProps"
                v-model="selectedMainGroup"
                :items="mainGroups"
                :label="$t('mainGroup')"
                dense
                solo
                outlined
                hide-details
                item-text="name"
                item-value="maingroupid"
                @change="onMainGroupChange"
              ></v-select>
            </v-col>
          </v-row>
          <!-- Bus Image -->
          <v-row class="">
            <v-img
              v-if="
                selectedType?.name?.trim() === 'L4C' &&
                selectedMainGroup?.name?.trim() === 'Camera'
              "
              width="500"
              :src="img12C"
            >
              <g>
                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam1_2T}deg)`,
                  }"
                  class="cam1_2T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam1_2T')"
                  :class="{ disabled: !cameraEnabled.cam1_2T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam2_2T}deg)`,
                  }"
                  class="cam2_2T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam2_2T')"
                  :class="{ disabled: !cameraEnabled.cam2_2T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam3_2T}deg)`,
                  }"
                  class="cam3_2T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam3_2T')"
                  :class="{ disabled: !cameraEnabled.cam3_2T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam4_2T}deg)`,
                  }"
                  class="cam4_2T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam4_2T')"
                  :class="{ disabled: !cameraEnabled.cam4_2T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam5_2T}deg)`,
                  }"
                  class="cam5_2T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam5_2T')"
                  :class="{ disabled: !cameraEnabled.cam5_2T }"
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
              v-else-if="
                selectedType?.name?.trim() === 'LE' &&
                selectedMainGroup?.name?.trim() === 'Camera'
              "
              width="500"
              :src="img18C"
            >
              <g>
                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam1_3T}deg)`,
                  }"
                  class="cam1_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam1_3T')"
                  :class="{ disabled: !cameraEnabled.cam1_3T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam2_3T}deg)`,
                  }"
                  class="cam2_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam2_3T')"
                  :class="{ disabled: !cameraEnabled.cam2_3T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam3_3T}deg)`,
                  }"
                  class="cam3_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam3_3T')"
                  :class="{ disabled: !cameraEnabled.cam3_3T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam4_3T}deg)`,
                  }"
                  class="cam4_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam4_3T')"
                  :class="{ disabled: !cameraEnabled.cam4_3T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam5_3T}deg)`,
                  }"
                  class="cam5_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam5_3T')"
                  :class="{ disabled: !cameraEnabled.cam5_3T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>
                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam6_3T}deg)`,
                  }"
                  class="cam6_3T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam6_3T')"
                  :class="{ disabled: !cameraEnabled.cam6_3T }"
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
              v-else-if="
                selectedType?.name?.trim() === 'Intercity' &&
                selectedMainGroup?.name?.trim() === 'Camera'
              "
              width="500"
              :src="img19C"
            >
              <g>
                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam1_4T}deg)`,
                  }"
                  class="cam1_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam1_4T')"
                  :class="{ disabled: !cameraEnabled.cam1_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam2_4T}deg)`,
                  }"
                  class="cam2_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam2_4T')"
                  :class="{ disabled: !cameraEnabled.cam2_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam3_4T}deg)`,
                  }"
                  class="cam3_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam3_4T')"
                  :class="{ disabled: !cameraEnabled.cam3_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam4_4T}deg)`,
                  }"
                  class="cam4_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam4_4T')"
                  :class="{ disabled: !cameraEnabled.cam4_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>

                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam5_4T}deg)`,
                  }"
                  class="cam5_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam5_4T')"
                  :class="{ disabled: !cameraEnabled.cam5_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>
                <svg
                  :style="{
                    transform: `rotate(${cameraRotations.cam6_4T}deg)`,
                  }"
                  class="cam6_4T"
                  width="48"
                  height="29"
                  viewBox="0 0 48 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  @click="rotateCamera('cam6_4T')"
                  :class="{ disabled: !cameraEnabled.cam6_4T }"
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg>
              </g>
            </v-img>

            <!-- rare -->
            <v-img
              v-else-if="
                selectedMainGroup?.name?.trim() === 'Fahrtziealanzeige Heck'
              "
              :src="RareImage"
              contain
              max-height="700"
              max-width="1000"
              alt="528M image"
            ></v-img>

            <!-- Bestuhlung -->
            <v-img
              v-else-if="selectedMainGroup?.name?.trim() === 'Bestuhlung'"
              :src="chairImage"
              style="width: 120%; height: auto; display: block; bottom: auto"
            >
              <v-row>
                <v-btn
                  color="grey"
                  @click="toggleChair"
                  style="
                    position: absolute;
                    top: 60%;
                    left: 10%;
                    width: 120px;
                    height: 40px;
                    color: black;
                    background-color: rgba(255, 255, 255, 0.7);
                  "
                >
                  Übersetzen
                </v-btn>
              </v-row>
              <v-row v-if="showButtons">
                <v-row
                  v-if="
                    selectedGattung?.name?.trim() === '78RI - Sitzhaltegriffe'
                  "
                >
                  <v-btn
                    icon
                    style="
                      position: absolute;
                      top: 8%;
                      left: 39%;
                      border-radius: 50%;
                      width: 40px;
                      height: 40px;
                      background-color: rgba(255, 255, 255, 0.7);
                    "
                    @click="onPointClick('point1')"
                  >
                    <v-icon>mdi-circle</v-icon>
                  </v-btn>
                </v-row>

                <v-row
                  v-else-if="
                    selectedGattung?.name?.trim() === '78RD - Sitzarmlehnen'
                  "
                >
                  <v-btn
                    icon
                    style="
                      position: absolute;
                      top: 47%;
                      left: 27%;
                      border-radius: 50%;
                      width: 40px;
                      height: 40px;
                      background-color: rgba(255, 255, 255, 0.7);
                    "
                    @click="onPointClick('point4')"
                  >
                    <v-icon>mdi-circle</v-icon>
                  </v-btn>
                </v-row>

                <v-row
                  v-else-if="
                    selectedGattung?.name?.trim() === '704A - Bestuhlung'
                  "
                >
                  <v-btn
                    icon
                    style="
                      position: absolute;
                      top: 35%;
                      left: 39%;
                      border-radius: 50%;
                      width: 40px;
                      height: 40px;
                      background-color: rgba(255, 255, 255, 0.7);
                    "
                    @click="onPointClick('point2')"
                  >
                    <v-icon>mdi-circle</v-icon>
                  </v-btn>

                  <v-btn
                    icon
                    style="
                      position: absolute;
                      top: 60%;
                      left: 35%;
                      border-radius: 50%;
                      width: 40px;
                      height: 40px;
                      background-color: rgba(255, 255, 255, 0.7);
                    "
                    @click="onPointClick('point3')"
                  >
                    <v-icon>mdi-circle</v-icon>
                  </v-btn>
                </v-row>

                <v-row
                  v-else-if="
                    selectedGattung?.name?.trim() ===
                    '770A - Fahrgastsitz-Rückseite'
                  "
                >
                  <v-btn
                    icon
                    style="
                      position: absolute;
                      top: 40%;
                      left: 62%;
                      border-radius: 50%;
                      width: 40px;
                      height: 40px;
                      background-color: rgba(255, 255, 255, 0.7);
                    "
                    @click="onPointClick('point5')"
                  >
                    <v-icon>mdi-circle</v-icon>
                  </v-btn>
                </v-row>
              </v-row>
              <!-- arkadaki buton -->
              <v-row v-else>
                <v-btn
                  icon
                  style="
                    position: absolute;
                    top: 35%;
                    left: 39%;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255, 255, 255, 0.7);
                  "
                  @click="onPointClick('point6')"
                >
                  <v-icon>mdi-circle</v-icon>
                </v-btn>
              </v-row>
              <v-dialog
                v-model="dialogVisible.point1"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Top Closer
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point1"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point1_1"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point1 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogVisible.point2"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Rück
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point2"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point2 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogVisible.point3"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Sitz
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point3"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point3 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogVisible.point4"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Bügel or Armlehne
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point4"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point4_1"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point4 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogVisible.point5"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Rückseite
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point5"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point5 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-dialog
                v-model="dialogVisible.point6"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Back
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point6"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point6 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-img>
            <!-- Haltestangen -->
            <v-img
              v-else-if="selectedMainGroup?.name?.trim() === 'Haltestangen'"
              :src="hal_customimg"
              contain
              max-height="700"
              max-width="1000"
              alt="Haltestangen image"
            >
              <v-row>
                <v-btn
                  icon
                  style="
                    position: absolute;
                    top: 52%;
                    left: 82%;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    background-color: rgba(255, 255, 255, 0.6);
                    color: black;
                  "
                  @click="onPointClick('point7')"
                >
                  <v-icon>mdi-circle</v-icon>
                </v-btn>
              </v-row>
              <v-dialog
                v-model="dialogVisible.point7"
                persistent
                max-width="600px"
              >
                <v-card>
                  <v-card-title class="text-h5 grey lighten-2 py-3 text-center">
                    Nur Knoten
                  </v-card-title>
                  <v-container>
                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point7"
                          class="elevation-12"
                          style="border-radius: 10px; width: 100%"
                        ></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="red"
                      text
                      @click="dialogVisible.point7 = false"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-img>
            <!-- Teleskop -->
            <v-img
              v-else-if="
                selectedMainGroup?.name?.trim() ===
                'Abschrankung/Haarnadelstange an Tür 1'
              "
              :src="teleskopImage"
              contain
              max-height="700"
              max-width="1000"
              alt="Teleskop image"
            >
              <v-btn @click="toggleTeleskopImage">{{
                teleskopButtonText
              }}</v-btn>
            </v-img>
            <!-- gegenüber  -->
            <v-img
              v-else-if="
                selectedMainGroup?.name?.trim() ===
                'Sondernutzungsfläche gegenüber Tür 2'
              "
              :src="gegenuberImage"
              contain
              max-height="700"
              max-width="1000"
              alt="Gegenuber image"
            >
            </v-img>
            <!-- rechts  -->
            <v-img
              v-else-if="
                selectedMainGroup?.name?.trim() ===
                'Sondernutzungsfläche rechts vor Tür 2'
              "
              :src="rechtImage"
              contain
              max-height="700"
              max-width="640"
              alt="Rechts image"
            >
            </v-img>
          </v-row>
          <v-row
            v-if="selectedType && selectedMainGroup?.name?.trim() === 'Camera'"
            class="d-flex justify-center mt-4"
          >
            <v-col class="d-flex justify-center">
              <v-row
                v-if="
                  selectedType?.name?.trim() === 'L4C' &&
                  selectedMainGroup?.name?.trim() === 'Camera'
                "
              >
                <v-checkbox
                  v-model="cameraEnabled.cam1_2T"
                  label="Cam 1"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam2_2T"
                  label="Cam 2"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam3_2T"
                  label="Cam 3"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam4_2T"
                  label="Cam 4"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam5_2T"
                  label="Cam 5"
                ></v-checkbox>
              </v-row>
              <v-col
                v-else-if="
                  selectedType?.name?.trim() === 'LE' &&
                  selectedMainGroup?.name?.trim() === 'Camera'
                "
              >
                <v-row>
                  <v-checkbox
                    v-model="cameraEnabled.cam1_3T"
                    label="Cam 1"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="cameraEnabled.cam2_3T"
                    label="Cam 2"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="cameraEnabled.cam3_3T"
                    label="Cam 3"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="cameraEnabled.cam4_3T"
                    label="Cam 4"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="cameraEnabled.cam5_3T"
                    label="Cam 5"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="cameraEnabled.cam6_3T"
                    label="Cam 6"
                  ></v-checkbox>
                </v-row>
              </v-col>
              <v-row
                v-else-if="
                  selectedType?.name?.trim() === 'Intercity' &&
                  selectedMainGroup?.name?.trim() === 'Camera'
                "
              >
                <v-checkbox
                  v-model="cameraEnabled.cam1_4T"
                  label="Cam 1"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam2_4T"
                  label="Cam 2"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam3_4T"
                  label="Cam 3"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam4_4T"
                  label="Cam 4"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam5_4T"
                  label="Cam 5"
                ></v-checkbox>
                <v-checkbox
                  v-model="cameraEnabled.cam6_4T"
                  label="Cam 5"
                ></v-checkbox>
              </v-row>
            </v-col>
            <v-col class="d-flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  stroke="black"
                  stroke-width="2"
                  fill="none"
                />
                <line
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="20"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="100"
                  y1="180"
                  x2="100"
                  y2="190"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="10"
                  y1="100"
                  x2="20"
                  y2="100"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="180"
                  y1="100"
                  x2="190"
                  y2="100"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="140"
                  y1="140"
                  x2="148"
                  y2="148"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="60"
                  y1="140"
                  x2="52"
                  y2="148"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="140"
                  y1="60"
                  x2="148"
                  y2="52"
                  stroke="black"
                  stroke-width="2"
                />
                <line
                  x1="60"
                  y1="60"
                  x2="52"
                  y2="52"
                  stroke="black"
                  stroke-width="2"
                />
                <text x="95" y="30" font-size="12" fill="black">270°</text>
                <text x="95" y="190" font-size="12" fill="black">90°</text>
                <text x="30" y="105" font-size="12" fill="black">180°</text>
                <text x="160" y="105" font-size="12" fill="black">0°</text>
                <text x="135" y="45" font-size="12" fill="black">315°</text>
                <text x="35" y="165" font-size="12" fill="black">135°</text>
                <text x="35" y="45" font-size="12" fill="black">225°</text>
                <text x="135" y="165" font-size="12" fill="black">45°</text>
              </svg>
            </v-col>
          </v-row>
        </v-col>

        <!-- Gattung Dropdown -->
        <v-col>
          <v-select
            ref="gattungSelect"
            :item-props="itemProps"
            v-model="selectedGattung"
            :items="filteredGattungs"
            :label="$t('gattung')"
            :disabled="!selectedMainGroup || !filteredGattungs.length"
            dense
            solo
            outlined
            hide-details
            item-text="name"
            item-value="gattung => gattung"
            @change="onGattungChange"
          ></v-select>

          <!-- Selection -->
          <v-col v-if="availableSubProducts.length">
            <v-card
              v-for="subProduct in availableSubProducts"
              :key="subProduct.name?.trim()"
            >
              <v-card-title>{{ subProduct.name?.trim() }}</v-card-title>
              <v-card-text>
                <!-- Normal select dropdown -->
                <v-select
                  v-if="
                    subProduct.gattungid === 4 &&
                    subProduct.name?.trim() !== 'STER 8 MS'
                  "
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[subProduct.name?.trim()]"
                  :label="$t('selectOption')"
                  :disabled="isDisabled(subProduct.name?.trim())"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="onOptionChange(subProduct.name?.trim(), $event)"
                ></v-select>
                <!-- Text input for STER 8 MS -->
                <v-select
                  v-else-if="
                    subProduct.gattungid === 4 &&
                    subProduct.name?.trim() === 'STER 8 MS'
                  "
                  :items="subProduct.options"
                  v-model="selectedModel[subProduct.name?.trim()]"
                  :label="$t('selectOption')"
                  :disabled="isDisabled(subProduct.name?.trim())"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="onOptionChange(subProduct.name?.trim(), $event)"
                ></v-select>
                <!-- Text input for 65A6 - Farbe der Haltestangen und Trennwände -->
                <v-select
                  v-else-if="
                    subProduct.name?.trim() === 'Nur Deckenhaltestangen in'
                  "
                  v-model="selectedRalCode"
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  :label="$t('selectOption')"
                  @change="handleRalCodeChange"
                ></v-select>

                <v-select
                  v-else-if="
                    subProduct.name?.trim() === '680A - SNF gegenüber Tür 2'
                  "
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedGegenuberOption"
                  :label="$t('selectOption')"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="updateGegenuberImage"
                ></v-select>
                <v-select
                  v-else-if="
                    subProduct.name?.trim() ===
                    '680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2'
                  "
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedGegenuberOption"
                  :label="$t('selectOption')"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="updateGegenuberImage"
                ></v-select>

                <v-select
                  v-else-if="
                    subProduct.name?.trim() ===
                    '681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2'
                  "
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedRechtsOption"
                  :label="$t('selectOption')"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="updateRechtsImage"
                ></v-select>

                <!-- Other sub-products -->
                <v-select
                  v-else
                  :items="subProduct.options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[subProduct.name?.trim()]"
                  :label="$t('selectOption')"
                  dense
                  solo
                  outlined
                  hide-details
                ></v-select>
                <!-- Color square -->
                <div
                  class="color-square"
                  v-if="shouldShowColorSquare(subProduct.name?.trim())"
                  :style="{
                    backgroundColor: getRalColor(
                      selectedModel[subProduct.name?.trim()]
                    ),
                  }"
                ></div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- bustec ımg vs -->
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
      </v-row>

      <!-- Export button -->
      <v-row v-if="selectedType" class="pt-0 grey darken-2">
        <v-col>
          <!-- Main Group and Gattung Selection -->
          <!-- Your existing dropdowns for main group and gattung here -->

          <!-- Export and Back Buttons -->
          <v-col class="custom-row">
            <v-btn class="custom-export" @click="xport" color="primary">
              Export
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="custom-back" color="primary" @click="resetSelection">
              Zurück
            </v-btn>
          </v-col>
        </v-col>

        <v-dialog v-model="dialog" opacity="0.7" persistent max-width="600px">
          <v-card>
            <v-card-title>
              Bus Type: {{ selectedType?.name?.trim() }}
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-item v-for="(group, index) in exportData" :key="index">
                  <v-list-item-content class="list-item-content">
                    <div>
                      <strong>Main Group:</strong> {{ group.mainGroup }}
                    </div>
                    <div v-if="group.gattung">
                      <strong>Gattung:</strong> {{ group.gattung }}
                    </div>
                    <div><strong>Products:</strong></div>
                    <ul style="margin-left: 20px">
                      <li
                        v-for="product in group.products"
                        :key="product.name?.trim()"
                      >
                        {{ product.name?.trim() }}: {{ product.value }}
                      </li>
                    </ul>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item> </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="green" text @click="finishExport">Finish</v-btn>
              <v-btn color="red" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <!-- Success log -->
      <v-alert
        v-if="showSuccessLog"
        type="success"
        dismissible
        @input="showSuccessLog = false"
        style="
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          background-color: green;
          color: white;
        "
      >
        Export finished successfully!
      </v-alert>

      <!-- Warning log -->
      <v-alert
        v-if="showWarningLog"
        type="warning"
        dismissible
        @input="showWarningLog = false"
        style="
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          background-color: yellow;
          color: black;
        "
      >
        Please make a selection before exporting!
      </v-alert>

      <!-- Main Content Screen -->
      <div v-if="selectionStarted">
        <!-- Your existing main content and selection layout... -->

        <!-- Export and Show Details Buttons -->
        <div class="fixed-buttons">
          <v-btn class="custom-export" @click="xport" color="primary">
            Export
          </v-btn>
          <v-btn
            class="show-details ml-2"
            color="primary"
            @click="showDetails"
            :disabled="!hasSelections"
          >
            Show Details
          </v-btn>
        </div>
      </div>

      <!-- Show Details Dialog -->
      <v-dialog v-model="showDetailsDialog" max-width="800px">
        <v-card>
          <v-card-title>Details</v-card-title>
          <v-card-text>
            <p>
              <strong>Main Group:</strong> {{ selectedMainGroup?.name?.trim() }}
            </p>
            <p><strong>Gattung:</strong> {{ selectedGattung?.name?.trim() }}</p>
            <template v-if="selectedMainGroup?.name?.trim() === 'Camera'">
              <p v-if="selectedModel.Type">
                <strong>Type:</strong> {{ selectedModel.Type }}
              </p>
              <p v-if="selectedModel.Recorder">
                <strong>Recorder:</strong> {{ selectedModel.Recorder }}
              </p>
              <p v-if="selectedModel.Length">
                <strong>Length:</strong> {{ selectedModel.Length }}
              </p>
            </template>
            <template v-if="selectedMainGroup?.name?.trim() === 'Bestuhlung'">
              <div v-if="selectedGattung?.name?.trim() === '704A - Bestuhlung'">
                <p v-if="selectedModel['Alle Sitze ohne Logo/Branding.']">
                  <strong>Logo/Branding:</strong>
                  {{ selectedModel["Alle Sitze ohne Logo/Branding."] }}
                </p>
                <p v-if="selectedModel['STER 8 MS']">
                  <strong>STER 8 MS:</strong> {{ selectedModel["STER 8 MS"] }}
                </p>
              </div>
              <div
                v-if="
                  selectedGattung?.name?.trim() === '78RI - Sitzhaltegriffe'
                "
              >
                <p v-if="selectedModel['Topcloser für EM']">
                  <strong>Topcloser für EM:</strong>
                  {{ selectedModel["Topcloser für EM"] }}
                </p>
              </div>
              <div
                v-if="selectedGattung?.name?.trim() === '78RD - Sitzarmlehnen'"
              >
                <p v-if="selectedModel['Gangseitige fixiert bügel color']">
                  <strong>Gangseitige fixiert bügel color:</strong
                  >{{ selectedModel["Gangseitige fixiert bügel color"] }}
                </p>
              </div>
            </template>
            <v-img :src="imgSrc" class="bus-image" ref="detailsImage">
              <div
                v-for="(detail, index) in selectedDetails"
                :key="index"
                :style="{
                  position: 'absolute',
                  top: detail.position.top,
                  left: detail.position.left,
                }"
              >
                <template v-if="detail.icon">
                  <svg
                    :style="{ transform: `rotate(${detail.rotation}deg)` }"
                    width="30"
                    height="20"
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
                </template>
                <template v-else>
                  <span
                    :style="{ color: detail.color || 'red', fontSize: '20px' }"
                    >{{ detail.text }}</span
                  >
                </template>
              </div>
            </v-img>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="downloadDetailsImage">Download</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" @click="showDetailsDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  mounted() {
    // Perform actions when the component is fully mounted in the DOM, e.g., fetch data from an API
    console.log("Component mounted!");
    this.fetchTypes();
    this.fetchMainGroups();
    this.fetchGattungs();
    this.fetchProducts();
    this.products.forEach((product) => {
      this.checkAndUpdateHalCustomImg(product);
    });
    console.log("Component mounted! Chair Image:", this.chairImage);
  },

  watch: {
    selectedMainGroup(newVal) {
      this.onMainGroupChange(newVal);
    },
    //gattung
    selectedGattung(newVal) {
      this.onGattungChange(newVal);
    },
    selectedRalCode(newVal, oldVal) {
      this.updateHalCustomImg();
    },
    selectedGegenuberOption(newOption) {
      this.updateGegenuberImage(newOption);
    },
    selectedRechtsOption(newOption) {
      this.updateRechtsImage(newOption);
    },
  },

  computed: {
    selectedVehicleImage() {
      console.log("selectedType called");
      if (!this.selectedType) {
        console.log("selectedType is null or undefined");
        return "";
      }
      console.log("selectedType:", this.selectedType);

      switch (this.selectedType.name?.trim()) {
        case "L4C":
          console.log("L4C");
          return "/static/12C-2T.jpg";

        case "LE":
          console.log("L4C");
          return "/static/18C-3T.jpg";
        case "Intercity":
          console.log("L4C");
          return "/static/19C-4T.jpg";
        default:
          return "";
      }
    },

    hasSelections() {
      return Object.keys(this.selectedModel).length > 0;
    },
    comModels() {
      const found = this.products.find(
        (p) => p.name?.trim() === this.selectedMainGroup
      );
      return found ? found.subProducts : [];
    },
    comModelsGat() {
      const foundGattung = this.gattungProducts.find(
        (g) => g.name?.trim() === this.selectedGattung
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
    testComputed() {
      console.log("testComputed function called");
      return "Computed property is working!";
    },
    modelImageDetails() {
      let imageDetails = {
        showImage: false,
        src: "",
        alt: "",
      };

      if (this.selectedMainGroup === "Fahrtziealanzeige Heck") {
        switch (this.selectedModel["Model"]) {
          case "BUSTEC":
            imageDetails.showImage = true;
            imageDetails.src = "/assets/RareDisplay/Bustec.jpg"; // Replace with the actual path to the BUSTEC image
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

    availableSubProducts() {
      if (!this.selectedMainGroup) {
        return [];
      }

      // Main Group'a ait productları al
      const currentGroupProducts = this.products.filter(
        (product) => product.maingroupid === this.selectedMainGroup.maingroupid
      );

      // Eğer Gattung seçilmemişse ve currentGroupProducts içinde GattungID null olanlar varsa onları döndür
      if (!this.selectedGattung) {
        return currentGroupProducts.filter(
          (product) => product.gattungid === null
        );
      }

      // Eğer Gattung seçilmişse, seçilen GattungID'ye ait productları döndür
      return currentGroupProducts.filter(
        (product) => product.gattungid === this.selectedGattung.gattungid
      );
    },
    filteredGattungs() {
      if (!this.selectedMainGroup) {
        return [];
      }

      return this.gattungs.filter(
        (gattung) => gattung.maingroupid === this.selectedMainGroup.maingroupid
      );
    },

    filteredSubProducts() {
      const subProducts = this.products.find(
        (product) => product.mainGroup === this.selectedMainGroup
      )?.subProducts;
      return (
        subProducts?.filter(
          (subProduct) => this.selectedModel[subProduct.name?.trim]
        ) || []
      );
    },

    //704A bestuhlung
    isSterSelected() {
      return this.selectedModel["STER 8 MS"];
    },
    isOtherOptionSelected() {
      return (
        this.selectedModel["mit Schaum Sitzpolster"] ||
        this.selectedModel["mit Schaum Rückenpolster"] ||
        this.selectedModel["Alle Sitze ohne Logo/Branding."]
      );
    },

    filteredTypes() {
      console.log("Filtred Types");
      const query = this.searchQuery.toLowerCase();
      return this.types.filter(
        (type) =>
          type.name?.trim().toLowerCase().includes(query) ||
          type.fuel.toLowerCase().includes(query) ||
          type.length.toLowerCase().includes(query) ||
          type.seats.toLowerCase().includes(query) ||
          type.features.toLowerCase().includes(query)
      );
    },
  },

  data() {
    return {
      selectedGegenuberOption: null,
      selectedRechtsOption: null,
      selectedType: null,
      selectedRalCode: null,
      selectedMainGroup: null,
      selectedGattung: null,
      selectedModel: {},
      showDetailsDialog: false,
      accumulatedDetails: [],
      selectedDetails: [],
      types: [],
      mainGroups: [],
      gattungs: [],
      products: [],
      dialog: false,
      cameraRotations: {
        cam1_4T: 0,
        cam2_4T: 0,
        cam3_4T: 0,
        cam4_4T: 0,
        cam5_4T: 0,
        cam6_4T: 0,
        cam1_3T: 0,
        cam2_3T: 0,
        cam3_3T: 0,
        cam4_3T: 0,
        cam5_3T: 0,
        cam6_3T: 0,
        cam1_2T: 0,
        cam2_2T: 0,
        cam3_2T: 0,
        cam4_2T: 0,
        cam5_2T: 0,
      },
      cameraEnabled: {
        cam1_4T: true,
        cam2_4T: true,
        cam3_4T: true,
        cam4_4T: true,
        cam5_4T: true,
        cam6_4T: true,
        cam1_3T: true,
        cam2_3T: true,
        cam3_3T: true,
        cam4_3T: true,
        cam5_3T: true,
        cam6_3T: true,
        cam1_2T: true,
        cam2_2T: true,
        cam3_2T: true,
        cam4_2T: true,
        cam5_2T: true,
      },
      dialogVisible: {
        point1: false,
        point2: false,
        point3: false,
        point4: false,
        point5: false,
        point6: false,
        point7: false,
      },
      detailImages: {
        point1: "/assets/Bestuhlung/topcloser.bmp",
        point1_1: "/assets/Bestuhlung/topcloser detail.bmp",
        point2: "/assets/Bestuhlung/Rück.bmp",
        point3: "/assets/Bestuhlung/sitz.bmp",
        point4: "/assets/Bestuhlung/bugel or armlehne color.bmp",
        point4_1: "/assets/Bestuhlung/armlehne color.bmp",
        point5: "/assets/Bestuhlung/rückseite.bmp",
        point6: "/assets/Bestuhlung/back.bmp",
        point7: "/assets/Haltestangen/fittings.jpg",
      },

      ralColors: {
        "RAL 1023": "#F4A900",
        "RAL 3001": "#A2231D",
        "RAL 9004": "#282828",
        "RAL 7016": "#1F2A35",
        "RAL 7037": "#7D7F7D",
        "RAL 1005": "#ECA527",
        "RAL 3003": "#911B22",
        "RAL 1003": "#F7BA0B",
        "RAL 3020": "#CC0E1D",
        "RAL 5007": "#336699",
        "RAL 1015": "#E6D690",

        // Add other RAL colors as needed
      },

      showButtons: true,
      chairImage: "https://mandb.s3.eu-north-1.amazonaws.com/normal.png",
      chairBackImage: "/assets/Bestuhlung/normal back.bmp",
      hal_customimg: "/assets/Haltestangen/080CC.jpg",
      hal_3000img: "/assets/Haltestangen/3000.jpg",
      hal_1003img: "/assets/Haltestangen/1003.jpg",

      gegenuber1img: "/assets/gegenüber/Resim1.png",
      gegenuber2img: "/assets/gegenüber/Resim2.png",
      gegenuber3img: "/assets/gegenüber/Resim3.png",
      gegenuberImage: "",
      rechtImage: "",
      glasscheibeimg: "/assets/gegenüber/mit halter ohne schloss.png",
      klappbare_armlehneimg: "/assets/gegenüber/klappbare armlehne 2.png",
      mit_halter_ohne_schlossimg: "/assets/gegenüber/glasscibe.png",

      teleskop_on: "/assets/Teleskop/teleskop_on.png",
      teleskop_off: "/assets/Teleskop/teleskop_off.png",
      teleskopImage: "/assets/Teleskop/teleskop_off.png",
      img12C: "https://mandb.s3.eu-north-1.amazonaws.com/static/12C-2T.jpg",
      img18C: "/static/18C-3T.jpg",
      img19C: "/static/19C-4T.jpg",
      RareImage: "/assets/RareDisplay/image004.png",

      searchQuery: "",
      availableSubProducts: [],
      exportData: [],
      showSuccessLog: false,
      showWarningLog: false,

      imgSrc: "",
    };
  },

  // ... methods, etc.
  methods: {
    handleRalCodeChange() {
      console.log("RAL kodu değişti:", this.selectedRalCode);
      this.updateHalCustomImg();
    },

    goHome() {
      router.push("/");
    },
    onImageLoad() {
      console.log("Image loaded successfully.");
    },
    onImageError() {
      console.log("Error loading image.");
    },
    toggleCamera(cameraId) {
      this.cameraEnabled[cameraId] = !this.cameraEnabled[cameraId]; // Toggle camera enabled/disabled state
    },
    rotateCamera(cameraId) {
      if (this.cameraEnabled[cameraId]) {
        this.cameraRotations[cameraId] += 45; // Rotate by 45 degrees on each click
      }
    },
    itemProps(item) {
      return {
        title: item?.name,
        value: item,
        // MainGroupID: item?.MainGroupID, // MainGroupID'yi ekledik
      };
    },
    itemPropsGattung(item) {
      return {
        title: item?.name,
        value: item,
        maingroupid: item?.maingroupid,
        gattungid: item?.gattungid,
      };
    },

    showExportDialog() {
      this.dialog = true;
    },
    ...mapActions(["triggerSuccessLog"]),
    xport() {
      this.exportData = [];
      const mainGroups = this.mainGroups.filter((mainGroup) =>
        this.products.some(
          (product) =>
            product.maingroupid === mainGroup.maingroupid &&
            this.selectedModel[product.name?.trim()]
        )
      );

      mainGroups.forEach((mainGroup) => {
        const gattungs = this.gattungs.filter(
          (gattung) => gattung.maingroupid === mainGroup.maingroupid
        );

        if (gattungs.length > 0) {
          gattungs.forEach((gattung) => {
            const products = this.products
              .filter(
                (product) =>
                  product.gattungid === gattung.gattungid &&
                  this.selectedModel[product.name?.trim()]
              )
              .map((product) => {
                return {
                  name: product.name,
                  value: this.selectedModel[product.name?.trim()],
                };
              });

            if (products.length > 0) {
              this.exportData.push({
                mainGroup: mainGroup.name?.trim(),
                gattung: gattung.name?.trim(),
                products,
              });
            }
          });
        } else {
          const products = this.products
            .filter(
              (product) =>
                product.maingroupid === mainGroup.maingroupid &&
                !product.gattungid &&
                this.selectedModel[product.name?.trim()]
            )
            .map((product) => {
              return {
                name: product.name?.trim(),
                value: this.selectedModel[product.name?.trim()],
              };
            });

          if (products.length > 0) {
            this.exportData.push({
              mainGroup: mainGroup.name?.trim(),
              gattung: null,
              products,
            });
          }
        }
      });

      // Include camera rotations for the selected type
      const selectedTypPart = this.selectedType.name.split("-")[1];
      const cameraRotationsForTyp = Object.keys(this.cameraRotations)
        .filter((key) => key.includes(selectedTypPart))
        .reduce((obj, key) => {
          obj[key] = this.cameraRotations[key];
          return obj;
        }, {});

      if (Object.keys(cameraRotationsForTyp).length > 0) {
        this.exportData.push({
          mainGroup: "Camera Rotations",
          products: Object.keys(cameraRotationsForTyp).map((key) => ({
            name: key,
            value: cameraRotationsForTyp[key] + "°",
          })),
        });
      }

      if (this.exportData.length > 0) {
        this.dialog = true;
      } else {
        this.showWarningLog = true;
        setTimeout(() => {
          this.showWarningLog = false;
        }, 3000);
      }
    },
    finishExport() {
      this.triggerSuccessLog(); // Trigger success log in Vuex store
      this.dialog = false;
      setTimeout(() => {
        this.$router.push({ path: "/" }); // Navigate to home page after delay
      }, 100); // Small delay to ensure alert is displayed
    },

    onMainGroupChange() {
      console.log("Main Group Changed:", this.selectedMainGroup);
      //this.selectedGattung = null; // Gattung seçimlerini sıfırla
      //this.selectedModel = {}; // Modelleri de sıfırla
      if (this.selectedGattung) {
        this.selectedGattung = {
          ...this.selectedGattung,
          name: "",
          gattungid: null,
        };
      }
      this.updateAvailableSubProducts();
    },
    updateAvailableSubProducts() {
      this.availableSubProducts = this.getSubProductsForMainGroupAndGattung(
        this.selectedMainGroup,
        this.selectedGattung
      );
    },
    getSubProductsForMainGroupAndGattung(mainGroup, gattung) {
      const filteredProducts = this.products.filter(
        (product) => product.maingroupid === mainGroup.maingroupid
      );

      if (!gattung) {
        return filteredProducts.filter((product) => product.gattungid === null);
      } else {
        return filteredProducts.filter(
          (product) => product.gattungid === gattung.gattungid
        );
      }
    },
    onMainGroupChange(newVal) {
      console.log("Main Group Changed:", newVal);
      this.updateAvailableSubProducts();
      this.selectedGattung = null;
      this.imgSrc = "";
      this.accumulatedDetails = [];

      // Görsel güncellemesi
      if (newVal.name.includes("Haltestangen")) {
        this.selectedImage = this.hal_customimg; // Haltestangen için görsel
      } else if (newVal.name.includes("Bestuhlung")) {
        this.selectedImage = this.chairImage; // Bestuhlung için görsel
        console.log("Bestuhlung Image:", this.chairImage);
      } else if (newVal.name.includes("Camera")) {
        this.selectedImage = this.img12C; // Camera için görsel
      } else {
        this.selectedImage = ""; // Default görsel ya da boş bırak
      }
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

    onGattungChange(newVal) {
      console.log("Gattung Changed:", this.selectedGattung);
      //this.selectedModel = {}; // Modelleri de sıfırla

      this.updateAvailableSubProducts();
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
    onPointClick(point) {
      this.dialogVisible[point] = true;
    },

    toggleChair() {
      this.showButtons = !this.showButtons;
      this.chairImage = this.showButtons
        ? "https://mandb.s3.eu-north-1.amazonaws.com/normal.png"
        : "/assets/Bestuhlung/normal back.bmp";
    },

    openVehicleDialog(type) {
      this.selectedVehicle = type;
      this.vehicleDialog = true;
    },
    chooseVehicle() {
      this.selectedType = this.selectedVehicle;
      this.vehicleDialog = false;
    },
    resetSelection() {
      this.selectedType = "";
      this.selectedMainGroup = "";
      this.selectedGattung = "";
      this.selectedModel = {};
      this.cameraRotations = {
        cam1_4T: 0,
        cam2_4T: 0,
        cam3_4T: 0,
        cam4_4T: 0,
        cam5_4T: 0,
        cam6_4T: 0,

        cam1_3T: 0,
        cam2_3T: 0,
        cam3_3T: 0,
        cam4_3T: 0,
        cam5_3T: 0,
        cam6_3T: 0,

        cam1_2T: 0,
        cam2_2T: 0,
        cam3_2T: 0,
        cam4_2T: 0,
        cam5_2T: 0,
      };
    },
    //koltuk seçimlerinde sınırlandırma
    isDisabled(productName) {
      if (
        this.selectedGattung &&
        this.selectedGattung.name?.trim() === "704A - Bestuhlung"
      ) {
        if (productName === "STER 8 MS") {
          return (
            this.selectedModel["mit Schaum Sitzpolster"] ||
            this.selectedModel["mit Schaum Rückenpolster"] ||
            this.selectedModel["Alle Sitze ohne Logo/Branding."]
          );
        } else {
          return this.selectedModel["STER 8 MS"] === "mit Schutzband";
        }
      }
      return false;
    },

    async fetchTypes() {
      try {
        console.log("Fetching types...");
        const response = await fetch(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/types"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched types data:", data);
        this.types = data;
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    },
    async fetchMainGroups() {
      try {
        console.log("Fetching main groups...");
        const response = await fetch(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/maingroups"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched main groups data:", data);
        this.mainGroups = data;
      } catch (error) {
        console.error("Error fetching main groups:", error);
      }
    },
    async fetchGattungs() {
      try {
        console.log("Fetching gattungs...");
        const response = await fetch(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/gattungs"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched gattungs data:", data);
        this.gattungs = data;
      } catch (error) {
        console.error("Error fetching gattungs:", error);
      }
    },
    async fetchProducts() {
      try {
        console.log("Fetching products...");
        const response = await fetch(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log("Fetched products data:", data);

        // Options alanını parse et
        data = data.map((product) => {
          if (product.options) {
            try {
              product.options = JSON.parse(product.options.replace(/'/g, '"'));
            } catch (e) {
              console.error("Error parsing options:", e);
              product.options = [];
            }
          }
          return product;
        });

        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    changeLanguage(language) {
      this.$i18n.locale = language;
    },
    onOptionChange(productName, value) {
      if (productName === "STER 8 MS") {
        if (value === "ohne Schutzband") {
          // Enable all other products
          for (const key in this.selectedModel) {
            if (this.selectedModel.hasOwnProperty(key)) {
              this.selectedModel[key] = null; // Resetting the value
            }
          }
        }
      } else {
        this.selectedModel[productName] = value;
      }
    },

    getRalColor(code) {
      return this.ralColors[code] || "#FFFFFF"; // Default to white if code is not found
    },
    shouldShowColorSquare(productName) {
      const validProducts = [
        "Topcloser",
        "Topcloser für EM",
        "Gangseitige fixiert bügel color",
        "Gangseitige klappbare armlehne",
        "Kunststoff-Fahrgastsitzrückseite",
      ];

      if (
        this.selectedMainGroup &&
        this.selectedMainGroup.name?.trim() === "Bestuhlung"
      ) {
        if (
          this.selectedGattung &&
          (this.selectedGattung.name.trim() === "78RI - Sitzhaltegriffe" ||
            this.selectedGattung.name.trim() === "78RD - Sitzarmlehnen" ||
            this.selectedGattung.name.trim() ===
              "770A - Fahrgastsitz-Rückseite") &&
          validProducts.includes(productName)
        ) {
          return true;
        }
      }
      return false;
    },

    updateHalCustomImg() {
      console.log("checkandupdatexx");
      if (this.selectedRalCode === "RAL 080C") {
        this.hal_customimg = "/assets/Haltestangen/080CC.jpg";
      } else if (this.selectedRalCode === "RAL 1003") {
        this.hal_customimg = "/assets/Haltestangen/1003.jpg";
      } else if (this.selectedRalCode === "RAL 3000") {
        this.hal_customimg = "/assets/Haltestangen/3000.jpg";
      }
    },
    checkAndUpdateHalCustomImg(product) {
      if (product.name?.trim() === "Nur Deckenhaltestangen in") {
        console.log("checkandupdate");
        this.updateHalCustomImg(product.ralCode);
      }
    },

    toggleTeleskopImage() {
      if (this.teleskopImage === this.teleskop_off) {
        this.teleskopImage = this.teleskop_on;
        this.teleskopButtonText = "Show";
      } else {
        this.teleskopImage = this.teleskop_off;
        this.teleskopButtonText = "Show";
      }
    },
    updateRechtsImage(option) {
      if (option) {
        this.selectedModel[
          "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2"
        ] = option; // Ensure the selected model is updated
        if (option === "Armlehne mit halter ohne Schloss") {
          this.rechtImage = this.glasscheibeimg;
        } else if (option === "Mit klappbarer Armlehne auf dem Bügel") {
          this.rechtImage = this.klappbare_armlehneimg;
        } else if (option === "Ausführung Trennwand mit Glasscheibe") {
          this.rechtImage = this.mit_halter_ohne_schlossimg;
        }
      }
    },
    updateGegenuberImage(option) {
      console.log("updateGegenuberImage çağrıldı, option:", option);
      if (option) {
        console.log("Option mevcut, işlem devam ediyor...");
        this.selectedModel["680A - SNF gegenüber Tür 2"] = option;
        console.log("selectedModel güncellendi:", this.selectedModel);

        if (
          option.trim() ===
          "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Mit E-scooter Piktogramm."
        ) {
          this.gegenuberImage = this.gegenuber1img;
          console.log("gegenuberImage güncellendi: gegenuber1img");
        } else if (
          option ===
          "Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff."
        ) {
          this.gegenuberImage = this.gegenuber2img;
          console.log("gegenuberImage güncellendi: gegenuber2img");
        } else if (
          option ===
          "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff."
        ) {
          this.gegenuberImage = this.gegenuber3img;
          console.log("gegenuberImage güncellendi: gegenuber3img");
        } else if (option === "Armlehne mit halter ohne Schloss") {
          this.gegenuberImage = this.glasscheibeimg;
          console.log("gegenuberImage güncellendi: glasscheibeimg");
        } else if (option === "Mit klappbarer Armlehne auf dem Bügel") {
          this.gegenuberImage = this.klappbare_armlehneimg;
          console.log("gegenuberImage güncellendi: klappbare_armlehneimg");
        } else if (option === "Ausführung Trennwand mit Glasscheibe") {
          this.gegenuberImage = this.mit_halter_ohne_schlossimg;
          console.log("gegenuberImage güncellendi: mit_halter_ohne_schlossimg");
        }
      } else {
        console.log("Option mevcut değil, işlem durduruldu.");
      }
    },
    selectVehicle(type) {
      console.log("selectVehicle function called with type:", type);
      this.selectedType = type;
      this.selectionStarted = true; // Set to true when a vehicle is selected
    },
    updateSelection(key, value) {
      if (value) {
        this.$set(this.selectedModel, key, value);
      } else {
        this.$delete(this.selectedModel, key);
      }
    },
    showDetails() {
      console.log("Show Details button clicked"); // Debug log
      // Export data üzerinden dönerek product'ları kontrol edelim

      // Reset accumulated details
      this.accumulatedDetails = [];

      if (this.selectedMainGroup?.name?.trim() === "Bestuhlung") {
        if (this.selectedGattung?.name?.trim() === "704A - Bestuhlung") {
          // Add existing selected details
          if (this.selectedModel["mit Schaum Sitzpolster"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["mit Schaum Sitzpolster"],
              position: { top: "35%", left: "35%" },
            });
          }
          if (this.selectedModel["mit Schaum Rückenpolster"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["mit Schaum Rückenpolster"],
              position: { top: "65%", left: "25%" },
            });
          }
        } else if (
          this.selectedGattung?.name?.trim() === "78RI - Sitzhaltegriffe"
        ) {
          // Add details for Gattung 78RI
          if (this.selectedModel["Topcloser"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["Topcloser"],
              position: { top: "8%", left: "30%" },
              color: this.getRalColor(this.selectedModel["Topcloser"]),
            });
          }
        } else if (
          this.selectedGattung?.name?.trim() === "78RD - Sitzarmlehnen"
        ) {
          if (this.selectedModel["Gangseitige klappbare armlehne"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["Gangseitige klappbare armlehne"],
              position: { top: "50%", left: "8%" },
              color: this.getRalColor(
                this.selectedModel["Gangseitige klappbare armlehne"]
              ),
            });
          }
        } else if (
          this.selectedGattung?.name?.trim() === "770A - Fahrgastsitz-Rückseite"
        ) {
          // Add details for Kunststoff-Fahrgastsitzrückseite
          if (this.selectedModel["Kunststoff-Fahrgastsitzrückseite"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["Kunststoff-Fahrgastsitzrückseite"],
              position: { top: "40%", left: "80%" },
              color: this.getRalColor(
                this.selectedModel["Kunststoff-Fahrgastsitzrückseite"]
              ),
            });
          }
        }
        this.imgSrc = "../assets/Bestuhlung/bestuhlung_default.jpeg"; // Set to the correct image path for Bestuhlung
      } else if (this.selectedMainGroup?.name?.trim() === "Haltestangen") {
        if (
          this.selectedGattung?.name?.trim() ===
          "65A6 - Farbe der Haltestangen und Trennwände"
        ) {
          // Add details for Haltestangen
          if (this.selectedModel["Nur Knoten in"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["Nur Knoten in"],
              position: { top: "52%", left: "82%" },
            });
          }
          if (this.selectedModel["Nur Deckenhaltestangen in"]) {
            this.accumulatedDetails.push({
              text: this.selectedModel["Nur Deckenhaltestangen in"],
              position: { top: "20%", left: "50%" },
            });
            // Update imgSrc based on selected RAL code
          }
          this.imgSrc = "../assets/Haltestangen/080CC.jpg";
        }
      } else if (
        this.selectedMainGroup?.name?.trim() === "Fahrtziealanzeige Heck"
      ) {
        if (this.selectedGattung?.name?.trim() === "528M") {
          if (this.selectedModel["Model"]) {
            this.accumulatedDetails.push({
              text: `Model: ${this.selectedModel["Model"]}`,
              position: { top: "50%", left: "40%" },
            });
          }
          if (this.selectedModel["Size"]) {
            this.accumulatedDetails.push({
              text: `Size: ${this.selectedModel["Size"]}`,
              position: { top: "55%", left: "40%" },
            });
          }
          if (this.selectedModel["Led Color"]) {
            this.accumulatedDetails.push({
              text: `Led Color: ${this.selectedModel["Led Color"]}`,
              position: { top: "60%", left: "40%" },
            });
          }
          if (this.selectedModel["Rearmost"]) {
            this.accumulatedDetails.push({
              text: `Rearmost: ${this.selectedModel["Rearmost"]}`,
              position: { top: "65%", left: "40%" },
            });
          }
        }
        this.imgSrc = "/assets/RareDisplay/image004.png";
      } else if (this.selectedMainGroup?.name?.trim() === "Camera") {
        if (
          this.selectedGattung?.name?.trim() ===
          "359F - Überwachungsanlage Fahrgastraum"
        ) {
          if (this.selectedModel["Type"]) {
            this.accumulatedDetails.push({
              position: { top: "20%", left: "50%" },
            });
          }
          if (this.selectedModel["Recorder"]) {
            this.accumulatedDetails.push({
              position: { top: "30%", left: "50%" },
            });
          }
          if (this.selectedModel["Length"]) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "50%" },
            });
          }
          // Add details for Camera
          if (this.selectedType?.name?.trim() === "L4C") {
            this.imgSrc = "/static/12C-2T.jpg";
            this.addCameraIcons("2T");
          } else if (this.selectedType?.name?.trim() === "LE") {
            this.imgSrc = "/static/18C-3T.jpg";
            this.addCameraIcons("3T");
          } else if (this.selectedType?.name?.trim() === "Intercity") {
            this.imgSrc = "/static/19C-4T.jpg";
            this.addCameraIcons("4T");
          }
        }
        // Update imgSrc based on selected Type
      
      } else if (
        this.selectedMainGroup?.name?.trim() ===
        "Sondernutzungsfläche rechts vor Tür 2"
      ) {
        if (
          this.selectedGattung?.name?.trim() ===
          "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2"
        ) {
          if (
            this.selectedModel[
              "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2"
            ] === "Armlehne mit halter ohne Schloss"
          )
          {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
              
            });
            this.imgSrc = "../assets/gegenüber/mit halter ohne schloss.png";
          }
         
          if (
            this.selectedModel[
              "681D - Anlehnplatte/Klappsitze vor SNF vor Tür 2"
            ] === "Mit klappbarer Armlehne auf dem Bügel"
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc = "../assets/gegenüber/klappbare armlehne 2.png";
          }
          
          if (
            this.selectedModel[
              "681D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2"
            ] === "Ausführung Trennwand mit Glasscheibe"
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc = "../assets/gegenüber/glasscibe.png";
          }
          
        }
      } else if (
        this.selectedMainGroup?.name?.trim() ===
        "Sondernutzungsfläche gegenüber Tür 2"
      ) {
        if (
          this.selectedGattung?.name?.trim() === "680A - SNF gegenüber Tür 2"
        ) {
          if (
            this.selectedModel["680A - SNF gegenüber Tür 2"] ===
            "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Mit E-scooter Piktogramm."
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc = "../assets/gegenüber/Resim1.png";
          }
          if (
            this.selectedModel["680A - SNF gegenüber Tür 2"] ===
            "Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff."
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc = "../assets/gegenüber/Resim2.png";
          }
          if (
            this.selectedModel["680A - SNF gegenüber Tür 2"] ===
            "Geeignet für E-Scooter, (Länge min. 2.000mm) mit E-Scooter tauglichem Bügel. Verbau eines verkürzten Motorpodestes mit Ablagekasten, Ausführung analog Vorderachse. Trennwand nach SNF in Ausführung Holz mit Sitzbezugsstoff."
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc = "../assets/gegenüber/Resim3.png";
          }
        } else if (
          this.selectedGattung?.name?.trim() ==="680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2"
        ) {
          if (
            this.selectedModel["680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2"] === "Armlehne mit halter ohne Schloss"
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc ="../assets/gegenüber/mit halter ohne schloss.png";
          }
         else if (
            this.selectedModel[
              "680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2" ] === "Mit klappbarer Armlehne auf dem Bügel"
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });

            this.imgSrc ="../assets/gegenüber/klappbare armlehne 2.png";
          }
         else if (
            this.selectedModel["680D - Anlehnplatte/Klappsitze vor SNF gegenüber Tür 2"] === "Ausführung Trennwand mit Glasscheibe"
          ) {
            this.accumulatedDetails.push({
              position: { top: "40%", left: "40%" },
            });
            this.imgSrc ="../assets/gegenüber/glasscibe.png";
          }
        }
      }

      this.selectedDetails = [...this.accumulatedDetails];
      this.showDetailsDialog = true;
      console.log("Dialog should now be open"); // Debug log
    },

    addCameraIcons(suffix) {
      for (let i = 1; i <= 6; i++) {
        const cameraKey = `cam${i}_${suffix}`;
        if (this.cameraRotations[cameraKey] !== undefined) {
          this.accumulatedDetails.push({
            icon: true,
            position: this.getCameraPosition(cameraKey),
            rotation: (this.cameraRotations[cameraKey] + 360) % 360,
          });
        }
      }
    },

    getCameraPosition(cameraKey) {
      const positions = {
        cam1_2T: { top: "35%", left: "90%" },
        cam2_2T: { top: "25%", left: "79%" },
        cam3_2T: { top: "25%", left: "55%" },
        cam4_2T: { top: "25%", left: "15%" },
        cam5_2T: { top: "70%", left: "8%" },

        cam1_3T: { top: "45%", left: "95%" },
        cam2_3T: { top: "25%", left: "85%" },
        cam3_3T: { top: "25%", left: "65%" },
        cam4_3T: { top: "70%", left: "50%" },
        cam5_3T: { top: "25%", left: "30%" },
        cam6_3T: { top: "70%", left: "5%" },

        cam1_4T: { top: "45%", left: "95%" },
        cam2_4T: { top: "25%", left: "85%" },
        cam3_4T: { top: "25%", left: "62%" },
        cam4_4T: { top: "70%", left: "50%" },
        cam5_4T: { top: "25%", left: "30%" },
        cam6_4T: { top: "25%", left: "16%" },
      };

      return positions[cameraKey] || { top: "0%", left: "0%" };
    },
    methods: {
      downloadDetailsImage() {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = this.$refs.detailsImage;
        const svgElements = img.querySelectorAll("svg");

        canvas.width = img.width;
        canvas.height = img.height;

        const imgElement = new Image();
        imgElement.src = img.src;
        imgElement.onload = () => {
          context.drawImage(imgElement, 0, 0);
          svgElements.forEach((svg) => {
            const svgData = new XMLSerializer().serializeToString(svg);
            const imgSrc = "data:image/svg+xml;base64," + btoa(svgData);
            const image = new Image();
            image.src = imgSrc;
            image.onload = () => {
              context.drawImage(
                image,
                parseFloat(svg.style.left),
                parseFloat(svg.style.top)
              );
            };
          });

          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.download = "details.png";
          link.click();
        };
      },
    },
  },
};
</script>

<style scoped>
.fixed-buttons {
  position: fixed;
  bottom: 0px;
  right: 110px;
  display: flex;
  align-items: center;
}

.show-details {
  margin-top: 20px;
}
.bus-image {
  width: 100%;
  height: auto;
}
.relative {
  position: relative;
}
.custom-alert {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
.color-square {
  width: 50px;
  height: 20px;
  border: 1px white;

  margin-right: 5px;
}
.wrapper {
  position: relative;
}

.cam1_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 40%;
  right: 1px;
  transform: rotate();
}

.cam2_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 8%;
  transform: rotate();
}
.cam3_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 31%;
  transform: rotate();
}
.cam4_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 70%;
  right: 44%;
  transform: rotate();
}
.cam5_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 64%;
  transform: rotate();
}
.cam6_4T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 77%;
  transform: rotate();
}
.cam1_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 40%;
  right: 1px;
  transform: rotate();
}

.cam2_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 8%;
  transform: rotate();
}
.cam3_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 28%;
  transform: rotate();
}
.cam4_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 70%;
  right: 42%;
  transform: rotate();
}
.cam5_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 62%;
  transform: rotate();
}
.cam6_3T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 70%;
  right: 88%;
  transform: rotate();
}
.cam1_2T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 40%;
  right: 1px;
  transform: rotate();
}
.cam2_2T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 15%;
  transform: rotate();
}
.cam3_2T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 40%;
  transform: rotate();
}
.cam4_2T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 25%;
  right: 79%;
  transform: rotate();
}
.cam5_2T {
  height: 8%;
  width: 10%;
  position: absolute;
  top: 70%;
  right: 85%;
  transform: rotate();
}
.disabled {
  pointer-events: none; /* Disable click events */
  opacity: 0.5; /* Reduce opacity to show it is disabled */
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
.bold-text {
  font-weight: bold;
  color: black;
  background-color: #e5e5e5; /* Daha koyu arka plan rengi */
}

.vehicle-card {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.vehicle-image {
  height: 380px;
  object-fit: cover;
}

.v-card-subtitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.v-card-title,
.v-card-subtitle {
  text-align: left;
}

/* Feature list styling */
.feature-list {
  list-style-position: inside; /* Ensure bullets are inside the list item */
  padding-left: 0; /* Remove default padding */
  text-align: left; /* Align text to the left */
}
.feature-list li {
  margin-left: 0px; /* Add some left margin to indent the text */
}
.vehicle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.vehicle-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
.vehicle-col {
  display: flex;
  justify-content: center;
  max-width: 300px;
}
.language-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.flag-icon {
  width: 20px;
  height: 14px;
}

.separator {
  margin: 0 8px;
  font-size: 20px;
}

.flag-btn {
  min-width: auto;
  padding: 0;
}
.language-switcher .v-text-field {
  max-width: 320px;
}
.vehicle-title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
