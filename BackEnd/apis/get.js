const db = require("../database");

module.exports.userList = async (req, res) => {
  const userEmail = req.params.userEmail;
  if (!(await db.GetUserByEmail(userEmail))) {
    res.json({ success: false, msg: "No user with supplied email found." });
  } else {
    todos = await db.GetAllUserTodos(userEmail);
    res.json({
      success: true,
      msg: `Found user: ${userEmail} Todos`,
      todos: todos
    });
  }
};
