import { FoodMenu } from "../models/Menu.js";
import { OrderData } from "../models/Orders.js";

export const handleOrderData = async (req, res) => {
  try {
    let data = req.body.orderData;

    for (let d of data) {
      await FoodMenu.findByIdAndUpdate(
        d.id, 
        { $inc: { Quantities: -d.qty } } // Decrease quantities
      );
    }
    
    await data.splice(0, 0, { orderDate: req.body.orderDate, status: "Preparing...", chartMonth: new Date().getMonth() + 1 });

    let eId = await OrderData.findOne({ email: req.body.email });

    if (eId === null) {
      try {
        const finalOrderData = await OrderData.create({
          email: req.body.email,
          order_data: [data],
        });

        res.json({ success: true, finalOrderData });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    } else {
      try {
        const finalOrderData = await OrderData.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { order_data: data },
          }
        );

        res.json({ success: true, finalOrderData });
      } catch (error) {
        res.json({ success: false });
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const orderchartController = async (req, res) => {
  try {
    // Fetch order data from the database
    const orderData = await OrderData.find({});

    console.log(orderData);

    // Extract order dates from the fetched data
    const orderDates = orderData.flatMap(order =>
      order.order_data.map(orderEntry => orderEntry[0].chartMonth)
    );

    // Send the extracted order dates to the client
    res.send({ success: true, data: orderDates });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).send({ success: false, error: "An error occurred while fetching order data" });
  }
};


export const showOrderController = async (req, res) => {
  try {

    const orderData = await OrderData.find({});

    res.send({ success: true, data: orderData });


  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).send({ success: false, error: "An error occurred while fetching order data" });
  }
}

export const updateOrder = async (req, res) => {
  const { email, orderIndex, status } = req.body;

  try {
    // Construct the path to the specific status field in the nested array
    const statusPath = `order_data.${orderIndex}.0.status`;

    console.log(statusPath);

    // Update the specific status field using update() method
    const result = await OrderData.updateOne(
      { email },
      { $set: { [statusPath]: status } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ success: false, message: 'Order not found or status not updated' });
    }

    res.status(200).json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order', error: error.message });
  }
};
