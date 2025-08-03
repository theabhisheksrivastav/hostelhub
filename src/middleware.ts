import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    /*
      This means: apply middleware to ALL paths 
      EXCEPT "/", "/login", and "/signup"
    */
    "/((?!login|signup|api|_next|favicon.ico|$).*)",
  ],
};
