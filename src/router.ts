import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Main from './views/Main.vue';
import Notifications from './views/Notifications.vue';
import Suggestions from './views/Suggestions.vue';
import Users from './views/Users.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Users',
      name: 'Users',
      component: Users
    },
    {
      path: '/Suggestions/*',
      name: 'Suggestions',
      component: Suggestions
    },
    {
      path: '/Notifications/',
      name: 'Notifications',
      component: Notifications
    }
  ]
});

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
//     },
//   ],
// });
