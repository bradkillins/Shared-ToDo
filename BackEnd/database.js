const dbConfig = require("./config").dbConfig;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${dbConfig.dbUser}:${dbConfig.dbPass}@cluster0.s6dgk.mongodb.net/${dbConfig.dbDefault}?retryWrites=true&w=majority`;
const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports.GetUserByEmail = async (email) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    const cursor = client.db().collection("Users").find({ email: email });
    if ((await cursor.count()) != 1) return null;

    let foundUser = {};
    await cursor.forEach((user) => {
      foundUser.id = user.id;
      foundUser.email = user.email;
      foundUser.password = user.password;
      foundUser.fName = user.fName;
      foundUser.lName = user.lName;
    });
    return foundUser;
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports.AddNewDoc = async (collection, doc) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    const result = await client.db().collection(collection).insertOne(doc);
    //console.log("Insert res: " + result.insertedCount);
    return result.insertedCount;
  } catch (err) {
    console.log("Db Error: ");
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports.GetTodoById = async (id) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    return await client.db().collection("Todos").findOne({ id: id });
  } catch (err) {
    console.log("Db Error: ");
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports.ModifyTodo = async (updatedTodo) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    return await client
      .db()
      .collection("Todos")
      .findOneAndReplace({ id: updatedTodo.id }, updatedTodo, {
        returnOriginal: false
      });
  } catch (err) {
    console.log("Db Error: ");
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports.GetAllUserTodos = async (userEmail) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    const todos = [];
    await client.connect();
    const cursorOwner = await client
      .db()
      .collection("Todos")
      .find({ owner: userEmail });
    await cursorOwner.forEach((todo) => {
      todos.push(todo);
    });
    const cursorAuth = await client
      .db()
      .collection("Todos")
      .find({ authUsers: userEmail });
    await cursorAuth.forEach((todo) => {
      todos.push(todo);
    });
    return todos;
  } catch (err) {
    console.log("Db Error: ");
    console.log(err);
  } finally {
    await client.close();
  }
};

module.exports.DeleteTodo = async (todoId) => {
  const client = new MongoClient(uri, clientOptions);
  try {
    await client.connect();
    const dbResponse = await client
      .db()
      .collection("Todos")
      .deleteOne({ id: todoId });
    return dbResponse.deletedCount;
  } catch (err) {
    console.log("Db Error: ");
    console.log(err);
  } finally {
    await client.close();
  }
};
