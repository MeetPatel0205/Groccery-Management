import Razorpay from "razorpay";
import shortid from "shortid";
import crypto from "crypto"

export const paymentcontroller = async (req, res) => {
  const id = req.query.id;
//   console.log(id);

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: (id*100).toString(),
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };

  try {
    const result = await razorpay.orders.create(options);
    // console.log(result);
    res.status(200).json({
      success: true,
      resultData: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const paymentverification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    // console.log(generated_signature);
    // console.log(razorpay_signature);
  
    if (generated_signature) {
      res.redirect("http://localhost:5173/paymentsuccess");
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };
