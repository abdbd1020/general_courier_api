const CONFIG = require("./config");
const courier = require("./courier");

async function main() {
  const shipmentDetails = {
    // Common attributes
    recipient_name: "someguyL",
    recipient_phone: "0177777777",
    recipient_address: "meradia, banasree, dhaka",
    recipient_city: 1,
    recipient_area: "Badda",
    delivery_type: 48,
    item_quantity: 1,
    item_weight: 2.5,
    amount_to_collect: 100,
    special_instruction: "Handle with care",
    item_description: "check the item before delivery",

    // Pathao specific attributes
    store_id: 130834,
    merchant_order_id: "adbd123",
    recipient_zone: 52,
    recipient_area: 1,
    item_type: 2,

    // eCourier specific attributes
    consignment_id: "#2444",
    payment_method: "COD",
    recipient_landmark: "DBBL ATM",
    recipient_thana: "Hazaribag",
    parcel_type: "BOX",
    requested_delivery_time: "2019-07-05",
    delivery_hour: "any",
    recipient_zip: "1212",
    pick_hub: "18490",
    product_id: "DAFS",
    pick_address: "Gudaraghat new mobile",
    comments: "Please handle carefully",
    number_of_item: 3,
    actual_product_price: 1200,
    pgwid: 8888,
    pgwtxn_id: "asdasdsad",
    is_fragile: 0,
    sending_type: 1,
    is_ipay: 0,
  };
  const pathaoShipmentDetails = {
    store_id: 130834,
    merchant_order_id: "adbd123",
    recipient_name: "S M ARFA KAMAL",
    recipient_phone: "0177777777",
    recipient_address: "meradia, banasree, dhaka",
    recipient_city: 1,
    recipient_zone: 52,
    recipient_area: 1,
    delivery_type: 48,
    item_type: 2,
    special_instruction: "Handle with care",
    item_quantity: 1,
    item_weight: 2.5,
    amount_to_collect: 100,
    item_description: "check the item before delivery",
  };
  const pricePlanDetails = {
    store_id: 130834,
    item_type: 1,
    delivery_type: 48,
    item_weight: 0.5,
    recipient_city: 1,
    recipient_zone: 2,
  };

  const ecourierShipmentDEtails = {
    recipient_name: "Debashis",
    recipient_phone: "0177777777",
    recipient_city: "Dhaka",
    recipient_area: "Shankar",
    recipient_thana: "Hazaribag",
    recipient_address: "Full Address",
    consignment_id: "#2444",
    amount_to_collect: 1500,
    payment_method: "COD",
    recipient_landmark: "DBBL ATM",
    parcel_type: "BOX",
    requested_delivery_time: "2019-07-05",
    delivery_hour: "any",
    recipient_zip: "1212",
    pick_hub: "18490",
    product_id: "DAFS",
    pick_address: "Gudaraghat new mobile",
    comments: "Please handle carefully",
    number_of_item: "3",
    actual_product_price: 1200,
    pgwid: 8888,
    pgwtxn_id: "asdasdsad",
    is_fragile: 0,
    sending_type: 1,
    is_ipay: 0,
  };

  try {
    const response = await courier.createShipment(
      CONFIG.ECOURIER_TYPE,
      shipmentDetails
    );
    console.log("Shipment created successfully:", response);
  } catch (error) {
    console.error("Error creating shipment:", error);
  }
}

main();
