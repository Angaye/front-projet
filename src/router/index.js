import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Detail from "../views/Detail.vue";
import Favorites from "../views/Favorites.vue";
import Profile from "../views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  },
  {
  path: "/detail/:id",
  name: "Detail",
  component: Detail
},
{
  path: "/favorites",
  name: "Favorites",
  component: Favorites
},
{
  path: "/profile",
  name: "Profile",
  component: Profile
}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;