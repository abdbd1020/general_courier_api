const axios = require("axios");
const CONFIG = require("./config");

const ECOURIER_API_SECRET = CONFIG.ECOURIER_API_SECRET;
const ECOURIER_API_KEY = CONFIG.ECOURIER_API_KEY;
const ECOURIER_USER_ID = CONFIG.ECOURIER_USER_ID;
const baseUrl = CONFIG.ECOURIER_BASE_URL;

const headerWithToken = {
  headers: {
    "Content-Type": "application/json",
    "API-SECRET": ECOURIER_API_SECRET,
    "API-KEY": ECOURIER_API_KEY,
    "USER-ID": ECOURIER_USER_ID,
  },
};
async function createShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_CREATE_SHIPMENT_ENDPOINT;
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
async function getPackageList() {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_PACKAGE_LIST_ENDPOINT;
      const response = await axios.post(url, {}, headerWithToken);
      return response.data;
    } catch (error) {
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function trackShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_TRACK_SHIPMENT_ENDPOINT;
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
async function paymentStatusOfShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_PAYMENT_STATUS_ENDPOINT;
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
async function cancelShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_CANCEL_SHIPMENT_ENDPOINT;
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
async function getCityList() {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_CITY_LIST_ENDPOINT;
      const response = await axios.post(url, {}, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in getting city list", error.response.data);
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function getThanaList(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_THANA_LIST_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in getting thana list", error.response.data);
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function getAreaList(requestBody, isDistrict = false) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      let url = baseUrl + CONFIG.ECOURIER_AREA_LIST_ENDPOINT;
      if (isDistrict) url = baseUrl + CONFIG.ECOURIER_AREA_BY_DISTRICT_ENDPOINT;

      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in getting area list", error.response.data);
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function getPostCodeList(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_POST_CODE_LIST_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in getting post code list", error.response.data);
      if (attempt > 1) attempt--;
      else {
        throw error.response ? error.response.data : error;
      }
    }
  }
}
async function getBranchList() {
  let attempt = 2;

  while (attempt > 0) {
    try {
      const url = baseUrl + CONFIG.ECOURIER_BRANCH_LIST_ENDPOINT;
      const response = await axios.post(url, {}, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in getting branch list", error.response.data);
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
  cancelShipment,
  getPackageList,
  getCityList,
  getThanaList,
  getAreaList,
  getPostCodeList,
  getBranchList,
  paymentStatusOfShipment,
};
