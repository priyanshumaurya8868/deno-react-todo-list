import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts';

let db : Database;

export function connect(){
    const client = new MongoClient()
    client.connectWithUri(
      'mongodb://localhost:27017'
    )
    db = client.database('denoTodo') //switching db
}

export function getDb(){
    return db
}