import News from "./News";
import Page404 from "./404";

const routes = [
  {
    path: "/news/:pageNum",
    component: News,
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/",
    exact: true,
    component: News,
  },
  {
    path: "/*",
    component: Page404,
  },
];

export default routes;
