
export const paths = {

  ADMIN: "/admin",

  HOME: "/",
  DASHBOARD: "/dashboard",
  TOPICS: "/topics",
  TOPICS_DETAIL: (id: string) => `/topics/${id}`,
  TOPIC_CREATE: "/topics/create",
  
  SETTINGS: "/settings",
  USERS: "/users",
  POSTS: "/posts",
  POST_CREATE: "/posts/create",
  POST_UPDATE: (id: string) => `/posts/${id}/update`,
  SEARCH: "/search",

  COURSES: "/courses",
  COURSES_DETAIL: (id: string) => `/courses/${id}`,
  COURSE_CREATE: "/courses/create",
  COURSE_UPDATE: (id: string) => `/courses/${id}/update`,

  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  LOGOUT: "/logout",
};
