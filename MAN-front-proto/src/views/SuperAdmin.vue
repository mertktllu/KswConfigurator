<template>
  <div>
    <v-img
      class="justify-center center"
      max-height="500"
      max-width="500"
      src="https://upload.wikimedia.org/wikipedia/commons/5/54/Logo_MAN.png"
    ></v-img>
    <div class="justify-center center">
      <v-card-title class="text-center">Reviews</v-card-title>

      <v-card class="mb-1" color="blue" v-for="request in requests" :key="request.RequestID">
        <v-row>
          <v-col>
            {{ request.UserID }}
          </v-col>
          <v-col>
            {{ request.TableName }}
          </v-col>
          <v-col>
            {{ request.RequestID }}
          </v-col>
          <v-col>
            {{ request.RequestDetails }}
          </v-col>
          <v-col>
            {{ formatRequestStatus(request.RequestStatus) }}
          </v-col>
          <v-col cols="2">
            <v-btn
              size="small"
              v-on:click="sendConfirm(request.RequestID)"
              color="green"
              v-if="request.RequestStatus !== 1"
            >
              <v-icon>mdi-check</v-icon></v-btn
            >
            <v-btn
              size="small"
              v-on:click="sendDeny(request.RequestID, request.RequestStatus)"
              color="red"
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
    };
  },
  methods: {
  async fetchRequests() {
    try {
      const response = await axios.get("http://localhost:3000/datauploadrequests");
      this.requests = response.data;
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  },
  async sendConfirm(requestId) {
    try {
      const response = await axios.post(`http://localhost:3000/approveRequest/${requestId}`);
      if (response.status === 200) {
        alert("Request approved successfully");
        this.fetchRequests();
      } else {
        alert("Failed to approve request");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Error approving request");
    }
  },
  async sendDeny(requestId) {
    try {
      const response = await axios.put(`http://localhost:3000/datauploadrequests/${requestId}`, {
        RequestStatus: 2, // Assuming 2 means declined
      });
      if (response.status === 200) {
        alert("Request denied successfully");
        this.fetchRequests();
      } else {
        alert("Failed to deny request");
      }
    } catch (error) {
      console.error("Error denying request:", error);
      alert("Error denying request");
    }
  },
  formatRequestStatus(status) {
    return status === 1 ? "Approved" : status === 2 ? "Declined" : "Pending";
  },
},

  created() {
    this.fetchRequests();
  },
};
</script>

<style scoped>
.center {
  height: 50%;
  width: 60%;
  margin: auto;
}
</style>
