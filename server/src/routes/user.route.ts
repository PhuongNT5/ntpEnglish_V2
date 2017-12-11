import * as express from 'express';
import { UserController } from '../controllers';
import { parser } from '../middleware/jwt-parse';
import constant from '../constant';
import { Response, Request } from '@angular/http';
export const userRouter = express.Router();

const register = (req, res, next) => {
    UserController.register(req).then(respone => res.send(respone))
        .catch(err => res.status(400).send(err));
};

const updateUser = (req, res, next) => {
    UserController.updateUser(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const resetPassword = (req, res, next) => {
    UserController.resetPassword(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const login = (req, res, next) => {
    UserController.login(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const changePass = (req, res, next) => {
    UserController.changePass(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const deleteUser = (req, res, next) => {
    UserController.deleteUser(req).then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};

const find = (req, res, next) => {
    UserController.find().then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};
const findUserById = (req, res, next) => {
    UserController.findUserById(req)
        .then(response => res.send(response))
        .catch(err => res.status(400).send(err));
};
/**
 * @api {put} api/user/ UpdateUser
 * @apiDescription Update existed user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam {String} email email of a particular user.
 * @apiParam {String} name Full name of a particular user.
 * @apiParam {String} gender Gender of a particular user.
 * @apiParam {String} email Email of a particular user.
 * @apiParam {String} phone Phone of a particular user.
 * @apiParam {String} avatar Avatar's url of a particular user.
 * @apiParam {Object} location Location of a particular user.
 * @apiParam {String} --address Address of a particular user.
 * @apiParam {Number} --long Longitude of location.
 * @apiParam {Number} --lat Latitude of location.
 * @apiParam {String[]} position List of positions of a particular user.
 * @apiSuccess {Object} user Detail of updated user
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "_id": "59e81b5cea49d754e8d4aaec",
 *           "email": "tranphan",
 *           "name": "Phan Trần",
 *           "gender": "male",
 *           "email": "phantran1295123@gmail.com",
 *           "phone": "01646907943",
 *           "avatar": "./img/phantran1.jpg",
 *           "__v": 2,
 *           "location": {
 *               "address": "105 Man Thiện, P.Hiệp Phú, Q.9, TP.HCM",
 *               "long": 10.851516,
 *               "lat": 106.787355
 *           },
 *           "position": [
 *               "tiendao",
 *               "thumon"
 *           ],
 *           "id": "59e81b5cea49d754e8d4aaec"
 *       }
 * @apiError UserNotFound
 */
userRouter.route('/').put(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), updateUser);

/**
 * @api {get} api/user/resetpassword/:email ResetPassword
 * @apiDescription Reset password
 * @apiName ResetPassword
 * @apiGroup User
 * @apiParam {String} email email of a particular user.
 * @apiSuccess {Message} Result Notification
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "message": "User does not exist"
 *       }
 * @apiError UserNotFound
 */
userRouter.route('/resetpassword/:email').get(resetPassword);

/**
 * @api {POST} api/user/ Register
 * @apiName Register
 * @apiDescription Register account
 * @apiGroup User
 * 
 * @apiParam {IUser} user
 * @apiParamExample param:
 * {
 * "email": "yennkk",
 * "name": "yee11s",
 * "gender": "male",
 * "email":"lnktddzhuad@gmail.com",
 * "phone": "0962aa154002",
 * "avatar": "ffff",
 * "avatar": "ffff",
 * "role": "user",
 * "location": {
 *      "address": "abc",
 *      "coordinate": {
 *          "latitude":10,
 *          "longtitde": 20
 * 	    }
 *  },
 * "password": "haiyen"
 * }
 * @apiSuccess {Object} user user detail.
 * @apiSuccessExample Success-Response:
 * {
 *   "__v": 0,
 *  "email": "yennkk",
 *   "name": "yee11as",
 *   "gender": "male",
 *   "email": "lnktddzhuad@gmail.com",
 *   "phone": "0962aa154002",
 *   "avatar": "ffff",
 *   "_id": "59e6ff15016d8b0424c2eedd",
 *   "birthday": "2017-10-18T07:13:04.547Z",
 *   "team": [],
 *   "role": "user",
 *   "location": {
 *       "address": "abc"
 *   },
 *   "position": [
 *       "thu mon"
 *   ]
 *}
 *
 * @apiError error message
 * @apiErrorExample Error-Response:
 *    user already exists
 * 
 */
userRouter.route('/').post(register);

/**
 * @api {POST} api/user/login Login
 * @apiName Login
 * @apiDescription Login to application
 * @apiGroup User
 * 
 * @apiParam {String} email 
 * @apiParam {String} password
 * 
 * @apiSuccess {Object} user user detail.
 * @apiSuccess {String} token store to request api.
 * 
 * @apiSuccessExample Success-Response:
 *    {
 *   "user": {
 *      "_id": "59e5956bf7c1cb1e7456e622",
 *      "email": "yen",
 *      "name": "yee11s",
 *      "gender": "male",
 *      "email": "lnktddzhu@gmail.com",
 *      "phone": "0962aa154002",
 *      "avatar": "ffff",
 *      "__v": 0,
 *      "birthday": "2017-10-17T05:29:53.018Z",
 *      "team": [],
 *      "role": "user",
 *      "location": {
 *          "address": "abc"
 *      },
 *      "position": [
 *          "thu mon"
 *      ]
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWU1OTU2YmY3YzFjYjFlNzQ1NmU2MjIiLCJ1c2VybmFtZSI6InllbiIsIm5hbWUiOiJ5ZWUxMXMiLCJnZW5kZXIiOiJtYWxlIiwiZW1haWwiOiJsbmt0ZGR6aHVAZ21haWwuY29tIiwicGhvbmUiOiIwOTYyYWExNTQwMDIiLCJhdmF0YXIiOiJmZmZmIiwiX192IjowLCJiaXJ0aGRheSI6IjIwMTctMTAtMTdUMDU6Mjk6NTMuMDE4WiIsInRlYW0iOltdLCJyb2xlIjoidXNlciIsImxvY2F0aW9uIjp7ImFkZHJlc3MiOiJhYmMifSwicG9zaXRpb24iOlsidGh1IG1vbiJdLCJpYXQiOjE1MDgzMDM5NDl9.zNl7pNSW07maEYcNUMypyeHZ0eOPXDzveGNIE9ftlPE"
 *  }
 * 
 * @apiError Unauthorize message
 * @apiErrorExample Error-Response:
 * {
 * "message": "email or password invalid"
 * }
 */
userRouter.route('/login').post(login);

/**
 * @api {PUT} api/user/changepassword ChangePassword
 * @apiName ChangePassword
 * @apiDescription Change password when user logined
 * @apiGroup User
 * 
 * @apiParam {String} email
 * @apiParam {String} oldPass
 * @apiParam {String} newPass
 * 
 * @apiSuccess success message
 * 
 * @apiSuccessExample Success-Response:
 *    change password success
 * 
 * @apiError error message
 * @apiErrorExample Error-Response:
 *    password not correct
 */
userRouter.route('/changepassword').put(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), changePass);

/**
 * @api {delete} api/user/:email RemoveUser
 * @apiDescription Remove existed user
 * @apiName RemoveUser
 * @apiGroup User
 * @apiParam {String} email email of a particular user.
 * @apiSuccess {Object} RemoveObject Result
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *           "n": 1,
 *           "ok": 1
 *       }
 * @apiError Error message
 * @apiErrorExample Error-Response:
 *    user dose not exist
 */
userRouter.route('/:email').delete(parser([constant.ROLE.ADMIN]), deleteUser);

/**
 * @api {get} api/user FindAllUsers
 * @apiDescription Find all users
 * @apiName FindAllUsers
 * @apiGroup User
 * @apiSuccess {Object} user Details of all users
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      [
 *           {
 *               "_id": "59f8f405ec63693a604ca3c1",
 *               "name": "Phan Trần",
 *               "gender": "male",
 *               "email": "phantran1295@gmail.com",
 *               "phone": "01646907943",
 *               "avatar": "./img/phantran1.jpg",
 *               "password": "$2a$10$mLsEBXnnRb5sbc2EOqa.keMFdeud7zfDzOvWFwLBOQliti0AvP/L6",
 *               "salt": "$2a$10$mLsEBXnnRb5sbc2EOqa.ke",
 *               "__v": 0,
 *               "birthday": "2017-10-31T22:05:27.461Z",
 *               "team": [],
 *               "role": "user",
 *               "location": {
 *                   "address": "103 Man Thiện, P.Hiệp Phú, Q.9, TP.HCM",
 *                   "long": 10.851514,
 *                   "lat": 106.787319
 *               },
 *               "position": [
 *                   "tiendao",
 *                   "tienve"
 *               ],
 *               "id": "59f8f405ec63693a604ca3c1"
 *           }
 *       ]
 */
userRouter.route('/').get(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), find);


userRouter.route('/:id').get(parser([constant.ROLE.USER, constant.ROLE.ADMIN]), findUserById);





