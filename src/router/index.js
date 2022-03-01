import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      rutaProtegida: true
    }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/EditarView.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import('../views/IngresoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.meta.rutaProtegida){
    if(store.getters.usuarioAuth){
      next()
    }else {
      next('/ingreso')
    }
  }else{
    next()
  }
})
export default router
