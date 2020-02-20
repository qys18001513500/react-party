import { lazy } from "react";
import Login from 'components/login';
import Home from 'pages/home/home';
import Layout from '../layouts/layout';
// const Layout = lazy(() => import("layouts/Layout"));


const routerConfig = [
  {
    path: "/",
    layout: "",
    component: Login,
    routes: []
  },
  {
    path: "/home",
    layout: Layout,
    component: Home,
    routes: []
  }
  
];

export default routerConfig;
