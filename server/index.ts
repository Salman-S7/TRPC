import { publicProcedure, router } from './trpc';
import {z} from 'zod'
 import { createHTTPServer } from '@trpc/server/adapters/standalone';


const todoInputType = z.object({
    title: z.string(),
    description: z.string()
});

const userInputTypes = z.object({
    userName: z.string(),
    email: z.string(),
    password : z.string()
})

const appRouter = router({
    createTodo: publicProcedure
        .input(todoInputType)
        .mutation(async (opts) => {
            const title = opts.input.title;
            const description = opts.input.description;
            console.log("hi there");
            //put data into the database 

            return {
                id: '1',
                title,
                description
            }
            

        }),
    signup: publicProcedure
        .input(userInputTypes)
        .mutation(async (opts) => {
            const token = opts.ctx.userName;

            // data will inserted into the db
            //we will create jwt token here
            // const token = password // for now just go with that 

            return {
                token,
            }
        }),
    
});
 
const server = createHTTPServer({
    router: appRouter,
    createContext(opts) {

        let authHeader = opts.req.headers['authorization'];
        console.log(authHeader)
        return {
            userName: "test"
        };  
    }
});
 
server.listen(3000);
export type AppRouter = typeof appRouter;