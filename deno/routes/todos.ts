import { Router } from "https://deno.land/x/oak@v11.0.0/mod.ts";
import { ObjectId } from  "https://deno.land/x/mongo@v0.31.0/mod.ts";

import { getDb, TodoSchema } from '../helpers/db_client.ts';

const router = new Router();

interface Todo {
  id?: string; //make nullable
  text: string;
}

router.get('/todos', async (ctx) => {
  const todos = await getDb().collection<TodoSchema>('todos').find(); // { _id: ObjectId(), text: '...' }[]
  const transformedTodos :Array<Todo> = await todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      return { id: todo._id.toString(), text: todo.text };
    }
  );
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body().value;
  const newTodo: Todo = { text: data.text };
  const _id = await getDb().collection("todos").insertOne(newTodo);

  newTodo.id = _id.$oid; //extraction value from ObjectId

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body().value;

  await getDb()
    .collection("todos")
    .updateOne({ _id: new ObjectId(tid) }, { $set: { text: data.text } });

  ctx.response.body = { message: "Updated todo" };
});

router.delete("/todos/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;

  await getDb()
    .collection("todos")
    .deleteOne({ _id: new ObjectId(tid) });

  ctx.response.body = { message: "Deleted todo" };
});

export default router;
