import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from '@/views/page-not-found';
import Heroes from './views/heroes.vue';

Vue.use(Router);

const parseProps = r => ({ id: parseInt(r.params.id) });
const ParseToInt = route => ({ id: parseInt(route.params.id) });

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes',
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: Heroes,//eager loading
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      props: ParseToInt,
      component: () =>
        import(/* webpackChunkName: "bundle.heroes" */ './views/hero-detail.vue'),//lazy loading
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "bundle.about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
    // {
    //   path: 'heroes/*',
    //   component: PageNotFound,
    // }
  ],
});
