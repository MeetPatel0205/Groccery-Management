import { OrderData } from "../models/Orders.js";

export const handleUserOrderData = async (req, res) => {
  try {
    let myData = await OrderData.findOne({ email: req.body.email });

    res.status(200).json({myData});
  } catch (error) {
    res.send(error);
  }
};
