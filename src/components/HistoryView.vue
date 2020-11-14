<!-- HistoryView.vue - For event history  -->
<template>
	<div id="history-view" class="container">
        <div class="container is-size-small mb-1" v-for="(entry, index) in entries" v-bind:key="index">
            <b-button class="py-5" expanded>Inverted</b-button>
        </div>
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
    data: () => {
        return {
            entries: [1, 2, 4, 5, 6, 7, 7, 3],
            categories: []
        }
    },
    computed: {
        
    }
}
</script>