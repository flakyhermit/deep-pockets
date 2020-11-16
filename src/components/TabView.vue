<!-- TabView.vue - For selections  -->
<template>
	<section>
		<b-tabs position="is-centered has-text-weight-semibold" animated>
			<b-tab-item label="OVERVIEW">
				<SummaryView></SummaryView>
			</b-tab-item>
			<b-tab-item label="TIMELINE">
				<HistoryView :dataSource="entries"></HistoryView>
			</b-tab-item>
			<!-- <b-tab-item label="OPTIONS">
				<ConfigView></ConfigView>
			</b-tab-item> -->
			<DataView></DataView>
		</b-tabs>
	</section>
</template>
	
<script>
import SummaryView from './SummaryView.vue'
import HistoryView from './HistoryView.vue'
import DataView from './DataView.vue'
import Data from '../assets/data.json'

export default {
	name: 'TabView',
	data: () => {
		return {
			entries: Data.entries
		}
	},
	components: {
		SummaryView,
		HistoryView,
		DataView
	},
	methods: {
		printData: () => {
			console.log(this.Data)
		}
	}
}
</script>

<style scoped>
</style>
