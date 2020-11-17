<template>
  <div id="summary-view" class="container">
    <div id="summary-entry" class="box is-primary is-light mb-2 px-5" v-for="(entry, index) in sums" v-bind:key="index">
      <div class="level is-mobile">
        <div class="level-left  has-text-weight-medium is-size-5">
          {{ entry.category }}
        </div>
        <div class="level-right has-text-primary">
          <span class="has-text-weight-semibold is-size-5">₹</span>
          <span class="has-text-weight-semibold is-size-4"> {{ entry.amount }}</span>
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
      sums: Array
    },
    data: () =>  { 
      return { 
        } 
    }
}
</script>

<style scoped>
#summary-view {
  max-width: 700px;
}
</style>
