import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
 
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
        url: 'http://localhost:3000',
        headers(){
            return {
            Authorization : "abcd"
        }
    }
    }),
     
  ],
});

async function main() {
    const response = await trpc.signup.mutate({
    userName: "do something",
        email: "do something description",
        password: "123123123"
    })
    console.log(response);
}


main();