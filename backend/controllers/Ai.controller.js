const fetch = require('node-fetch'); // Assuming you're using Node.js

exports.generateImage = async (req, res) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: "Bearer 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",
          'Content-Type': 'application/json', // Set the content type
        },
        method: "POST",
        body: JSON.stringify(req.body), // Convert req.body to JSON
      }
    );

    if (response.ok) {
      // Assuming the response is an image in binary format
      const imageBuffer = await response.buffer();
      console.log(imageBuffer);
      // Set the content type in the response
      res.set('Content-Type', 'image/jpeg'); // Adjust the content type as needed

      // Send the image as a response
      res.send(imageBuffer);
    } else {
      res.status(response.status).json({ error: 'Failed to generate image' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
