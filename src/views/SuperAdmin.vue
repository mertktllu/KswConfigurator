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
              <v-row v-for="request in requests" :key="request.requestid">
                <v-col>
                  {{ request.requestdetails }}
                </v-col>
                <v-col cols="2">
                  <v-btn
                    size="small"
                    @click="confirmAction(request.requestid, 'approve')"
                    color="green"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn
                    size="small"
                    @click="confirmAction(request.requestid, 'deny')"
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

    <!-- Confirm Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Action</v-card-title>
        <v-card-text>Are you sure you want to proceed?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="executeAction">Yes</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
      dialog: false,
      actionType: '',
      requestId: null,
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await axios.get(
          "https://kswconfigurator-7fc475022be0.herokuapp.com/datauploadrequests"
        );
        this.requests = response.data;
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    },
    confirmAction(requestID, actionType) {
      this.requestId = requestID;
      this.actionType = actionType;
      this.dialog = true;
    },
    async executeAction() {
      this.dialog = false;
      if (this.actionType === 'approve') {
        await this.approveRequest(this.requestId);
      } else if (this.actionType === 'deny') {
        await this.denyRequest(this.requestId);
      }
    },
    async approveRequest(requestID) {
      try {
        const response = await axios.post(
          `https://kswconfigurator-7fc475022be0.herokuapp.com/approveRequest/${requestID}`
        );
        if (response.status === 200) {
          alert("Request approved successfully");
          this.fetchRequests(); // Refresh the list
        } else {
          alert("Failed to approve request");
        }
      } catch (error) {
        console.error("Error approving request:", error);
        alert("Error approving request");
      }
    },
    async denyRequest(requestID) {
      try {
        const response = await axios.post(
          `https://kswconfigurator-7fc475022be0.herokuapp.com/denyRequest/${requestID}`
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
  },
};
</script>

<style scoped>
/* Your custom styles here */
</style>
