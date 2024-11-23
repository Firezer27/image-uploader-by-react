const express = require("express"); //install express
const multer = require("multer"); //install multer
const cors = require("cors"); // install cors
require('./dbConfig/db')

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());





// Schema for storing image data
const ImageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});
const Image = mongoose.model("Image", ImageSchema);

// Multer setup for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Endpoint to upload images
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newImage.save();
    res.status(200).send("Image uploaded successfully!");
  } catch (err) {
    res.status(500).send("Error uploading image.");
  }
});

// API Endpoint to fetch images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).send("Error fetching images.");
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
