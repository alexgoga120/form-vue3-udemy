<template>
<h1 class="my-5">Registro de usuarios</h1>
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
    <input type="password"
           v-model="passConfirm"
           class="form-control my-2"
           placeholder="********">
    <button class="btn btn-primary btn-block"
            type="submit"
            :disabled="isFormFull"
    >Registrar</button>
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
      passConfirm: '',
    }
  },
  methods:{
    ...mapActions(['registrarUsuario']),
    sendForm(){
      this.registrarUsuario({email:this.email, password: this.pass})
      this.email = ''
      this.pass = ''
      this.passConfirm = ''
    }
  },
  computed:{
    isFormFull(){
      if (!this.email.includes('@')){
        return true
      }
      if(this.pass.length > 5 && this.pass === this.passConfirm){
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>