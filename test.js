const axios = require("axios");
const { nanoid } = require("nanoid");

axios
  .post("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
    store_id: "tests660e87c1b29f4",
    store_passwd: "tests660e87c1b29f4@ssl",
    total_amount: "5000",
    currency: "BDT",
    tran_id: nanoid(12),
    product_category: "Robot Penis",
    success_url: "https://google.com",
    fail_url: "https://youtube.com",
    cancel_url: "https://balls.com",
  })
  .then((res) => console.log(res))
  .catch(console.error);
