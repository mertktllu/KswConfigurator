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
            <v-card
              @click="openVehicleDialog(type)"
              hoverable
              class="vehicle-card"
            >
              <v-img :src="type.Image" class="vehicle-image"></v-img>
              <v-card-title>{{ type.Name }}</v-card-title>
              <v-card-subtitle>
                <div>
                  <p>
                    <strong>{{ $t("fuel") }}:</strong> {{ type.Fuel }}
                  </p>
                  <p>
                    <strong>{{ $t("length") }}:</strong> {{ type.Length }}
                  </p>
                  <p>
                    <strong>{{ $t("seats") }}:</strong> {{ type.Seats }}
                  </p>
                  <p>
                    <strong>{{ $t("features") }}:</strong>
                  </p>
                  <ul class="feature-list">
                    <li
                      v-for="feature in type.Features.split(', ')"
                      :key="feature"
                    >
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </v-card-subtitle>
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
            <v-img :src="selectedVehicleImage" max-height="300px"></v-img>
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
                v-model="selectedType.Name"
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
                item-text="Name"
                item-value="mainGroup => mainGroup"
                @change="onMainGroupChange"
              ></v-select>
            </v-col>
          </v-row>
          <!-- Bus Image -->
          <v-row class="">
            <v-img
              v-if="
                selectedType?.Name === '12C-2T' &&
                selectedMainGroup?.Name === 'Camera'
              "
              width="500"
              :src="img12C"
            ></v-img>
            <v-img
              v-else-if="
                selectedType?.Name === '18C-3T' &&
                selectedMainGroup?.Name === 'Camera'
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
                selectedType?.Name === '19C-4T' &&
                selectedMainGroup?.Name === 'Camera'
              "
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
                >
                  <path
                    d="M19 14.5L40.75 1.94263V27.0574L19 14.5Z"
                    fill="#6887F5"
                  />
                  <rect width="29" height="29" rx="3" fill="#6887F5" />
                </svg> </g
            ></v-img>

            <!-- rare -->
            <v-img
              v-else-if="
                selectedMainGroup?.Name === '528M (Rear Target Display)'
              "
              :src="RareImage"
              contain
              max-height="700"
              max-width="700"
              alt="528M image"
            ></v-img>

            <!-- Bestuhlung -->
            <v-img
              v-else-if="selectedMainGroup?.Name === 'Bestuhlung'"
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
                  v-if="selectedGattung?.Name === '78RI - Sitzhaltegriffe'"
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
                  v-else-if="selectedGattung?.Name === '78RD - Sitzarmlehnen'"
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
                  v-else-if="selectedGattung?.Name === '704A - Bestuhlung'"
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
                    selectedGattung?.Name === '770A - Fahrgastsitz-Rückseite'
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

                    <v-row justify="center">
                      <v-col cols="12">
                        <v-img
                          :src="detailImages.point4_2"
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
          </v-row>
        </v-col>

        <!-- Gattung Dropdown -->
        <v-col>
          <v-select
            :item-props="itemProps"
            v-model="selectedGattung"
            :items="filteredGattungs"
            :label="$t('gattung')"
            :disabled="!selectedMainGroup || !filteredGattungs.length"
            dense
            solo
            outlined
            hide-details
            item-text="Name"
            item-value="gattung => gattung"
            @change="onGattungChange"
          ></v-select>

          <!-- Selection -->
          <v-col v-if="availableSubProducts.length">
            <v-card
              v-for="subProduct in availableSubProducts"
              :key="subProduct.Name"
            >
              <v-card-title>{{ subProduct.Name }}</v-card-title>
              <v-card-text>
                <!-- Normal select dropdown -->
                <v-select
                  v-if="
                    subProduct.GattungID === 4 &&
                    subProduct.Name !== 'STER 8 MS'
                  "
                  :items="subProduct.Options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[subProduct.Name]"
                  :label="$t('choose')"
                  :disabled="isDisabled(subProduct.Name)"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="onOptionChange(subProduct.Name, $event)"
                ></v-select>
                <!-- Text input for STER 8 MS -->
                <v-select
                  v-else-if="
                    subProduct.GattungID === 4 &&
                    subProduct.Name === 'STER 8 MS'
                  "
                  :items="subProduct.Options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[subProduct.Name]"
                  :label="$t('choose')"
                  :disabled="isDisabled(subProduct.Name)"
                  dense
                  solo
                  outlined
                  hide-details
                  @change="onOptionChange(subProduct.Name, $event)"
                ></v-select>
                <!-- Text input for 65A6 - Farbe der Haltestangen und Trennwände -->
                <div v-else-if="subProduct.GattungID === 8">
                  <v-text-field
                    v-model="selectedModel[subProduct.Name]"
                    :label="subProduct.InputPlaceholder"
                    dense
                    solo
                    outlined
                    hide-details="auto"
                    @input="formatRALCode(subProduct.Name)"
                    @click="showRALPrefix(subProduct.Name)"
                  ></v-text-field>
                </div>
                <!-- Other sub-products -->
                <v-select
                  v-else
                  :items="subProduct.Options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[subProduct.Name]"
                  :label="$t('choose')"
                  dense
                  solo
                  outlined
                  hide-details
                ></v-select>
                <!-- Color square -->
                <div
                  class="color-square"
                  v-if="shouldShowColorSquare(subProduct.Name)"
                  :style="{
                    backgroundColor: getRalColor(
                      selectedModel[subProduct.Name]
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
        <v-col class="custom-row">
          <v-btn class="custom-export" @click="xport" color="primary">
            Export
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="custom-back" color="primary" @click="resetSelection">
            Zurück
          </v-btn>
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
                  <v-list-item-content class="list-item-content">
                    Bus Type: {{ selectedType?.Name }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="selectedMainGroup">
                  <v-list-item-content class="list-item-content">
                    Main Group: {{ selectedMainGroup }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="selectedGattung">
                  <v-list-item-content class="list-item-content">
                    Gattung: {{ selectedGattung }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="(value, key) in selectedModel" :key="key">
                  <v-list-item-content class="list-item-content">
                    {{ key }}: {{ value }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="red" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  mounted() {
    // Perform actions when the component is fully mounted in the DOM, e.g., fetch data from an API
    console.log("Component mounted!");
    this.fetchTypes();
    this.fetchMainGroups();
    this.fetchGattungs();
    this.fetchProducts();
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

    availableSubProducts() {
      if (!this.selectedMainGroup) {
        return [];
      }

      // Main Group'a ait productları al
      const currentGroupProducts = this.products.filter(
        (product) => product.MainGroupID === this.selectedMainGroup.MainGroupID
      );

      // Eğer Gattung seçilmemişse ve currentGroupProducts içinde GattungID null olanlar varsa onları döndür
      if (!this.selectedGattung) {
        return currentGroupProducts.filter(
          (product) => product.GattungID === null
        );
      }

      // Eğer Gattung seçilmişse, seçilen GattungID'ye ait productları döndür
      return currentGroupProducts.filter(
        (product) => product.GattungID === this.selectedGattung.GattungID
      );
    },
    filteredGattungs() {
      if (!this.selectedMainGroup) {
        return [];
      }

      return this.gattungs.filter(
        (gattung) => gattung.MainGroupID === this.selectedMainGroup.MainGroupID
      );
    },

    selectedVehicleImage() {
      switch (this.selectedVehicle?.Name) {
        case "12C-2T":
          return "../src/static/12C-2T.jpg";
        case "18C-3T":
          return "../src/static/18C-3T.jpg";
        case "19C-4T":
          return "../src/static/19C-4T.jpg";
        default:
          return "";
      }
    },

    filteredSubProducts() {
      const subProducts = this.products.find(
        (product) => product.mainGroup === this.selectedMainGroup
      )?.subProducts;
      return (
        subProducts?.filter(
          (subProduct) => this.selectedModel[subProduct.name]
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
      const query = this.searchQuery.toLowerCase();
      return this.types.filter(
        (type) =>
          type.Name.toLowerCase().includes(query) ||
          type.Fuel.toLowerCase().includes(query) ||
          type.Length.toLowerCase().includes(query) ||
          type.Seats.toLowerCase().includes(query) ||
          type.Features.toLowerCase().includes(query)
      );
    },
  },

  data() {
    return {
      selectedType: null,
      selectedMainGroup: null,
      selectedGattung: null,
      selectedModel: {},
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
      },
      dialogVisible: {
        point1: false,
        point2: false,
        point3: false,
        point4: false,
        point5: false,
        point6: false,
      },
      detailImages: {
        point1: "../src/assets/Bestuhlung/topcloser.bmp", // Buraya detaylı resimlerin yollarını yazın
        point1_1: "../src/assets/Bestuhlung/topcloser detail.bmp",
        point2: "../src/assets/Bestuhlung/Rück.bmp",
        point3: "../src/assets/Bestuhlung/sitz.bmp",
        point4: "../src/assets/Bestuhlung/bugel or armlehne color.bmp",
        point4_1: "../src/assets/Bestuhlung/armlehne color.bmp",
        point4_2: "../src/assets/Bestuhlung/armlehne or bugel color.bmp",
        point5: "../src/assets/Bestuhlung/rückseite.bmp",
        point6: "../src/assets/Bestuhlung/back.bmp",
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
      chairImage: "../src/assets/Bestuhlung/normal.bmp", // Ön yüz görüntüsü
      chairBackImage: "../src/assets/Bestuhlung/normal back.bmp", // Arka yüz görüntüsü

      vehicleDialog: false,
      selectedVehicle: null,

      RareImage: "../src/assets/RareDisplay/image004.png",
      img12C: "../src/static/12C-2T.jpg",
      img18C: "../src/static/18C-3T.jpg",
      img19C: "../src/static/19C-4T.jpg",

      searchQuery: "",
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
        title: item?.Name,
        value: item,
        // MainGroupID: item?.MainGroupID, // MainGroupID'yi ekledik
      };
    },
    itemPropsGattung(item) {
      return {
        title: item?.Name,
        value: item,
        MainGroupID: item?.MainGroupID,
        GattungID: item?.GattungID,
      };
    },

    showExportDialog() {
      this.dialog = true;
    },

    xport() {
      this.dialog = true;
    },

    onMainGroupChange() {
      console.log("Main Group Changed:", this.selectedMainGroup);
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
      const found = this.products.filter(
        (product) => product.MainGroupID === mainGroup.MainGroupID
      );
      return found.length ? found : [];
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
      console.log("Gattung Changed:", this.selectedGattung);
      this.selectedModel = {};
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
        ? "../src/assets/Bestuhlung/normal.bmp"
        : "../src/assets/Bestuhlung/normal back.bmp";
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
      this.selectedType = null;
      this.selectedMainGroup = null;
      this.selectedGattung = null;
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
      };
    },
    //koltuk seçimlerinde sınırlandırma
    isDisabled(productName) {
      if (
        this.selectedGattung &&
        this.selectedGattung.Name === "704A - Bestuhlung"
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
        const response = await fetch("http://localhost:3000/types");
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
        const response = await fetch("http://localhost:3000/maingroups");
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
        const response = await fetch("http://localhost:3000/gattungs");
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
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        console.log("Fetched products data:", data);

        // Options alanını parse et
        data = data.map((product) => {
          if (product.Options) {
            try {
              product.Options = JSON.parse(product.Options.replace(/'/g, '"'));
            } catch (e) {
              console.error("Error parsing options:", e);
              product.Options = [];
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
        this.selectedMainGroup.Name === "Bestuhlung"
      ) {
        if (
          (this.selectedGattung.Name === "78RI - Sitzhaltegriffe" ||
            this.selectedGattung.Name === "78RD - Sitzarmlehnen" ||
            this.selectedGattung.Name === "770A - Fahrgastsitz-Rückseite") &&
          validProducts.includes(productName)
        ) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
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
  height: 200px;
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
</style>
