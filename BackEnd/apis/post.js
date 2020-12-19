const db = require("../database");
const uuid = require("uuid").v4;

module.exports.newUser = async (req, res) => {
  //check if user with email already exists
  const existingEmail = await db.GetUserByEmail(req.body.email);
  if (existingEmail) {
    res.json({ success: false, msg: "User already exists." });
  } else if (
    !req.body.email ||
    !req.body.password ||
    !req.body.fName ||
    !req.body.lName
  ) {
    res.json({
      success: false,
      msg: "Please enter all information in the form. Try again."
    });
  } else {
    const newUser = {
      id: uuid(),
      email: req.body.email,
      password: req.body.password,
      fName: req.body.fName,
      lName: req.body.lName
    };
    const dbResponse = await db.AddNewDoc("Users", newUser);
    if (dbResponse === 1) {
      res.json({
        success: true,
        msg: "New User Registered! Try logging in :)"
      });
    } else {
      res.json({
        success: false,
        msg: "Unexpected response from the Database."
      });
    }
  }
};

module.exports.login = async (req, res) => {
  const user = await db.GetUserByEmail(req.body.email);
  if (!user) {
    res.json({ success: false, msg: `No User with email: ${req.body.email}` });
  } else {
    if (user.password != req.body.password) {
      res.json({ success: false, msg: "Incorrect Login Information." });
    } else {
      req.session.auth = true;
      res.json({
        success: true,
        msg: "Login Successful",
        user: {
          id: user.id,
          email: user.email,
          fName: user.fName,
          lName: user.lName
        }
      });
    }
  }
};

module.exports.newTodo = async (req, res) => {
  if (!req.body.owner || !req.body.title) {
    res.json({ success: false, msg: "Todo must include owner and title" });
  } else {
    const newTasks = [];
    req.body.tasks.forEach((task) => {
      const newTask = {
        id: uuid(),
        description: task.description,
        due: task.due,
        complete: false
      };
      newTasks.push(newTask);
    });
    const newTodo = {
      id: uuid(),
      owner: req.body.owner,
      authUsers: req.body.authUsers,
      title: req.body.title,
      tasks: newTasks
    };
    const dbResponse = await db.AddNewDoc("Todos", newTodo);
    if (dbResponse === 1) {
      res.json({
        success: true,
        msg: "Successfully created new Todo.",
        todo: newTodo
      });
    } else {
      res.json({ success: false, msg: "Unexpected response from database." });
    }
  }
};

module.exports.newTask = async (req, res) => {
  if (!req.body.todoId) {
    res.json({ success: false, msg: "Must include todoId." });
  } else {
    const todo = await db.GetTodoById(req.body.todoId);
    if (!todo) {
      res.json({ success: false, msg: "No Todo found with supplied id." });
    } else {
      if (!CanModifyTodo(todo, req.body.userEmail)) {
        res.json({
          success: false,
          msg: "You don't have permission to modify the Todo."
        });
      } else {
        //TODO: check description and due are not null
        //create the new task from req
        const newTask = {
          id: uuid(),
          description: req.body.description,
          due: req.body.due,
          complete: false
        };
        //add the new task to the todo and update db
        todo.tasks.push(newTask);
        const dbResponse = await db.ModifyTodo(todo);
        //send the updated todo from the db back to front-end
        if (!dbResponse) {
          res.json({
            success: false,
            msg: "Unexpected response from database."
          });
        } else {
          res.json({
            success: true,
            msg: "Added new Task to the Todo.",
            updatedTodo: dbResponse.value
          });
        }
      }
    }
  }
};

/**
 * Checks if a user is the owner or in authUsers
 * @param todo: The todo to check.
 * @param userEmail: The user to check for.
 */
const CanModifyTodo = (todo, userEmail) => {
  if (todo.owner === userEmail) return true;
  if (todo.authUsers.includes(userEmail)) return true;
  return false;
};
