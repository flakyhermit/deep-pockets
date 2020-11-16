<template>
  <div id="summary-view" class="container">
    <div class="notification is-primary is-light summary-entry" v-for="(entry, index) in entries" v-bind:key="index">
      <div class="level is-mobile">
        <div class="level-left has-text-weight-semibold">
          {{ entry }}
        </div>
        <div class="level-right">
          {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SummaryView',
    components: {
    },
    data: () =>  { return { entries: ['Entertainment', 'Food & Beverages', 'Transporation', 'Recreation', 'Misc'] } }
}
</script>

<style scoped>
#summary-view {
  max-width: 800px;
}
.summary-entry{
  margin: 5px;
}
</style>
