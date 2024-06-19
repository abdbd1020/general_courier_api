const pathao = require("./pathao");
const ecourier = require("./ecourier");
const steadfast = require("./steadfast");
const CONFIG = require("./config");
const utility = require("./utility");

async function createShipment(provider, shipmentDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        const requestBody =
          utility.createPathaoShipmentRequestBody(shipmentDetails);
        return utility.createPathaoShipmentSuccessResponseBody(
          await pathao.createShipment(requestBody)
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }

    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody =
          utility.createEcourierShipmentRequestBody(shipmentDetails);
        return utility.createEcourierShipmentSuccessResponseBody(
          await ecourier.createShipment(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }

    case CONFIG.STEADFAST_TYPE:
      try {
        const requestBody =
          utility.createSteadfastShipmentRequestBody(shipmentDetails);
        return await steadfast.createShipment(requestBody);
      } catch (error) {
        throw error;
      }
    default:
      throw new Error("Unsupported provider");
  }
}
async function createBulkShipment(provider, bulkDhipmentDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        const requestBody =
          utility.createPathaoShipmentRequestBodyFromBulk(bulkDhipmentDetails);
        return utility.createPathaoBulkShipmentSuccessResponseBody(
          await pathao.createBulkShipment(requestBody)
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      return null;
    case CONFIG.STEADFAST_TYPE:
      try {
        const requestBody =
          utility.createSteadfastShipmentRequestBodyFromBulk(
            bulkDhipmentDetails
          );
        return await steadfast.createBulkShipment(requestBody);
      } catch (error) {
        throw error;
      }
    default:
      throw new Error("Unsupported provider");
  }
}
async function trackShipment(provider, trackingDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        const requestId =
          utility.createPathaoShipmentTrackRequestBody(trackingDetails);
        return utility.createPathaoTrackShipmentSuccessResponseBody(
          await pathao.trackShipment(requestId)
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody =
          utility.createEcourierShipmentTrackRequestBody(trackingDetails);
        return utility.createEcourierTrackShipmentSuccessResponseBody(
          await ecourier.trackShipment(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }

    case CONFIG.STEADFAST_TYPE:
      if (trackingDetails.tracking_id) {
        return await steadfast.trackShipment(
          trackingDetails.tracking_id,
          "trackingCode"
        );
      } else if (trackingDetails.invoice) {
        return await steadfast.trackShipment(
          trackingDetails.invoice,
          "invoice"
        );
      } else if (trackingDetails.cid) {
        return await steadfast.trackShipment(trackingDetails.cid, "cid");
      } else {
        throw new Error("Invalid tracking details");
      }
    default:
      throw new Error("Unsupported provider");
  }
}
async function payemntStatus(provider, shipmentDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody = { tracking: shipmentDetails.tracking_id };
        return utility.createEcourierPaymentStatusSuccessResponseBody(
          await ecourier.paymentStatusOfShipment(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function cancelShipment(provider, cancelDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody =
          utility.createEcourierCancelShipmentRequestBody(cancelDetails);
        return utility.createEcourierCAncelShipmentSuccessResponseBody(
          await ecourier.cancelShipment(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function calculatePrice(provider, shipmentDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        const requestBody =
          utility.createPathaoCalculatePriceRequestBody(shipmentDetails);
        return await pathao.calculatePrice(requestBody);
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      return await ecourier.calculatePrice(shipmentDetails);
    case CONFIG.STEADFAST_TYPE:
      return await steadfast.calculatePrice(shipmentDetails);
    default:
      throw new Error("Unsupported provider");
  }
}
async function getStoreList(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        return utility.createPathaoGetStoreListSuccessResponseBody(
          await pathao.getStoreList()
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      return await ecourier.getStores();
    case CONFIG.STEADFAST_TYPE:
      return await steadfast.getStores();
    default:
      throw new Error("Unsupported provider");
  }
}
async function getPackageList(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        return utility.createEcourierGetPackageListSuccessResponseBody(
          await ecourier.getPackageList()
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getCityList(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        return utility.createPathaoGetCityListSuccessResponseBody(
          await pathao.getCityList()
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      try {
        return utility.createEcourierGetCityListSuccessResponseBody(
          await ecourier.getCityList()
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getThanaList(provider, cityDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody = { city: cityDetails.city_name };
        return utility.createEcourierGetThanaListSuccessResponseBody(
          await ecourier.getThanaList(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getBranchList(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        return utility.createEcourierGetBranchListSuccessResponseBody(
          await ecourier.getBranchList()
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getPostCodeList(provider, postCodeDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      try {
        const requestBody = {
          city: postCodeDetails.city_name,
          thana: postCodeDetails.thana_name,
        };
        return utility.createEcourierGetPostCodeListSuccessResponseBody(
          await ecourier.getPostCodeList(requestBody)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getZoneListOfCertainCity(provider, cityId) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        return utility.createPathaoGetZoneListSuccessResponseBody(
          await pathao.getZoneListOfCertainCity(cityId)
        );
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      return null;
    case CONFIG.STEADFAST_TYPE:
      return null;
    default:
      throw new Error("Unsupported provider");
  }
}
async function getAreaList(provider, areaDetails) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      try {
        return utility.createPathaoGetAreaListSuccessResponseBody(
          await pathao.getAreaListOfCertainZone(areaDetails.zoneId)
        );
      } catch (error) {
        throw utility.createPathaoErrorResponseBody(error);
      }
    case CONFIG.ECOURIER_TYPE:
      try {
        if (areaDetails.district) {
          const requestBody = { district: areaDetails.district };
          return utility.createEcourierGetAreaListByDistrictSuccessResponseBody(
            await ecourier.getAreaList(requestBody, true)
          );
        } else {
          const requestBody = { postcode: areaDetails.postcode };
          return utility.createEcourierGetAreaListSuccessResponseBody(
            await ecourier.getAreaList(requestBody, false)
          );
        }
      } catch (error) {
        throw utility.createEcourierErrorResponseBody(error);
      }

    case CONFIG.STEADFAST_TYPE:
      return await steadfast.getAreaListOfCertainZone(zoneId);
    default:
      throw new Error("Unsupported provider");
  }
}
async function getRefreshToken(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return await pathao.issueTokenUsingRefreshToken();
    default:
      throw new Error("Unsupported provider");
  }
}
async function checkBalance(provider) {
  switch (provider) {
    case CONFIG.PATHAO_TYPE:
      return null;
    case CONFIG.ECOURIER_TYPE:
      return null;
    case CONFIG.STEADFAST_TYPE:
      try {
        return await steadfast.checkBalance();
      } catch (error) {
        throw error;
      }
    default:
      throw new Error("Unsupported provider");
  }
}

module.exports = {
  createShipment,
  trackShipment,
  cancelShipment,
  getRefreshToken,
  createBulkShipment,
  getStoreList,
  getCityList,
  getZoneListOfCertainCity,
  getAreaList,
  calculatePrice,
  getPackageList,
  cancelShipment,
  getThanaList,
  getBranchList,
  getPostCodeList,
  payemntStatus,
  checkBalance,
};
