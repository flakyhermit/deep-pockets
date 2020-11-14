<!-- TabView.vue - For selections  -->
<template>
  <div id="tab-view">
    <div id="tab-1" class="tab" v-on:click="eventR"><h4>{{ tab1_title }}</h4></div>
    <div id="tab-2" class="tab"><h4>{{ tab2_title }}</h4></div>
  </div>
</template>

<script>
export default {
  name: 'TabView',
  data: () => {
    return {
	tab1_title: 'Summary',
	tab2_title: 'History'
    }
  }
}
</script>

<style scoped>
#tab-view {
    background-color: white;
    color: gray;
}
#tab-view-active {
    color: #3f4b73;
}
h5 {
}
</style>
