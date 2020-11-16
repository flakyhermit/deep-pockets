<!-- HistoryView.vue - For event history  -->
<template>
	<div id="history-view" class="container">
        <b-table 
            :data="data" :columns="columns" 
            :mobile-cards="false"
            sticky-header
            paginated
            per-page="6"
            pagination-position="bottom"
            default-sort-direction="asc"
            pagination-rounded></b-table>
	</div>
</template>

<script>
// class Entry {
//     Entry(amount, category=0, note='')  {
//         // this.id = 
//         this.timestamp = new Date()
//         this.amount = amount
//         this.category = category
//         this.note = note
//     }
//     getDate(id) {
//         return this.timestamp.toTimeString()
//     }
// }
export default {
    name: 'HistoryView',
    components: {

    },
    props: {
        dataSource: Array
    },
    data() {
        return {
            entries: [1, 2, 4, 5, 6, 7, 7, 3],
            categories: [],
            data: this.dataSource,
            stickyHeaders: true,
            columns: [
                {
                    field: 'category',
                    label: 'Category',
                },
                {
                    field: 'timestamp',
                    label: 'Date',
                    centered: true
                },
                {
                    field: 'amount',
                    label: 'Amount',
                }
            ]
        }
    },
    methods: {
    }
}
</script>