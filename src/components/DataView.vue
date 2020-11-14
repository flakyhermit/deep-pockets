<template>
  <div id="data-view">
  </div>
</template>

<script>
import SummaryView from './SummaryView.vue'

function ExpenseEntry(timestamp, amount, categoryId, note='') {
    this.timestamp = timestamp
    this.amount = amount
    this.category = getCategory(categoryId)
    this.note = note
}

export default {
    name: 'DataView',
    components: {
	SummaryView
    },
    data: () => {
	return {
	    entries: []
	}
    },
    methods: {
	addNewEntry: (amount, categoryId, note='') => {
	    // var timestamp = 
	    var entry = new ExpenseEntry(timestamp, amount, categoryId, note)
	    entries.push(entry)
	},
	removeEntry: (id) => {
	}
}
</script>

<style scoped>
</style>
