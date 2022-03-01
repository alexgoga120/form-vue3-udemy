<template>
  <div class="navbar navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">
      Formularios
    </router-link>
    <div class="d-flex">
      <router-link to="/"
                   class="btn btn-dark"
                   v-if="usuarioAuth">
        Tareas
      </router-link>
      <router-link to="/ingreso"
                   class="btn btn-dark"
                   v-if="!usuarioAuth">
        Ingresar
      </router-link>
      <router-link to="/registro"
                   class="btn btn-dark"
                   v-if="!usuarioAuth">
        Registrar
      </router-link>
      <button v-if="usuarioAuth"
              @click="cerrarSesion"
      class="btn btn-danger">
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed:{
    ...mapGetters(['usuarioAuth'])
  },
  methods:{
    ...mapActions(['cerrarSesion'])
  }
}
</script>


<style>

</style>