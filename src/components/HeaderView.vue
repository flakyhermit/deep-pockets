<!-- ViewHeader.vue - The main page header -->
<template>
  <!-- <div id="view-header" class="container has-text-centered my-4">
    <div id="header-title" class="has-text-primary is-size-4 has-text-weight-bold">{{ title }}</div>
    <div id="header-description" class="has-text-grey">{{ description }}</div>
  </div> -->
  <div class="px-5 py-5 is-flex is-justify-content-space-evenly">
    <div class="has-text-primary is-flex-grow-1 has-text-weight-bold is-size-4 mr-5">{{ title }}</div>
    <div class="has-color-grey is-size-6">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "HeaderView",
  components: {},
  data: () => {
    return {
      title: "Deep Pockets",
      description: "Ridiculously simple expense tracking for Gen-Z kids",
    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
