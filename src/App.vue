<template>
  <div id="app">
    <MainView></MainView>
  </div>
</template>

<script>
import MainView from './components/MainView.vue'

export default {
  name: 'App',
  components: {
      MainView
  }
}
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>
