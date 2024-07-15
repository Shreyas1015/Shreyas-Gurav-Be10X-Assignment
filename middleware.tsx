// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signup", // Redirect to login page if not authenticated
  },
});

export const config = {
  matcher: [
    // Protect all routes except login and signup
    "/((?!login|signup).*)",
  ],
};
