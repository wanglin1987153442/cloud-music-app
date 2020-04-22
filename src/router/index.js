import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import container from "../views/Container.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: container,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "music-list",
        name: "Dashboard",
        component: () => import("../views/MusicList.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "*",
    component: () => import("@/views/Page404.vue"),
    hidden: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
