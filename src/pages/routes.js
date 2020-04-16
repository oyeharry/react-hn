import News, { getServerSideProps as newsGetServerSideProps } from './News';
import Page404 from './404';

const routes = [
  {
    path: '/news/:pageNum',
    component: News,
    getServerSideProps: newsGetServerSideProps,
  },
  {
    path: '/news',
    component: News,
    getServerSideProps: newsGetServerSideProps,
  },
  {
    path: '/',
    exact: true,
    component: News,
    getServerSideProps: newsGetServerSideProps,
  },
  {
    path: '/*',
    component: Page404,
  },
];

export default routes;
