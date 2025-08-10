import {clerkMiddleware,createRouteMatcher} from '@clerk/nextjs/server'


// which specific routes get protected
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async(auth,req)=>{
  if(isProtectedRoute(req)){
    await auth.protect(); // redirect to sign-in if the user is not signed in
  }

  
   
})
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};