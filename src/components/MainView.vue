<template>
  <div id="main-view">
    <ViewHeader></ViewHeader>
    <TabView></TabView>
 </div>
</template>

<script>
import ViewHeader from './ViewHeader.vue'
import TabView from './TabView.vue'

export default {
    name: 'MainView',
    components: {
	ViewHeader,
	TabView
    }
}
</script>

<style scoped>
#main-view {
    max-width: 900px;
}
</style>
