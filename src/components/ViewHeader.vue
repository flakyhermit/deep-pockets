<!-- ViewHeader.vue - The main page header -->
<template>
  <div id="view-header">
    <div id="header-title">{{ title }}</div>
    <div>{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'ViewHeader',
  data: () => {
    return {
      title: 'Deep Pockets',
      description: 'Ridiculously simple expense-tracking for Gen-Z kids'
    }
  }
}
</script>

<style scoped>
#view-header {
    background-color: #3f4b73;
    padding: 10px 0 20px 0;
    color: white;
}
#header-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2px;
}
</style>
