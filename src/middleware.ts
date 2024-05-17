export { default } from "next-auth/middleware";

// * Protected routes using middleware
export const config = {
  matcher: ["/personal-rooms", "/browse", "/create-room", "/edit-room"],
};
