<template>
  <NavBar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
<script>
import NavBar from "@/components/NavBar";
import {mapActions} from "vuex";
export default {
  components: {NavBar},
  methods:{
    ...mapActions(['cargarLS'])
  },
  created() {
    this.cargarLS()
  }
}
</script>