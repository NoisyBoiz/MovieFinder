import Home from '../pages/home';
import Movie from '../pages/movie';
import Detail from '../pages/detail';
import Search  from '../pages/search';
import Collections from '../pages/collections';
import Login from '../pages/login';
export const publicRoutes = [
    {path:"/",layout:"Layout", component: Home},
    {path:"/movie/:type",layout:"Layout", component: Movie},
    {path:"/detail/:idMovie",layout:"Layout", component: Detail},
    {path:"/search/:isSearch/:query",layout:"Layout", component: Search},
    {path:"/collections",layout:"Layout", component: Collections},
    {path:"/login/:type",layout:null, component: Login}
];