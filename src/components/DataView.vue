<!-- DataView.vue - For selections  -->
<template>
	<section>
		<b-tabs position="is-centered has-text-weight-semibold" animated>
			<b-tab-item label="OVERVIEW">
				<SummaryView :sums="netAmounts"></SummaryView>
                <!-- <b-input v-model="categoryInput"></b-input>
                <b-button @click="addCategory(categoryInput)">Add category</b-button> -->
			</b-tab-item>
			<b-tab-item label="TIMELINE">
				<HistoryView :data="entries"></HistoryView>
			</b-tab-item>
			<!-- <b-tab-item label="OPTIONS">
				<ConfigView></ConfigView>
			</b-tab-item> -->
		</b-tabs>
	</section>
</template>
	
<script>
import SummaryView from './SummaryView.vue'
import HistoryView from './HistoryView.vue'

function Entry(id, amount, category, note)  {
    this.id = id
    this.timestamp = new Date()
    this.amount = amount
    this.category = category
    this.note = note
}

export default {
	name: 'DataView',
	components: {
		SummaryView,
		HistoryView,
	},
	data: () => {
		return {
            categoryInput: '',
            entries: [ 
                { id: 1, timestamp: 1605590911586, amount: 446, category: 'Food', note: ''},
                { id: 2, timestamp: 1605590971486, amount: 200, category: 'Entertainment', note: ''},
                { id: 3, timestamp: 1605590914486, amount: 200, category: 'Food', note: ''},
                { id: 4, timestamp: 1605540916486, amount: 200, category: 'Entertainment', note: ''},
                { id: 5, timestamp: 1605590951486, amount: 233, category: 'Misc', note: ''},
                { id: 6, timestamp: 1605520911486, amount: 200, category: 'Food', note: ''},
                { id: 7, timestamp: 1605590911486, amount: 200, category: 'Food', note: ''},
                { id: 8, timestamp: 1605594811486, amount: 200, category: 'Recreation', note: ''},
                { id: 9, timestamp: 1605590993486, amount: 200, category: 'Recreation', note: ''},
                { id: 10, timestamp: 1605590941486, amount: 200, category: 'Entertainment', note: ''}
            ],
            categories: ['Food', 'Entertainment', 'Misc','Recreation']
        }
	},
	computed: {
        netAmounts: function() {
            let netAmounts = []
            for(let category of this.categories) {
                let curAmount = 0
                for(let entry of this.entries) {
                    if(entry.category == category) {
                        curAmount = curAmount + entry.amount
                    }
                }
                let amountObj = {}
                amountObj['category'] = category
                amountObj['amount'] = curAmount
                netAmounts.push(amountObj)
            }
            return netAmounts
        }
    },
	methods: { 
        // Helper functions
        letterCapitalize(word) {
            return (word[0].toUpperCase() + word.slice(1))
        },
        // Data functions
		saveData(data) {
            localStorage.setItem("deep-p-data", JSON.stringify(data))
        },
        addEntry(event) {
            console.log('HOORAY!')
            localStorage.setItem("test-item-A", "HOOOOOOOOORAY!")
            this.entries.push('NEW EMTRY')
            console.log(event)
            // id = this.IdGenerator()
            // Validate category
            let id, amount, category, note // TODO: Fix this
            let entryObj = new Entry(id, amount, category, note)
            return entryObj
        },
        addCategory(name) {
            const capitalizedName = this.letterCapitalize(name)
            if(capitalizedName in this.categories) {
                return -1
            }
            this.categories.push(capitalizedName)
        },
        removeCategory(name) {
            this.categories.splice(this.categories.indexOf(name), 1)
        },
        editCategory(curName, newName) {
            if(name in this.categories)
                this.categories.indexOf(curName)
                this.categories.push(newName) // Correct this
                // Keep the position of the category the same
        },
        fetchData() {
            var dataString = localStorage.getItem("deep-p-data")
            var dataObj = JSON.parse(dataString)
            return dataObj
        },
        IdGenerator() {
            let idArray = []
            let entry = 0
            for (entry in this.entries) {
                idArray.push(entry.id)
            }
            if(idArray.length == 0) {
                return 1
            }
            idArray = idArray.sort((a, b) => { return a-b })
            for (let i = 0; i < idArray.length; i++) {
                if((idArray[i+1] - idArray[i]) >= 1) {
                    return idArray[i] + 1
                }
            }    
            return idArray[length-1] + 1
        }
	}
}
</script>

<style scoped>
</style>
