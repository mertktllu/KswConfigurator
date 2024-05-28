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
          <v-card-title class="text-center">Reviews</v-card-title>
          <v-card-text>
            <v-list>
              <v-row v-for="request in requests" :key="request.RequestID">
                <v-col>
                  {{ request.RequestDetails }}
                </v-col>
                <v-col cols="2">
                  <v-btn
                    size="small"
                    @click="approveRequest(request.RequestID)"
                    color="green"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn
                    size="small"
                    @click="denyRequest(request.RequestID)"
                    color="red"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await axios.get(
          "http://localhost:3000/datauploadrequests"
        );
        this.requests = response.data;
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    },
    async approveRequest(requestID) {
  try {
    const response = await axios.post(
      `http://localhost:3000/approveRequest/${requestID}`,
      {
        userId: localStorage.getItem("userId"),
      }
    );
    if (response.status === 200) {
      alert("Request approved successfully");
      this.fetchRequests(); // Refresh the list
    } else {
      alert("Failed to approve request");
    }
  } catch (error) {
    console.error("Error approving request:", error); // Hatalı satır düzeltildi
    alert("Error approving request");
  }
},

    async denyRequest(requestID) {
      try {
        const response = await axios.post(
          `http://localhost:3000/denyRequest/${requestID}`,
          {
            userId: localStorage.getItem("userId"),
          }
        );
        if (response.status === 200) {
          alert("Request denied and removed successfully");
          this.fetchRequests(); // Refresh the list
        } else {
          alert("Failed to deny request");
        }
      } catch (error) {
        console.error("Error denying request:", error);
        alert("Error denying request");
      }
    },
    async deleteRequest(requestID) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/datauploadrequests/${requestID}`
        );
        if (response.status === 200) {
          alert("Request deleted successfully");
          this.fetchRequests(); // Listeyi güncelle
        } else {
          alert("Failed to delete request");
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        alert("Error deleting request");
      }
    },
  },
};
</script>

<style scoped>
/* Your custom styles here */
</style>
