import RouterComponent from './Routercomponent';

export default [{
    path: '/',
    name: 'header',
    component: RouterComponent.Header,
    redirect: { name:"musicmaster" },
    children: [{
        path: "/mine",
        name: "mine",
        component: RouterComponent.Mine,
      },
      {
        path: "/musicmaster",
        name: "musicmaster",
        component: RouterComponent.Musicmaster,
      }]
    },
    {
        path: "/found",
        name: "found",
        component: RouterComponent.Found
      },
      {
        path:'/login',
        name:'login',
        component:RouterComponent.Login
      },
      {
        path: "/sheetList",
        name: "sheetList",
        component: RouterComponent.SheetList
      },
      {
        path: "/albumList",
        name: "albumList",
        component: RouterComponent.AlbumList
      },
      {
        path: "/singerList",
        name: "singerList",
        component: RouterComponent.SingerList
      },
      {
        path: "/play",
        name: "play",
        component: RouterComponent.Play
      },
]