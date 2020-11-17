<!-- ViewHeader.vue - The main page header -->
<template>
  <!-- <div id="view-header" class="container has-text-centered my-4">
    <div id="header-title" class="has-text-primary is-size-4 has-text-weight-bold">{{ title }}</div>
    <div id="header-description" class="has-text-grey">{{ description }}</div>
  </div> -->
  <div>
    <b-navbar
      fixed-top
      transparent
      centered
      spaced
      active
      :mobile-burger="false">
      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <button disabled class="button is-d">Options</button>
            <button
              v-on:click="entryButtonClick"
              class="button is-primary">
              ADD NEW ENTRY
            </button>
          </div>
        </b-navbar-item>
      </template>
      <template slot="brand">
        <b-navbar-item tag="div">
          <div class="is-size-4 has-text-primary has-text-weight-bold">
            Deep Pockets
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "HeaderView",
  components: {},
  data: () => {
    return {
      title: "Deep Pockets",
      description: "Ridiculously simple expense-tracking for Gen-Z kids",
    };
  },
  methods: {
    entryButtonClick: function() {
      this.$emit('add-entry-button-click')
    }
  }
};
</script>

<style scoped>
</style>
