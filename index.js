const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/dbconnection");
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();
dotenv.config();
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const distStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: distStorage });

app.post("/api/upload" ,upload.single("image"), (req, res) => {
  res.status(200).json({
    message: "file has been uploaded",
    imgName: req.file.filename,
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes)
app.get('/', (req, res) => {
  res.send('Welcome into book shelf project')
})

app.listen(process.env.PORT, function () {
  console.log("Server is listening at port:" + process.env.PORT);
});

