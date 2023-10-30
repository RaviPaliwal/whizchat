// // import { pipeline } from "@xenova/transformers";
// const fs = require('fs');

// const sentimentAnalysis = async () => {
//   let { pipeline, env } = await import('@xenova/transformers');
//   let pipe = await pipeline("sentiment-analysis");
//   let out = await pipe(["Hello Guys", "Good AfterNoon", "Good Afternoon", "Hey Guys", "Hello", "How Are You", "We are Fine", "hi everyone", "hi bro"]
//   );
//   console.log(out);
// };

// const chatwithbot = async () => {
//   // Allocate a pipeline for text2text-generation
//   let { pipeline, env } = await import('@xenova/transformers');
//   let poet = await pipeline(
//     "text2text-generation",
//     "Xenova/LaMini-Flan-T5-783M"
//   );
//   let result = await poet(["Suggest Next Message", "Hello, Hi ,How are you?", "i am fine and you?","i am also fine"], {
//     max_new_tokens: 200,
//     temperature: 0.9,
//     repetition_penalty: 2.0,
//     no_repeat_ngram_size: 3,
//     // top_k: 20,
//     // do_sample: true,
//   });
//   console.log(result);
// };

// sentimentAnalysis();
// // chatwithbot()

// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.blob();
// 	return result;
// }
// query({"inputs": "Astronaut riding a cock"}).then((response) => {
//   console.log(response);
//   response.image()
  
// 	// Use image
// });



// // async function query(data) {
// //   const response = await fetch(
// //     "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
// //     {
// //       headers: { Authorization: "Bearer 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" },
// //       method: "POST",
// //       body: JSON.stringify(data),
// //     }
// //   );
// //   const buffer = await response.buffer();

// //   return buffer;
// // }

// // query({ "inputs": "Astronaut riding a cock" }).then((buffer) => {
// //   // Save the Buffer as a file with a specific name (e.g., "image.jpg")
// //   const fileName = 'image.jpg';
// //   fs.writeFileSync(fileName, buffer);
// //   console.log(`File "${fileName}" saved.`);
// // });
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/meta-llama/Llama-2-70b-chat-hf",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});