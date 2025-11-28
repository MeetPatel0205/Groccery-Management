import FoodCategory from '../models/Category.js';
import { FoodMenu } from "../models/Menu.js";
import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dcaeiehmt',
  api_key: '247687266215728',
  api_secret: '2PoE_B00C0J5ZOUwTwBSppyis1U'
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const FoodCategoryController = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    const fileDataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      folder: 'images'
    });

    const newCategory = new FoodCategory({ CategoryName, image: result.secure_url });
    await newCategory.save();
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

export const FoodMenuController = async (req, res) => {
  try {
    const { FoodName, FoodPrice, Quantities, FoodAbout, FoodCategory, FoodStatus } = req.body;
    const fileDataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      folder: 'images'
    });
    const newMenu = new FoodMenu({ FoodName, FoodPrice, Quantities, FoodAbout, FoodCategory, FoodStatus, image: result.secure_url });
    await newMenu.save();

    res.status(201).send({ message: "Menu added successfully" });
  } catch (error) {
    console.log("Menu error:", error.message);
    if (error.name === "ValidationError") {
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "An error occurred during menu creation" });
    }
  }
}

export const showCategoryController = async (req, res) => {
  try {
    const Categorydata = await FoodCategory.find();
    res.send({ success: true, data: Categorydata });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ success: false, error: "An error occurred while fetching categories" });
  }
};

export const showMenuController = async (req, res) => {
  try {
    const Menudata = await FoodMenu.find();
    res.send({ success: true, data: Menudata });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).send({ success: false, error: "An error occurred while fetching menus" });
  }
};

export const deleteCetgoryController = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await FoodCategory.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, deleteSuccmessage: "Category deleted successfully" });
    } else {
      res.status(404).json({ success: false, deleteErrmessage: "Category not found" });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Error deleting category" });
  }
};

export const deletemenuController = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await FoodMenu.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, deleteSuccmessage: "Menu deleted successfully" });
    } else {
      res.status(404).json({ success: false, deleteErrmessage: "Menu not found" });
    }
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ success: false, message: "Error deleting menu" });
  }
};

export const updateCategoryController = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, updateErrmessage: 'File upload failed' });
    }

    const { id } = req.params;
    const { CategoryName } = req.body;
    let imageUrl;

    if (req.file) {
      try {
        const fileDataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(fileDataUrl, {
          folder: 'images'
        });
        imageUrl = result.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ success: false, updateErrmessage: 'Image upload to Cloudinary failed' });
      }
    }

    try {
      const updateData = { CategoryName };
      if (imageUrl) updateData.image = imageUrl;

      const updatedCategory = await FoodCategory.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ success: false, updateErrmessage: 'Category not found' });
      }

      res.status(200).json({ success: true, data: updatedCategory, updateSuccmessage: 'Category updated successfully' });
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ success: false, updateErrmessage: 'Server error' });
    }
  });
};


export const updateMenuController = async (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(500).json({ success: false, updateErrmessage: 'File upload failed' });
    }

    const { id } = req.params;
    const { FoodName, FoodPrice, Quantities, FoodAbout, FoodCategory, FoodStatus } = req.body;
    let imageUrl;

    if (req.file) {
      try {
        const fileDataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const result = await cloudinary.uploader.upload(fileDataUrl, {
          folder: 'images'
        });
        imageUrl = result.secure_url;
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ success: false, updateErrmessage: 'Image upload to Cloudinary failed' });
      }
    }

    try {
      const updateData = { FoodName, FoodPrice, Quantities, FoodAbout, FoodCategory, FoodStatus };
      if (imageUrl) updateData.image = imageUrl;

      const updatedMenu = await FoodMenu.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedMenu) {
        console.error('Menu not found for update');
        return res.status(404).json({ success: false, updateErrmessage: 'Menu not found' });
      }

      res.status(200).json({ success: true, data: updatedMenu, updateSuccmessage: 'Menu updated successfully' });
    } catch (error) {
      console.error('Update menu error:', error);
      res.status(500).json({ success: false, updateErrmessage: 'Server error' });
    }
  });
};
