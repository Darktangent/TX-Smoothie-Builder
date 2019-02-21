<template>
  <div id="app">
   <Navbar />
 
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import AddSmoothie from '@/components/AddSmoothie'
export default {
  name: 'App',
  components:{
    Navbar,
    AddSmoothie
  }
}
</script>

<style>

</style>
