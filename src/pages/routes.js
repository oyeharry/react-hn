import News, { getServerSideProps as newsGetServerSideProps } from './news';
import Page404 from './404';

const routes = [
  {
    path: '/news/:storyType/:pageNum?',
    cache: true,
    component: News,
    getServerSideProps: newsGetServerSideProps,
  },
  {
    path: '/',
    cache: true,
    exact: true,
    component: News,
    getServerSideProps: newsGetServerSideProps,
  },
  {
    path: '/*',
    cache: false,
    component: Page404,
  },
];

export default routes;
