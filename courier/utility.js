function createPathaoShipmentRequestBody(shipmentDetails) {
  const requestBody = {
    store_id: shipmentDetails.store_id,
    recipient_name: shipmentDetails.recipient_name,
    recipient_phone: shipmentDetails.recipient_phone,
    recipient_address: shipmentDetails.recipient_address,
    recipient_city: shipmentDetails.recipient_city,
    recipient_zone: shipmentDetails.recipient_zone,
    delivery_type: shipmentDetails.delivery_type,
    item_type: shipmentDetails.item_type,
    item_quantity: shipmentDetails.item_quantity,
    item_weight: shipmentDetails.item_weight,
    amount_to_collect: shipmentDetails.amount_to_collect,
  };

  if (shipmentDetails.merchant_order_id) {
    requestBody.merchant_order_id = shipmentDetails.merchant_order_id;
  }
  if (shipmentDetails.recipient_area) {
    requestBody.recipient_area = shipmentDetails.recipient_area;
  }
  if (shipmentDetails.special_instruction) {
    requestBody.special_instruction = shipmentDetails.special_instruction;
  }
  if (shipmentDetails.item_description) {
    requestBody.item_description = shipmentDetails.item_description;
  }
  return requestBody;
}
function createEcourierShipmentRequestBody(shipmentDetails) {
  const requestBody = {
    recipient_name: shipmentDetails.recipient_name,
    recipient_mobile: shipmentDetails.recipient_phone,
    recipient_city: shipmentDetails.recipient_city,
    recipient_area: shipmentDetails.recipient_area,
    recipient_address: shipmentDetails.recipient_address,
    package_code: shipmentDetails.consignment_id,
    product_price: shipmentDetails.amount_to_collect,
    recipient_thana: shipmentDetails.recipient_thana,
    payment_method: shipmentDetails.payment_method,
    recipient_zip: shipmentDetails.recipient_zip,
  };

  if (shipmentDetails.item_quantity) {
    requestBody.number_of_item = shipmentDetails.item_quantity;
  }
  if (shipmentDetails.special_instruction) {
    requestBody.comments = shipmentDetails.special_instruction;
  }
  if (shipmentDetails.product_id) {
    requestBody.product_id = shipmentDetails.product_id;
  }
  if (shipmentDetails.parcel_type) {
    requestBody.parcel_type = shipmentDetails.item_type;
  }
  if (shipmentDetails.requested_delivery_time) {
    requestBody.requested_delivery_time =
      shipmentDetails.requested_delivery_time;
  }
  if (shipmentDetails.pick_hub) {
    requestBody.pick_hub = shipmentDetails.pick_hub;
  }
  if (shipmentDetails.pick_address) {
    requestBody.pick_address = shipmentDetails.pick_address;
  }
  if (shipmentDetails.actual_product_price) {
    requestBody.actual_product_price = shipmentDetails.actual_product_price;
  }
  return requestBody;
}
function createSteadfastShipmentRequestBody(shipmentDetails) {
  const requestBody = {
    invoice: shipmentDetails.merchant_order_id,
    recipient_name: shipmentDetails.recipient_name,
    recipient_phone: shipmentDetails.recipient_phone,
    recipient_address: shipmentDetails.recipient_address,
    cod_amount: shipmentDetails.amount_to_collect,
    note: shipmentDetails.special_instruction,
  };
  return requestBody;
}
function createPathaoShipmentRequestBodyFromBulk(bulkDhipmentDetails) {
  let bulkShipment = [];
  bulkDhipmentDetails.forEach((shipmentDetails) => {
    bulkShipment.push(createPathaoShipmentRequestBody(shipmentDetails));
  });
  return bulkShipment;
}
function createSteadfastShipmentRequestBodyFromBulk(bulkDhipmentDetails) {
  let bulkShipment = [];
  bulkDhipmentDetails.forEach((shipmentDetails) => {
    bulkShipment.push(createSteadfastShipmentRequestBody(shipmentDetails));
  });
  return bulkShipment;
}
function createPathaoCalculatePriceRequestBody(shipmentDetails) {
  const requestBody = {
    store_id: shipmentDetails.store_id,
    item_type: shipmentDetails.item_type,
    delivery_type: shipmentDetails.delivery_type,
    item_weight: shipmentDetails.item_weight,
    recipient_city: shipmentDetails.recipient_city,
    recipient_zone: shipmentDetails.recipient_zone,
  };

  return requestBody;
}
function createPathaoShipmentTrackRequestBody(trackingDetails) {
  return trackingDetails.tracking_id;
}
function createEcourierShipmentTrackRequestBody(trackingDetails) {
  const requestBody = {};
  if (trackingDetails.product_id) {
    requestBody.product_id = trackingDetails.product_id;
  }
  if (trackingDetails.consignment_id) {
    requestBody.ecr = trackingDetails.consignment_id;
  }
  return requestBody;
}
function createEcourierCancelShipmentRequestBody(cancelDetails) {
  const requestBody = {
    tracking: cancelDetails.tracking_id,
    comment: cancelDetails.comment,
  };
  return requestBody;
}
function createPathaoShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: {
      consignment_id: response.data.consignment_id,
      merchant_order_id: response.data.merchant_order_id,
      order_status: response.data.order_status,
      delivery_fee: response.data.delivery_fee,
    },
  };
  return successResponseBody;
}
function createEcourierShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.response_code,
    type: response.success === true ? "success" : "error",
    message: response.message,
    data: {
      consignment_id: response.ID,
    },
  };
  return successResponseBody;
}
function createSteadfastShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.status,
    type: response.status === 200 ? "success" : "error",
    message: response.message,
    data:
      response.status === 200
        ? {
            consignment_id: response.consignment.consignment_id,
            merchant_order_id: response.consignment.invoice,
            tracking_id: response.consignment.tracking_code,
            recipient_name: response.consignment.recipient_name,
            recipient_phone: response.consignment.recipient_phone,
            recipient_address: response.consignment.recipient_address,
            amount_to_collect: response.consignment.cod_amount,
            order_status: response.consignment.status,
            special_instruction: response.consignment.note,
            created_at: response.consignment.created_at,
            updated_at: response.consignment.updated_at,
          }
        : null,
    errors: response.status !== 200 ? response.errors : null,
  };
  return successResponseBody;
}
function createSteadfastBulkShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.status,
    type: response.status === 200 ? "success" : "error",
    message: response.message,
    data:
      response.status === 200
        ? response.data.map((shipment) => {
            return {
              consignment_id: shipment.consignment_id,
              merchant_order_id: shipment.invoice,
              tracking_id: shipment.tracking_code,
              recipient_name: shipment.recipient_name,
              recipient_phone: shipment.recipient_phone,
              recipient_address: shipment.recipient_address,
              amount_to_collect: shipment.cod_amount,
              order_status: shipment.status,
              special_instruction: shipment.note,
            };
          })
        : null,
  };

  return successResponseBody;
}

function createPathaoBulkShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: response.data,
  };
  return successResponseBody;
}
function createPathaoTrackShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: {
      consignment_id: response.data.consignment_id,
      merchant_order_id: response.data.merchant_order_id,
      order_status: response.data.order_status,
      order_status_slug: response.data.order_status_slug,
      updated_at: response.data.updated_at,
      invoice_id: response.data.invoice_id,
    },
  };
  return successResponseBody;
}
function createEcourierTrackShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.response_code,
    message: response.message
      ? response.message
      : response.query_data.status[0].comment,
    data: {
      order_status: response.query_data.status[0].status,
      consignment_id: response.query_data.REFID,
      product_id: response.query_data.product_id,
      r_address: response.query_data.r_address,
      r_area: response.query_data.r_area,
      r_time: response.query_data.r_time,
      agent: response.query_data.agent,
      r_timing: response.query_data.r_timing,
      r_weight: response.query_data.r_weight,
    },
  };
  return successResponseBody;
}

function createSteadfastTrackShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.status,
    type: response.status === 200 ? "success" : "error",
    message: response.delivery_status,
    data: {
      order_status: response.delivery_status,
    },
  };
  return successResponseBody;
}
function createEcourierCAncelShipmentSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: response.success === true ? "success" : "error",
    message: response.message,
  };
  return successResponseBody;
}
function createPathaoGetCityListSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: response.data.data.map((city) => {
      return {
        city_name: city.city_name,
        city_id: city.city_id,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetCityListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "City list fetched successfully",
    data: response.map((city) => {
      return {
        city_name: city.name,
        city_id: city.value,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetPackageListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Package list fetched successfully",
    data: response,
  };
  return successResponseBody;
}
function createEcourierGetThanaListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Thana list fetched successfully",
    data: response.message.map((thana) => {
      return {
        thana_name: thana.name,
        thana_id: thana.value,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetPostCodeListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Post code list fetched successfully",
    data: response.message.map((postcode) => {
      return {
        postcode_name: postcode.name,
        postcode_id: postcode.value,
      };
    }),
  };
  return successResponseBody;
}
function createPathaoGetZoneListSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: response.data.data.map((city) => {
      return {
        zone_name: city.zone_name,
        zone_id: city.zone_id,
      };
    }),
  };
  return successResponseBody;
}
function createPathaoGetAreaListSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: response.data.data.map((area) => {
      return {
        area_name: area.area_name,
        area_id: area.area_id,
        home_delivery_available: area.home_delivery_available,
        pickup_available: area.pickup_available,
      };
    }),
  };
  return successResponseBody;
}
function createPathaoGetStoreListSuccessResponseBody(response) {
  const successResponseBody = {
    code: response.code,
    type: response.type,
    message: response.message,
    data: response.data.data.map((store) => {
      return {
        store_id: store.store_id,
        store_name: store.store_name,
        store_address: store.store_address,
        is_active: store.is_active,
        city_id: store.city_id,
        zone_id: store.zone_id,
        hub_id: store.hub_id,
        is_default_store: store.is_default_store,
        is_default_return_store: store.is_default_return_store,
      };
    }),
    total: response.data.total,
    current_page: response.data.current_page,
    per_page: response.data.per_page,
    total_in_page: response.data.total_in_page,
    last_page: response.data.last_page,
    path: response.data.path,
    to: response.data.to,
    from: response.data.from,
    last_page_url: response.data.last_page_url,
    first_page_url: response.data.first_page_url,
  };

  return successResponseBody;
}
function createEcourierGetAreaListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Area list fetched successfully",
    data: response.message.map((area) => {
      return {
        area_name: area.name,
        area_id: area.value,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetAreaListByDistrictSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Area list fetched successfully",
    data: response.data.map((area) => {
      return {
        area_name: area.name,
        area_id: area.id,
        post_code: area.post_code,
        hub_id: area.hub_id,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetAreaListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Area list fetched successfully",
    data: response.message.map((area) => {
      return {
        area_name: area.name,
        area_id: area.value,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierGetBranchListSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: "Success",
    message: "Branch list fetched successfully",
    data: response.map((branch) => {
      return {
        branch_name: branch.name,
        branch_id: branch.value,
      };
    }),
  };
  return successResponseBody;
}
function createEcourierPaymentStatusSuccessResponseBody(response) {
  const successResponseBody = {
    code: 200,
    type: response.success ? "Success" : "Error",
    message: response.success
      ? "Payment status fetched successfully"
      : response.message,
    data: response.success
      ? {
          payment_id: response.message.payment_id,
          payment_mode: response.message.payment_mode,
          collected_amount: response.message.collected_amount,
          payment_date: response.message.payment_date,
          shipping_charge: response.message.shipping_charge,
          booking_price: response.message.booking_price,
          fragile_price: response.message.fragile_price,
          cash_on_delivery: response.message.cash_on_delivery,
        }
      : null,
  };
  return successResponseBody;
}

function createSteadfastCheckBalanceResponseBody(response) {
  const successResponseBody = {
    code: response.status,
    type: response.status === 200 ? "success" : "error",
    message: "Balance fetched successfully",
    data: {
      current_balance: response.current_balance,
    },
  };
  return successResponseBody;
}
function createPathaoErrorResponseBody(error) {
  const errorResponseBody = {
    type: error.type,
    messsaage: error.message,
    errors: error.errors,
    code: error.code,
  };
  return errorResponseBody;
}
function createEcourierErrorResponseBody(error) {
  const errorResponseBody = {
    type: "error",
    messsaage: error.message,
    errors: error.errors,
    code: error.response_code,
  };
  return errorResponseBody;
}
function createSteadfastErrorResponseBody(error) {
  const errorResponseBody = {
    type: "error",
    messsaage: error,
    errors: [error],
    code: 400,
  };
  return errorResponseBody;
}

module.exports = {
  createPathaoShipmentRequestBody,
  createPathaoCalculatePriceRequestBody,
  createPathaoShipmentTrackRequestBody,
  createPathaoShipmentRequestBodyFromBulk,
  createPathaoShipmentSuccessResponseBody,
  createPathaoBulkShipmentSuccessResponseBody,
  createPathaoTrackShipmentSuccessResponseBody,
  createPathaoGetCityListSuccessResponseBody,
  createPathaoGetAreaListSuccessResponseBody,
  createPathaoGetZoneListSuccessResponseBody,
  createPathaoGetStoreListSuccessResponseBody,
  createPathaoErrorResponseBody,

  createEcourierShipmentRequestBody,
  createEcourierShipmentTrackRequestBody,
  createEcourierCancelShipmentRequestBody,
  createEcourierShipmentSuccessResponseBody,
  createEcourierTrackShipmentSuccessResponseBody,
  createEcourierGetCityListSuccessResponseBody,
  createEcourierGetPackageListSuccessResponseBody,
  createEcourierGetThanaListSuccessResponseBody,
  createEcourierGetPostCodeListSuccessResponseBody,
  createEcourierGetAreaListSuccessResponseBody,
  createEcourierGetBranchListSuccessResponseBody,
  createEcourierGetAreaListByDistrictSuccessResponseBody,
  createEcourierPaymentStatusSuccessResponseBody,
  createEcourierCAncelShipmentSuccessResponseBody,
  createEcourierErrorResponseBody,

  createSteadfastShipmentRequestBody,
  createSteadfastShipmentRequestBodyFromBulk,
  createSteadfastShipmentSuccessResponseBody,
  createSteadfastBulkShipmentSuccessResponseBody,
  createSteadfastErrorResponseBody,
  createSteadfastTrackShipmentSuccessResponseBody,
  createSteadfastCheckBalanceResponseBody,
};
