import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application()

import todosRoutes from './routes/todos.ts';


app.use(async (ctx, next) => {
    console.log('Middleware!');
    await next();
  });
  
  app.use(todosRoutes.routes());
  app.use(todosRoutes.allowedMethods());
  
  await app.listen({ port: 3000 });