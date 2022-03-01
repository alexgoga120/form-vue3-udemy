<template>
  <h1 class="my-5">Ingreso de usuarios</h1>
  <form @submit.prevent="sendForm"
        class="form-group">
    <input type="email"
           v-model.trim="email"
           class="form-control my-2"
           placeholder="example@example.com">
    <input type="password"
           v-model="pass"
           class="form-control my-2"
           placeholder="********">
    <button class="btn btn-primary btn-block"
            type="submit"
            :disabled="isFormFull"
    >Ingresar</button>
  </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "RegistroView",
  data(){
    return {
      email: '',
      pass: '',
    }
  },
  methods:{
    ...mapActions(['ingresoUsuario']),
    sendForm(){
      this.ingresoUsuario({email:this.email, password: this.pass})
      this.email = ''
      this.pass = ''
    }
  },
  computed:{
    isFormFull(){
      if (!this.email.includes('@')){
        return true
      }
      if(this.pass.length > 5 ){
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>