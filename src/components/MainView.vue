<template>
  <div class="main-view">
    <div class="content-view">
    <!-- Add data modal -->
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal>
      <template #default="props">
        <modal-form
          v-bind:categories="categories"
          @add-entry-details="recordEntry"
          @add-category="addCategory"
          @close="props.close"
        ></modal-form>
      </template>
    </b-modal>
    <HeaderView></HeaderView>

    <b-tabs position="is-centered has-text-weight-semibold" animated>
      <b-tab-item label="OVERVIEW">
        <SummaryView :sums="netAmounts"></SummaryView>
      </b-tab-item>
      <b-tab-item label="HISTORY">
        <HistoryView :data="entries"
         @delete-entries="deleteEntries"
        ></HistoryView>
      </b-tab-item>
    </b-tabs>
    </div>
  <div class="button1"><b-button icon-left="file" class="button is-primary has-text-weight-medium" v-on:click="isComponentModalActive = !isComponentModalActive">ADD NEW ENTRY</b-button></div>
  </div>
</template>

<script>
import HeaderView from "./HeaderView.vue";
import SummaryView from "./SummaryView.vue";
import HistoryView from "./HistoryView.vue";
import ModalForm from "./AddModal.vue";

function Entry(amount, category, note) {
  this.timestamp = new Date().getTime()
  this.amount = amount;
  this.category = category;
  this.note = note;
}

export default {
  name: "MainView",
  components: {
    HeaderView,
    SummaryView,
    HistoryView,
    ModalForm,
  },
  data: function () {
    return {
      entries: [],
      categories: [],

      // Function altering variables
      isComponentModalActive: false,
    };
  },
  mounted: function() {
    let dataString = localStorage.getItem("deep-pockets-data")
    if (dataString)
      this.entries = JSON.parse(dataString)
    if (localStorage.deepPocketsCategories)
      this.categories = JSON.parse(localStorage.deepPocketsCategories).categories
  },
  watch: {
    entries: function () {
      let dataString = JSON.stringify(this.entries)
      localStorage.setItem("deep-pockets-data", dataString)
    },
    categories: function() {
      let categoryObject = { categories: this.categories }
      localStorage.deepPocketsCategories = JSON.stringify(categoryObject)
    }
  },
  computed: {
    netAmounts: function () {
      let netAmounts = [];
      for (let category of this.categories) {
        let curAmount = 0;
        for (let entry of this.entries) {
          if (entry.category == category) {
            curAmount = curAmount + entry.amount;
          }
        }
        let amountObj = {};
        amountObj["category"] = category;
        amountObj["amount"] = curAmount;
        netAmounts.push(amountObj);
      }
      return netAmounts;
    },
  },
  methods: {
    addEntry(entry) {
      // Validate category
      let entryObj = new Entry(Number(entry.amount), entry.category, entry.note);
      this.entries.push(entryObj)
    },
    addCategory(name) {
      this.categories.push(name);
    },
    deleteEntries(entries) {
      for (let entry of entries) {
        for (let i = 0; i < this.entries.length; i++) {
          if (entry.timestamp == this.entries[i].timestamp)
            this.entries.splice(i, 1)
        }
      }
    },
    // Event listener calls
    recordEntry(entryDetails) {
      console.log(entryDetails);
      this.isComponentModalActive = false;
      this.addEntry(entryDetails)
    },
  },
};
</script>

<style scoped>
.main-view {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}

.content-view {
}

.button1 {
  /* margin-bo: auto; */
  margin-bottom: 2%;
  align-self: center;
}
</style>
