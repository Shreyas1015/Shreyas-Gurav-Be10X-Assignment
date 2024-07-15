export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-blog", "/", "/all-blogs", "/my-blogs", "/blog/:bid*"],
};
