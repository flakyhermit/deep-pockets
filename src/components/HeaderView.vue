<!-- ViewHeader.vue - The main page header -->
<template>
  <!-- <div id="view-header" class="container has-text-centered my-4">
    <div id="header-title" class="has-text-primary is-size-4 has-text-weight-bold">{{ title }}</div>
    <div id="header-description" class="has-text-grey">{{ description }}</div>
  </div> -->
  <div class="is-flex m-3">
    <div class="is-flex-grow-1 has-text-centered has-text-primary is-size-4"><b>{{ title }}</b></div>
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
