const bcrypt = require("bcrypt");
const Seller = require("../modals/Seller");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email is already registered
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Create a new seller with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    name.toLowerCase();
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
    });
    await newSeller.save();
    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the seller exists
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, seller.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Authentication successful
    res.status(200).json({ message: "Login successful", sellerId: seller._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
