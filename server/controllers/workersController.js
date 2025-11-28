import { Staffdata } from "../models/Staff.js";
export const workesController = async (req,res)=>{
  try {
      const { StaffName ,phone , age , work } = req.body;
      const newstaff = new Staffdata({ StaffName ,phone , age , work });
      await newstaff.save();
  
      res.status(201).send({ message: "Category added successfully" });
    } catch (error) {
      console.log("Category error:", error.message);
      if (error.name === "ValidationError") {
        res.status(400).send({ error: error.message });
      } else {
        res.status(500).send({ error: "An error occurred during category creation" });
      }
    }  
  }
  
  export const showWorkerController = async (req, res) => {
    try {
      const workerdata = await Staffdata.find();
     
      res.send({ success: true, data: workerdata });
    } catch (error) {
      console.error("Error fetching Worker:", error);
      res.status(500).send({ success: false, error: "An error occurred while fetching Worker" });
    }
  };

  export const deletestaffController = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Staffdata.deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        res.status(200).json({ success: true, deleteSuccmessage: "staff deleted successfully" });
      } else {
        res.status(404).json({ success: false, deleteErrmessage: "staff not found" });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      res.status(500).json({ success: false, message: "Error deleting menu" });
    }
  };

 export const updatestaffController = async(req, res)=>{
  const id = req.params.id;
  const { StaffName, phone, age, work } = req.body;

  try {
    const updatedStaff = await Staffdata.findByIdAndUpdate(id, {
      StaffName,
      phone,
      age,
      work,
    }, { new: true });

    if (updatedStaff) {
      res.json({ success: true, data: updatedStaff, updateSuccmessage: 'Staff updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Staff not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, updateErrmessage: 'Error updating staff' });
  }
  }