const express = require("express");
const SSLCommerzPayment = require("sslcommerz-lts");
const { nanoid } = require("nanoid");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: true, credentials: true }));

const PORT = 3000;

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWD;
const is_live = false; 

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

app.get("/payment/pay/:amount", (req, res) => {
  const data = {
    total_amount: req.params.amount,
    currency: "BDT",
    tran_id: nanoid(12),
    success_url: `http://localhost:${PORT}/payment/success`,
    fail_url: `http://localhost:${PORT}/payment/fail`,
    cancel_url: `http://localhost:${PORT}/payment/cancel`,
    // ipn_url: `http://localhost:${PORT}/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Tahlil",
    cus_email: "hello@gmail.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Real",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
  });
});

app.post("/payment/success", (req, res) => {
  res.send('<h1 style="color:green;">Thank you for your patronage</h1>');
});

app.post("/payment/cancel", (req, res) => {
  res.send(`<h1 style="color:yellow;">kys</h1>`);
});

app.post("/payment/fail", (req, res) => {
  res.send('<h1 style="color:red;">:(</h1>');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
