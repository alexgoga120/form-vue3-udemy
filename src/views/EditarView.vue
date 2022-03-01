<template>

  <form @submit.prevent="updateTarea(tarea)">
    <form-input :tarea="tarea"></form-input>
  </form>

</template>

<script>
import {mapActions, mapState} from "vuex";
import FormInput from "@/components/FormInput";

export default {
  name: "EditarView",
  components: {FormInput},
  computed:{
    ...mapState(['tarea'])
  },
  methods:{
    ...mapActions(['setTarea','updateTarea'])
  },
  created() {
    this.setTarea(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>