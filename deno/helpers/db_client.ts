import { MongoClient, Database, ObjectId } from "https://deno.land/x/mongo@v0.31.0/mod.ts";

let db : Database;

export async function connect(){
  const client = new MongoClient();
  // Connecting to a Local Database
  await client.connect("mongodb://127.0.0.1:27017");
    db = client.database('denoTodo') //switching db
}

export function getDb(){
    return db
}

export interface TodoSchema {
  _id : ObjectId;
  text : string;
}