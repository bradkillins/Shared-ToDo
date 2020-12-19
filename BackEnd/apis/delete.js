const db = require("../database");

module.exports.todo = async (req, res) => {
  if ((await db.DeleteTodo(req.body.todoId)) != 1) {
    res.json({
      success: false,
      msg: "Todo not found and could not be deleted."
    });
  } else res.json({ success: true, msg: "Todo deleted." });
};
