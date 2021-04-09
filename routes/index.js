const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
var ObjectId = require("mongoose").Types.ObjectId;
const createError = require("http-errors");
const { send, error, catchasync } = require("../utlis/api");
const { addUserValidation } = require("../validation");

router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

router.post(
  "/user",
  addUserValidation(),
  catchasync(async (req, res, next) => {
    // router.post('/User', validate('User','body') , catchasync( async (req, res, next) =>{
    console.log(req.body);

    const user = new User({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      age: req.body.age,
    });

    await user.save();
    send(res, user);
  })
);

router.get(
  "/user",

  catchasync(async (req, res, next) => {
    // router.post('/User', validate('User','body') , catchasync( async (req, res, next) =>{
    const user = await User.find({});
    if (user.length == 0) return next(createError(404, "No User Found"));
    send(res, user);
  })
);

router.get(
  "/user/id/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ id: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);

router.get(
  "/user/name/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ name: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);
router.get(
  "/user/mobileNumber/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ mobileNumber: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);
router.get(
  "/user/age/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    console.log("age", value, req.params);
    // console.log(Object.keys(req));
    const user = await User.find({ age: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);

// router.put('/post/:id', (req, res) => {
//   db.post.update({
//     title: req.body.title,
//     content: req.body.content,
//     show: req.body.show
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }).then((result) => send(res, result)).catch(e => {
//     console.log(e)
//   })
// })

// router.get(
//   "/leaderboard",
//   catchasync(async (req, res) => {
//     // console.log(await User.find({}));
//     let result = [];
//     let key = "";
//     let sort = { score: -1 };
//     var page = 0;
//     var limit = 10;
//     let query = {};

//     if ("page" in req.query) {
//       console.log("...Paging");
//       page = parseInt(req.query.page) || 0; //for next page pass 1 here
//       if (page < 0) page = 0;
//     }

//     if ("limit" in req.query) {
//       console.log("...Limiting");
//       limit = parseInt(req.query.limit) || 5;
//     }

//     if ("order" in req.query) {
//       console.log("...Sorting");
//       if (req.query["order"] === "User_name.asc") sort = { slug: 1 };
//       if (req.query["order"] === "score.asc") sort = { score: 1 };
//       if (req.query["order"] === "User_name.des") sort = { slug: -1 };
//       if (req.query["order"] === "score.des") sort = { score: -1 };
//     }

//     if ("q" in req.query) {
//       console.log("..searching");
//       key = req.query["q"];
//       if (key !== "") {
//         if (typeof key === "string") query = { User_name: key };
//         if (!isNaN(parseInt(key))) query = { score: key };
//       }
//     }

//     let paginatedresult = await User.aggregate([
//       {
//         $facet: {
//           paginatedData: [
//             { $match: query },
//             // { collation: {locale:'en',strength: 2} },
//             { $sort: sort },
//             { $skip: page * limit },
//             { $limit: limit },
//           ],
//           totalCount: [
//             { $match: query },
//             { $count: "totalCount" },
//             // { page: page },
//           ],
//         },
//       },
//     ]);
//     console.log(paginatedresult[0].paginatedData.length);

//     return send(res, paginatedresult);
//   })
// );

module.exports = router;
