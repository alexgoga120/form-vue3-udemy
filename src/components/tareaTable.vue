<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Categoria</th>
      <th scope="col">Estado</th>
      <th scope="col">Numero</th>
      <th scope="col">Acción</th>
    </tr>
    </thead>
    <tbody>
    <tr :key="tarea.id" v-for="tarea in tareas">
      <th scope="row">{{ tarea.id }}</th>
      <td>{{ tarea.nombre }}</td>
      <td>{{ tarea.categorias.join(', ') }}</td>
      <td>{{ tarea.estado }}</td>
      <td>{{ tarea.numero }}</td>
      <td>
        <button @click="deleteTareas(tarea.id)"
                class="btn btn-danger btn-sm">
          Eliminar
        </button>
        <router-link class="btn btn-warning btn-sm"
        :to="{
          name: 'Editar',
          params: {
            id: tarea.id
          }
        }">
          Editar
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "tareaTable",
  computed: {
    ...mapState(['tareas'])
  },
  methods: {
    ...mapActions(['deleteTareas'])
  }
}
</script>

<style scoped>

</style>