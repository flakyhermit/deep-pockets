<!-- ViewHeader.vue - The main page header -->
<template>
  <div id="view-header" class="container has-text-centered my-4">
    <div id="header-title" class="has-text-primary is-size-4 has-text-weight-bold">{{ title }}</div>
    <div id="header-description" class="has-text-grey">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  data: () => {
    return {
      title: 'Deep Pockets',
      description: 'Ridiculously simple expense-tracking for Gen-Z kids'
    }
  }
}
</script>

<style scoped>

</style>
