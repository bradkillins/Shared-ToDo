const db = require("../database");

module.exports.task = async (req, res) => {
  const todo = await db.GetTodoById(req.body.todoId);
  todo.tasks.forEach((task) => {
    if (req.body.taskId === task.id) task.complete = req.body.complete;
  });
  const dbResponse = await db.ModifyTodo(todo);
  if (!dbResponse) {
    res.json({
      success: false,
      msg: "Unexpected response from database."
    });
  } else {
    res.json({
      success: true,
      msg: "Updated Task.",
      updatedTodo: dbResponse.value
    });
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
