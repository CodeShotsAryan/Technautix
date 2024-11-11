// import formidable from 'formidable';
// import { NextApiRequest, NextApiResponse } from 'next';
// import nextConnect from 'next-connect';

// // Next.js config to disable body parsing for file upload
// export const config = {
//   api: {
//     bodyParser: false, // Disable default Next.js body parsing to allow formidable to handle it
//   },
// };

// const handler = nextConnect(); // Create a next-connect handler

// handler.post((req: NextApiRequest, res: NextApiResponse) => {
//   // Initialize formidable
//   const form = formidable({
//     maxFileSize: 50 * 1024 * 1024, // Set the max file size to 50MB
//     keepExtensions: true,          // Keep file extensions
//   });

//   // Parse the incoming request
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({ success: false, message: 'File upload error' });
//     }

//     // Process the uploaded files
//     return res.status(200).json({ success: true, message: 'File uploaded successfully', files });
//   });
// });

// export default handler;  // Export the handler
