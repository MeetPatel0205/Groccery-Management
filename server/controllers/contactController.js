import { ContactModel } from "../models/Contact.js";

export const contactController = async (req, res) => {
  const { username, email, comment } = req.body;

  try {
    let newContact = await ContactModel.create({
      username,
      email,
      comment,
    });

    if (newContact._id) {
      res.status(201).json({
        message: "Contact Received Successfully",
        id: newContact._id,
        username: newContact.username,
        email: newContact.email,
        comment: newContact.comment,
      });
    }
  } catch (error) {
    console.log(error);
    res.send(404).json({ errMessage: "Something Went Wrong!" });
  }
};
