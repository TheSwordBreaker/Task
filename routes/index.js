const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
var ObjectId = require("mongoose").Types.ObjectId;
const createError = require("http-errors");
const { send, error, catchasync } = require("../utlis/api");
const { addUserValidation } = require("../validation");

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Create a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: Leanne Graham
 *               age:
 *                 type: integer
 *                 description: The user's age.
 *                 example: 18
 *               mobileNumber:
 *                 type: string
 *                 description: The user's Moblie number.
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 */

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

/**
 * @swagger
 * /user/:
 *   get:
 *     summary: Retrieve a list of users from database.
 *     description: Retrieve a list of users ffrom database. Can be used to populate a list of fake users when prototyping or testing an API.
 *
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Display success or failure
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: gives extra info about the responses
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *
 *
 *
 *
 *
 *
 *
 */

router.get(
  "/user",

  catchasync(async (req, res, next) => {
    // router.post('/User', validate('User','body') , catchasync( async (req, res, next) =>{
    const user = await User.find({});
    if (user.length == 0) return next(createError(404, "No User Found"));
    send(res, user);
  })
);

/**
 * @swagger
 * /user/id/{id}:
 *   get:
 *     summary: Retrieve a list of users from database with id as given.
 *     description: Retrieve a list of users ffrom database with id as given .
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Display success or failure
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: gives extra info about the responses
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record updated.
 *
 *
 *
 *
 *
 *
 *
 */

router.get(
  "/user/id/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ id: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);

/**
 * @swagger
 * /user/name/{name}:
 *   get:
 *     summary: Retrieve a list of users from database with name as given.
 *     description: Retrieve a list of users ffrom database with name as given .
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Display success or failure
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: gives extra info about the responses
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *
 *
 *
 *
 *
 *
 *
 */
router.get(
  "/user/name/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ name: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);
/**
 * @swagger
 * /user/mobileNumber/{mobileNumber}:
 *   get:
 *     summary: Retrieve a list of users from database with mobileNumber as given.
 *     description: Retrieve a list of users ffrom database with mobileNumber as given .
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Display success or failure
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: gives extra info about the responses
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *
 *
 *
 *
 *
 *
 *
 */
router.get(
  "/user/mobileNumber/:value",
  catchasync(async (req, res, next) => {
    const { value } = req.params;
    const user = await User.find({ mobileNumber: value });
    if (user.length == 0) return next(createError(404, "No User Found"));
    return send(res, user);
  })
);
/**
 * @swagger
 * /user/age/{age}:
 *   get:
 *     summary: Retrieve a list of users from database with age as given.
 *     description: Retrieve a list of users ffrom database with age as given. .
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Display success or failure
 *                   example: 0
 *                 msg:
 *                   type: string
 *                   description: gives extra info about the responses
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID.
 *                         example: 607158629c87a20b60012cca
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 *                       age:
 *                         type: integer
 *                         description: The user's age.
 *                         example: 18
 *                       mobileNumber:
 *                         type: string
 *                         description: The user's Moblie number.
 *                         example: 1234567890
 *                       createdAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *                       updatedAt:
 *                         type: string
 *                         format: date
 *                         description: The date of the record creation.
 *
 *
 *
 *
 *
 *
 *
 */
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
