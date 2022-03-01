<template>
  <h1 class="title">Formulario con Vue.js</h1>
  <form @submit.prevent="pForm">
    <form-input :tarea="tarea"></form-input>
  </form>
  <hr>
  <tarea-table></tarea-table>

</template>

<script>
import formInput from "@/components/FormInput";
import tareaTable from "@/components/tareaTable";
import {mapActions} from 'vuex'

const shortid = require('shortid');

export default {
  name: 'homeView',
  components: {formInput, tareaTable},
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: ''
      }
    }
  },

  methods: {
    ...mapActions(['setTareas','cargarLS']),
    pForm() {
      if (this.tarea.nombre.trim() === '') {
        console.log('Campo vacio')
        return
      } else console.log('No esta vacio')

      this.tarea.id = shortid.generate()

      this.setTareas(this.tarea)


      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: ''
      }
    }
  },
  created() {
    this.cargarLS()
  }
}

</script>
