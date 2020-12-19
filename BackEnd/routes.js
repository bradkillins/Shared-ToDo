const express = require("express");
const bodyParser = require("body-parser");
const urlParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

const router = express.Router(); //this holds all routes in an object and is exported

/*******************************************************************************************
 *           API Routes
 *
 *  POST:     //api/user/new            - create new user
 *  POST:     //api/login               - validates user login
 *  POST:     //api/todo/new            - create new todo
 *  POST:     //api/task/new            - create new task for an existing todo
 *  GET:      //api/list/:userId        - gets all todos associated with a certain user
 *  PUT:      //api/task                - edit an existing task
 *  DELETE:   //api/todo                - delete a todo
 *
 ********************************************************************************************/
//

/**
 * For verifying authentication
 */
const v = require("./verify");

const post = require("./apis/post");
router.post("/api/user/new", jsonParser, post.newUser);
router.post("/api/login", jsonParser, post.login);
router.post("/api/todo/new", v.IsAuth, jsonParser, post.newTodo);
router.post("/api/task/new", v.IsAuth, jsonParser, post.newTask);

const get = require("./apis/get");
router.get("/api/list/:userEmail", v.IsAuth, urlParser, get.userList);

const put = require("./apis/put");
router.put("/api/task", v.IsAuth, jsonParser, put.task);

const del = require("./apis/delete");
router.delete("/api/todo/", v.IsAuth, jsonParser, del.todo);

//Export the router object

module.exports = router;
