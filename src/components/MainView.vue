<template>
  <div id="main-view" v-on:input="selectTab($event)">
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
    TabView,
    },
    data: () => {
         return {
            currentTab: 0
        }
    },
    methods: {
        selectTab: () => {
            this.currentTab = 3
        }
    }
}
</script>

<style scoped>
</style>
