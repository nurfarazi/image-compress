const express = require('express');
const fileUpload = require('express-fileupload');
const imageThumbnail = require('image-thumbnail');

const app = express();

app.use(fileUpload());

app.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  let image = req.files.image;

  console.log("Image size: " + image.size / 1024 + " KB");

  const resizedImage = await imageThumbnail(image.data, {
    quality: 50,
  });

  console.log("Resized image size: " + resizedImage.length / 1024 + " KB");

  res.send("File Compressed!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});