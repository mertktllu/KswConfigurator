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
          <v-card-title>
            Main Group
            <v-dialog max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="green"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Add Main Group">
                  <v-card-text>
                    <v-text-field
                      v-model="addMainGroup"
                      :counter="10"
                      :rules="nameRules"
                      label="Name of Main Group"
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
                    <v-btn
                      text="Add"
                      color="green"
                      @click="submitAddMainGroup"
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
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Delete A Main Group">
                  <v-card
                    class="ma-3"
                    v-for="groups in mainGroups"
                    :key="groups.MainGroupID"
                  >
                    {{ groups.Name }}
                    <v-btn
                      size="x-small"
                      icon
                      class="ml-5"
                      color="red"
                      @click="
                        submitDeleteMainGroup(groups.MainGroupID, groups.Name)
                      "
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit A Main Group">
                  <v-select
                    :item-props="itemProps"
                    v-model="selectedMainGroup"
                    :items="mainGroups"
                    label="Select an option"
                  ></v-select>

                  <v-text-field
                    clearable
                    label="New Name"
                    v-model="newGroupName"
                  ></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      text="Save"
                      color="green"
                      @click="submitEditMainGroup"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-title>
          <v-card-text>
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


          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Gattung
            <v-dialog max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="green"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Add Gattung">
                  <v-card-text>
                    <v-text-field
                      v-model="addGattung"
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
                    <v-btn
                      text="Add"
                      color="green"
                      @click="submitAddGattung"
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
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Delete A Gattung">
                  <v-card
                    class="ma-3"
                    v-for="gattung in gattungs"
                    :key="gattung.GattungID"
                  >
                    {{ gattung.Name }}
                    <v-btn
                      size="x-small"
                      icon
                      class="ml-5"
                      color="red"
                      @click="
                        submitDeleteGattung(gattung.GattungID, gattung.Name)
                      "
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
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
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit A Gattung">
                  <v-select
                    :itemProps="itemProps"
                    :items="filteredGattungs"
                    v-model="selectedGattung"
                    item-text="name"
                    label="Select an option"
                    dense
                    solo
                    outlined
                    hide-details
                  ></v-select>

                  <v-text-field
                    clearable
                    label="New Name"
                    v-model="newGattungName"
                  ></v-text-field>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      text="Save"
                      color="green"
                      @click="submitEditGattung"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-title>
          <v-card-text>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Add Product
            <v-dialog v-model="dialogAddOption" max-width="50%">
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  size="small"
                  icon
                  class="ml-5"
                  color="green"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Add Product">
                  <v-card-text>
                    <v-text-field
                      v-model="newProductName"
                      :rules="nameRules"
                      label="Product Name"
                      hide-details
                      required
                    ></v-text-field>
                    <v-textarea
                      v-model="newProductOptions"
                      :rules="nameRules"
                      label="Product Options (comma separated)"
                      hide-details
                      required
                    ></v-textarea>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text="Close"
                      color="red"
                      @click="isActive.value = false"
                    ></v-btn>
                    <v-btn
                      text="Add"
                      color="green"
                      @click="submitAddOption"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-card-title>
          <v-card-text
            v-for="product in availableSubProducts"
            :key="product.Name"
          >
            <v-row>
              <v-col>
                <div>{{ product.Name }}</div>
                <!-- Product Name added here -->
                <v-select
                  :items="product.Options"
                  :item-text="(item) => item"
                  :item-value="(item) => item"
                  v-model="selectedModel[product.name]"
                  :label="$t('choose')"
                  dense
                  solo
                  outlined
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="1">
                <v-btn
                  size="small"
                  icon
                  class="mt-4"
                  color="red"
                  @click="
                    submitDeleteOption(product, selectedModel[product.Name])
                  "
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Option Dialog -->
    <v-dialog v-model="dialogAddOption" max-width="50%">
      <template v-slot:default="{ isActive }">
        <v-card title="Add Option">
          <v-card-text>
            <v-text-field
              v-model="addOptionName"
              :rules="nameRules"
              label="Option Name"
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
            <v-btn text="Add" color="green" @click="submitAddOption"></v-btn>
            <v-btn
              v-for="option in subProduct.options"
              :key="option"
              size="small"
              icon
              class="ml-2"
              color="red"
              @click="submitDeleteOption(subProduct, option)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      addMainGroup: "", // Admin tarafından girilen yeni ana grup adı
      products: [],
      mainGroups: [],
      gattungs: [],
      selectedMainGroup: null,
      selectedGattung: null,
      selectedModel: {},
      newGroupName: "",
      newGattungName: "",
      nameRules: [(v) => !!v || "Name is required"],
      dialogAddOption: false, // Add option dialogu için
      addOptionName: "", // Eklenecek option adı
      selectedOptionProduct: null, // Eklenecek optionun ait olduğu product
      newProductName: "",
      newProductOptions: "",
    };
  },
  mounted() {
    this.fetchMainGroups();
    this.fetchGattungs();
    this.fetchProducts();
  },
  computed: {
    comModels: function () {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].name == this.selectedMainGroup) {
          return this.products[i].subProducts;
        }
      }
      return "nothing";
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
        gattung => gattung.maingroupid === this.selectedMainGroup.maingroupid
      );
    }
  },
  methods: {
    openAddOptionDialog(product) {
      if (product && product.Options) {
        this.selectedOptionProduct = product;
      } else {
        this.selectedOptionProduct = { Options: [] };
      }
      this.addOptionName = "";
      this.dialogAddOption = true;
    },

    async submitDeleteOption(product, option) {
      try {
        const productID = product.ProductID;
        const gattungID = this.selectedGattung
          ? this.selectedGattung.GattungID
          : null;

        const response = await axios.post(
          "http://localhost:3000/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "Products",
            RequestDetails: `Action: Delete Option, ProductID: ${productID}, GattungID: ${gattungID}, Option: ${option}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: "Delete Option",
          }
        );

        if (response.status === 201) {
          alert("Request sent successfully");
          this.fetchProducts();
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to delete option:", error);
        alert("Error sending request to delete option");
      }
    },
    async fetchMainGroups() {
    try {
      const response = await axios.get("https://kswconfigurator-7fc475022be0.herokuapp.com/maingroups");
      this.mainGroups = response.data.map(group => {
        return {
          ...group,
          name: group.name ? group.name.trim() : group.name
        };
      });
      console.log("Maingroup",this.mainGroups);
    } catch (error) {
      console.error("Ana grupları alırken hata oluştu:", error);
    }
  },
    async fetchGattungs() {
      try {
        const response = await axios.get("https://kswconfigurator-7fc475022be0.herokuapp.com/gattungs");
        this.gattungs = response.data;
        console.log(this.gattungs);
      } catch (error) {
        console.error("Error fetching gattungs:", error);
      }
    },
    async fetchProducts() {
      try {
        console.log("Fetching products...");
        const response = await fetch("https://kswconfigurator-7fc475022be0.herokuapp.com/products");
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

    async submitAddOption() {
      try {
        const options = this.newProductOptions
          .split(",")
          .map((option) => option.trim());
        const mainGroupID = this.selectedMainGroup
          ? this.selectedMainGroup.MainGroupID
          : null;
        const gattungID = this.selectedGattung
          ? this.selectedGattung.GattungID
          : null;

        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "Products",
            RequestDetails: JSON.stringify({
              Name: this.newProductName,
              Options: options,
              MainGroupID: mainGroupID,
              GattungID: gattungID,
              InputType: null,
              InputPlaceholder: null,
            }),
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: "Add Product",
          }
        );

        if (response.status === 201) {
          alert("Request sent successfully");
          this.newProductName = "";
          this.newProductOptions = "";
          this.fetchProducts(); // Refresh the product list
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to add product:", error);
        alert("Error sending request to add product");
      }
    },
    confirmAction(requestID, actionType) {
      this.requestId = requestID;
      this.actionType = actionType;
      this.dialog = true;
    },
    async executeAction() {
      this.dialog = false;
      if (this.actionType === "approve") {
        await this.approveRequest(this.requestId);
      } else if (this.actionType === "deny") {
        await this.denyRequest(this.requestId);
      } else if (this.actionType === "addOption") {
        await this.submitAddOption();
      }
    },

    confirmAction(requestID, actionType) {
      this.requestId = requestID;
      this.actionType = actionType;
      this.dialog = true;
    },
    async executeAction() {
      this.dialog = false;
      if (this.actionType === "approve") {
        await this.approveRequest(this.requestId);
      } else if (this.actionType === "deny") {
        await this.denyRequest(this.requestId);
      } else if (this.actionType === "addOption") {
        await this.submitAddOption();
      }
    },

    async submitAddMainGroup() {
      try {
        const details = this.addMainGroup;
        const mainGroupName = this.addMainGroup; // Admin tarafından girilen yeni ana grup adı
        const actionType = "Add MainGroup"; // İşlem tipi
        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "MainGroups",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType, // İşlem tipi
          }
        );
        if (response.status === 201) {
          alert("Request sent successfully");
          this.addMainGroup = "";
          this.dialogMainGroup = false;
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to add main group:", error);
        alert("Error sending request to add main group");
      }
    },
    async submitDeleteMainGroup(id, name) {
      try {
        const details = `MainGroupID: ${id}, Name: ${name}`; // Silinen ana grup bilgisi
        const actionType = "Delete MainGroup"; // İşlem tipi
        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "MainGroups",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType, // İşlem tipi
          }
        );
        if (response.status === 201) {
          alert("Request sent successfully");
          this.fetchMainGroups(); // Ana grup listesini güncelle
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to delete main group:", error);
        alert("Error sending request to delete main group");
      }
    },
    async submitEditMainGroup() {
      try {
        const details = `MainGroupID: ${this.selectedMainGroup.MainGroupID}, New Name: ${this.newGroupName}`; // Düzenlenen ana grup bilgisi
        const actionType = "Edit MainGroup"; // İşlem tipi
        console.log(`RequestDetails: ${details}`); // Eklenen log
        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "MainGroups",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType, // İşlem tipi
          }
        );
        if (response.status === 201) {
          alert("Request sent successfully");
          this.newGroupName = "";
          this.selectedMainGroup = null;
          this.dialogEditMainGroup = false;
          this.fetchMainGroups(); // Ana grup listesini güncelle
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to edit main group:", error);
        alert("Error sending request to edit main group");
      }
    },

    async submitAddGattung() {
      try {
        const details = `${this.addGattung}, MainGroupID: ${this.selectedMainGroup.MainGroupID}`; // Gattung adı ve MainGroupID details olarak kullanılıyor
        const actionType = "Add Gattung"; // İşlem türü
        console.log(`RequestDetails: ${details}`); // Eklenen log

        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "Gattungs",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType,
          }
        );

        if (response.status === 201) {
          alert("Request sent successfully");
          this.addGattung = ""; // Formu temizle
          this.fetchGattungs(); // Gattungs listesini güncelle
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to add gattung:", error);
        alert("Gattung ekleme isteği gönderilirken hata oluştu");
      }
    },

    async submitDeleteGattung(id, name) {
      try {
        const details = `GattungID: ${id}, Name: ${name}`; // Silinen gattung bilgisi
        const actionType = "Delete Gattung"; // İşlem tipi
        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "Gattungs",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType, // İşlem tipi
          }
        );
        if (response.status === 201) {
          alert("Request sent successfully");
          this.fetchGattungs(); // Gattung listesini güncelle
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to delete gattung:", error);
        alert("Error sending request to delete gattung");
      }
    },
    async submitEditGattung() {
      try {
        const details = `GattungID: ${this.selectedGattung.GattungID}, New Name: ${this.newGattungName}, MainGroupID: ${this.selectedMainGroup.MainGroupID}`; // Düzenlenen gattung bilgisi
        const actionType = "Edit Gattung"; // İşlem tipi
        console.log(`RequestDetails: ${details}`); // Eklenen log
        const response = await axios.post(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests",
          {
            UserID: 1, // Admin ID
            TableName: "Gattungs",
            RequestDetails: `Action: ${actionType}, Details: ${details}`,
            RequestStatus: false,
            RequestDate: new Date(),
            ActionType: actionType, // İşlem tipi
          }
        );
        if (response.status === 201) {
          alert("Request sent successfully");
          this.newGattungName = "";
          this.selectedGattung = null;
          this.dialogEditGattung = false;
          this.fetchGattungs(); // Gattung listesini güncelle
        } else {
          alert("Failed to send request");
        }
      } catch (error) {
        console.error("Error sending request to edit gattung:", error);
        alert("Error sending request to edit gattung");
      }
    },

    rotateCamera(cameraId) {
      this.cameraRotations[cameraId] += 45; // Her tıklamada 45 derece döndür
      console.log(this.rotation);
    },

    itemProps(item) {
      return {
        title: item?.name,
        value: item,
      };
    },

    onMainGroupChange() {
      this.selectedGattung = null;
      // Eğer filteredGattungs computed property'si reaktif değilse, bu metodda manuel olarak tetikleyebilirsiniz.
      //this.filteredGattungs; // Bu satır computed property'yi manuel olarak tetiklemek için kullanılabilir.
    },
  },
};
</script>

<style scoped>
.custom-part {
  background-color: rgb(204, 204, 204);
}
</style>
