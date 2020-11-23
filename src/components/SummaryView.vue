<template>
  <div id="summary-view" class="container">
    <div id="summary-entry" class="notification is-primary is-light mb-2 px-5" v-for="(entry, index) in filteredSums" v-bind:key="index">
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
    <div v-if="filteredSums.length == 0" class="notification has-text-centered has-text-weight-medium is-success is-light">Wow, such empty!</div>
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
    },
    computed: {
      filteredSums: function() {
        let tempSums = []
        for (let sum of this.sums) {
          if (sum.amount > 0)
            tempSums.push(sum)
        }
        return tempSums
      }
    }
}
</script>

<style scoped>
#summary-view {
  max-width: 800px;
}
</style>
