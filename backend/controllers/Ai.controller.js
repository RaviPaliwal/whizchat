const fetch = require("node-fetch"); // Assuming you're using Node.js

exports.generateImage = async (req, res) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        headers: {
          Authorization: "Bearer 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",
          "Content-Type": "application/json", // Set the content type
        },
        method: "POST",
        body: JSON.stringify(req.body), // Convert req.body to JSON
      }
    );

    if (response.ok) {
      // Assuming the response is an image in binary format
      const imageBuffer = await response.buffer();
      // console.log(imageBuffer);
      // Set the content type in the response
      res.set("Content-Type", "image/jpeg"); // Adjust the content type as needed

      // Send the image as a response
      res.send(imageBuffer);
    } else {
      res.status(response.status).json({ error: "Failed to generate image" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.chatwithbot = async (req, res) => {
  try {
    // Allocate a pipeline for text2text-generation
    let { pipeline} = await import("@xenova/transformers");
    let poet = await pipeline(
      "text2text-generation",
      "Xenova/LaMini-Flan-T5-783M"
    );
    let result = await poet(
      req.params.query,
      {
        max_new_tokens: 500,
        temperature: 0.3,
        repetition_penalty: 5.0,
        no_repeat_ngram_size: 3,
        top_k: 20,
        // do_sample: true,
      }
    );
    res.json(result);
  } catch (e) {
    console.log(e.message);
    res.json(e.message);
  }
};
