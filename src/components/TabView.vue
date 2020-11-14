<!-- TabView.vue - For selections  -->
<template>
	<section>
		<b-tabs position="is-centered has-text-weight-semibold" animated>
		<b-tab-item label="OVERVIEW">
			<SummaryView></SummaryView>
		</b-tab-item>
		<b-tab-item label="TIMELINE">
			<HistoryView></HistoryView>
		</b-tab-item>
		<b-tab-item label="OPTIONS">
			<!-- <ConfigView></ConfigView> -->
		</b-tab-item>
		</b-tabs> 
	</section>
</template>

<script>
import SummaryView from './SummaryView.vue'
import HistoryView from './HistoryView.vue'
export default {
	name: 'TabView',
	data: () => {
		return {
		}
	},
	components: {
		SummaryView,
		HistoryView
	},
	methods: {
	}
}
</script>

<style scoped>
</style>
