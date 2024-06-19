const axios = require("axios");
const CONFIG = require("./config");

const baseUrl = CONFIG.STEADFAST_BASE_URL;

const headerWithToken = {
  headers: {
    "Content-Type": "application/json",
    "Secret-Key": CONFIG.STEADFAST_API_SECRET,
    "Api-Key": CONFIG.STEADFAST_API_KEY,
  },
};

async function createShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.STEADFAST_CREATE_SHIPMENT_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function createBulkShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.STEADFAST_CREATE_BULK_SHIPMENT_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function trackShipment(urlId, type) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      let url =
        baseUrl + CONFIG.STEADFAST_TRACK_SHIPMENT_BY_CID_ENDPOINT + "/" + urlId;
      if (type === "invoice") {
        url =
          baseUrl +
          CONFIG.STEADFAST_TRACK_SHIPMENT_BY_INVOICE_ENDPOINT +
          "/" +
          urlId;
      } else if (type === "trackingCode") {
        url =
          baseUrl +
          CONFIG.STEADFAST_TRACK_SHIPMENT_BY_TRACKING_CODE_ENDPOINT +
          "/" +
          urlId;
      }

      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}

async function checkBalance() {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.STEADFAST_CHECK_BALANCE_ENDPOINT;
      const response = await axios.get(url, headerWithToken);

      return response.data;
    } catch (error) {
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}

module.exports = {
  createShipment,
  trackShipment,
  createBulkShipment,
  checkBalance,
};
