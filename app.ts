import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application()

app.use((ctx)=>{
  ctx.response.body = "Hellow World (from deno+oak)"
})

await app.listen({port : 8000})


//using oak lib oak
// A middleware framework for Deno's native HTTP server,
// This middleware framework is inspired by Koa
// ~ to expressjs