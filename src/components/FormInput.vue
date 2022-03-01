<template>

  <input type="text"
         class="form-control my-2"
         placeholder="Ingrese nombre"
         v-model.trim="tarea.nombre">
  <div class="form-check form-check-inline">
    <input id="check-1"
           type="checkbox"
           class="form-check-input"
           v-model="tarea.categorias"
           value="javascript">
    <label for="check-1" class="form-check-label">JavaScript</label>
  </div>
  <div class="form-check form-check-inline">
    <input id="check-2"
           type="checkbox"
           class="form-check-input"
           v-model="tarea.categorias"
           value="node js">
    <label for="check-2" class="form-check-label">Node.js</label>
  </div>

  <div class="mt-2">
    <div class="custom-control custom-radio custom-control-inline">
      <input id="radio-1"
             type="radio"
             class="custom-control-input"
             v-model="tarea.estado"
             value="urgente">
      <label class="custom-control-label" for="radio-1">Urgente</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input id="radio-2"
             type="radio"
             class="custom-control-input"
             v-model="tarea.estado"
             value="relax">
      <label class="custom-control-label" for="radio-2">Relax</label>
    </div>
  </div>

  <div class="mt-2">
    <input id=""
           type="number"
           class="form-control"
           v-model.number="tarea.numero">
  </div>

  <button type="submit"
          class="btn btn-dark btn-block"
          :disabled="checkForm">Procesar
  </button>
</template>

<script>
export default {
  name: "formInput",
  props:{
    tarea: Object
  },

  computed:{
    checkForm(){
      return this.tarea.nombre ? false : true
    }
  }
}
</script>

<style scoped>

</style>