const axios = require("axios");
const queryMong = require("../models/Query_Mong");

exports.postQuery = async (req, res) => {
  const { name, email, mobile, country, city, message, captcha } = req.body;

  console.log("Captcha received:", captcha);

  if (!captcha) {
    return res
      .status(400)
      .json({ success: false, message: "No captcha token" });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", captcha);

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params
    );

    const newQuery = new queryMong({
      name,
      email,
      mobile,
      country,
      city,
      message,
    });

    await newQuery.save();
    return res.status(201).json({ message: "Message sent" });
  } catch (error) {
    console.error("CAPTCHA or DB error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getManageQuery = async (req, res) => {
  if (!req.session.adminEmail) {
    return res.render("adminLogin");
  } else {
    try {
      const query = await queryMong.find();

      return res.render("manageQuery", { query });
    } catch (error) {
      console.log(error.message);
    }
  }
};

// ----------------- delete queries

exports.deleteQuery=async (req,res) => {
    
    try {
        await queryMong.findByIdAndDelete(req.params.id);
        return res.redirect('/admin/manage-queries');
    } catch (error) {
        return res.send('<script>alert("Unable to delete"); window.history.back();</script>');
    }

}
