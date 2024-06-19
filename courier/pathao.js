const axios = require("axios");
const CONFIG = require("./config");
const fs = require("fs");
const { get } = require("http");

let PATHAO_ACCESS_TOKEN = null;
let PATHAO_REFRESH_TOKEN = null;
const baseUrl = CONFIG.PATHAO_BASE_URL;
const headerWithToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${PATHAO_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

async function setTokenFromFile() {
  try {
    const token = fs.readFileSync("./pathao-token.json", "utf8");
    const parsedToken = JSON.parse(token);
    PATHAO_ACCESS_TOKEN = parsedToken.access_token;
    PATHAO_REFRESH_TOKEN = parsedToken.refresh_token;
    headerWithToken.headers.Authorization = `Bearer ${PATHAO_ACCESS_TOKEN}`;
  } catch (error) {
    await getPathaoToken();
  }
}

async function getPathaoToken() {
  try {
    const url = baseUrl + CONFIG.PATHAO_TOKEN_ENDPOINT;
    const response = await axios.post(
      url,
      {
        client_id: CONFIG.PATHAO_CLIENT_ID,
        client_secret: CONFIG.PATHAO_CLIENT_SECRET,
        username: CONFIG.PATHAO_CLIENT_EMAIL,
        password: CONFIG.PATHAO_CLIENT_PASSWORD,
        grant_type: "password",
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    PATHAO_ACCESS_TOKEN = response.data.access_token;
    PATHAO_REFRESH_TOKEN = response.data.refresh_token;
    headerWithToken.headers.Authorization = `Bearer ${PATHAO_ACCESS_TOKEN}`;
    fs.writeFileSync(
      "./pathao-token.json",
      JSON.stringify({
        access_token: PATHAO_ACCESS_TOKEN,
        refresh_token: PATHAO_REFRESH_TOKEN,
      })
    );
  } catch (error) {
    console.error("Error in getting Pathao token", error.message);
  }
}

async function issueTokenUsingRefreshToken() {
  setTokenFromFile();
  try {
    const url = baseUrl + CONFIG.PATHAO_TOKEN_ENDPOINT;
    const response = await axios.post(
      url,
      {
        client_id: CONFIG.PATHAO_CLIENT_ID,
        client_secret: CONFIG.PATHAO_CLIENT_SECRET,
        refresh_token: PATHAO_REFRESH_TOKEN,
        grant_type: "refresh_token",
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );

    PATHAO_ACCESS_TOKEN = response.data.access_token;
    PATHAO_REFRESH_TOKEN = response.data.refresh_token;
    headerWithToken.headers.Authorization = `Bearer ${PATHAO_ACCESS_TOKEN}`;
  } catch (error) {
    console.error("Error in issuing token using refresh token", error.message);
  }
}

async function createShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = baseUrl + CONFIG.PATHAO_CREATE_SHIPMENT_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function createBulkShipment(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = baseUrl + CONFIG.PATHAO_CREATE_BULK_SHIPMENT_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      console.error("Error in creating shipment", error.response.data);
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function trackShipment(consignmentId) {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = `${baseUrl}/aladdin/api/v1/orders/${consignmentId}/info`;
      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function calculatePrice(requestBody) {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = baseUrl + CONFIG.PATHAO_PRICE_PLAN_ENDPOINT;
      const response = await axios.post(url, requestBody, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function getStoreList() {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = baseUrl + CONFIG.PATHAO_ALL_STORES_ENDPOINT;
      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
      attempt--;
    }
  }
}

async function getCityList() {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = baseUrl + CONFIG.PATHAO_CITY_LIST_ENDPOINT;
      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function getZoneListOfCertainCity(cityId) {
  let attempt = 2;

  while (attempt > 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = `${baseUrl}/aladdin/api/v1/cities/${cityId}/zone-list`;
      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

async function getAreaListOfCertainZone(zoneId) {
  let attempt = 2;

  while (attempt >= 0) {
    if (!PATHAO_ACCESS_TOKEN) {
      await setTokenFromFile();
    }
    try {
      const url = `${baseUrl}/aladdin/api/v1/zones/${zoneId}/area-list`;
      const response = await axios.get(url, headerWithToken);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === CONFIG.UNAUTHORIZED_MESSAGE
      ) {
        if (attempt === 2) await issueTokenUsingRefreshToken();
        if (attempt === 1) await getPathaoToken();
      } else {
        throw error.response ? error.response.data : error;
      }
    }
    attempt--;
  }
}

module.exports = {
  createShipment,
  trackShipment,
  issueTokenUsingRefreshToken,
  createBulkShipment,
  getStoreList,
  getCityList,
  getAreaListOfCertainZone,
  getZoneListOfCertainCity,
  calculatePrice,
};
