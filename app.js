// const express = require('express');

// const app = new express();

// const mongoose= require('mongoose');





// // const URI="mongodb://localhost:27017/User_Profile";
// mongoose.connect(URI,
//   err=>{
//     if(err) throw err;
//     console.log("Connected to MongoDb");
//   }
// );

// app.use('/user', express.static('storage/images'));

// app.use('/api/v1', router);


// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) { // Multer-specific errors
//         return res.status(418).json({
//             err_code: err.code,
//             err_message: err.message,
//         });
//     } else { // Handling errors from any other cases from whole application
//         return res.status(500).json({
//             err_code: 409,
//             err_message: "Something went wrong!"
//         });
//     }
// });

// app.use('*', (req, res) => {
//     res.status(404).json({ status: "fail", data: "Not Found" });
// });

// module.exports = app;
