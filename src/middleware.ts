import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect here if not logged in
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
