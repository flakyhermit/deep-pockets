<template>
  <div id="summary-view" class="container">
    <div class="notification is-primary is-light summary-entry" v-for="(categoryAmount, index) in netAmounts" v-bind:key="index">
      <div class="level is-mobile">
        <div class="level-left has-text-weight-semibold">
          {{ categoryAmount.category }}
        </div>
        <div class="level-right">
          {{ categoryAmount.amount }}
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
    props: {
      netAmounts: Array
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
