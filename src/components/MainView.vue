<template>
  <div id="main-view" class="has-navbar-fixed-bottom">
    <!-- Add data modal -->
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal>
      <template>
        <modal-form
          v-bind:categories="categories"
          @add-entry-details="recordEntry"
          @close="isComponentModalActive = false"
        ></modal-form>
      </template>
    </b-modal>
    
    <HeaderView v-on:add-entry-button-click="isComponentModalActive = !isComponentModalActive"></HeaderView>

    <b-tabs position="is-centered has-text-weight-semibold" animated>
      <b-tab-item label="OVERVIEW">
        <SummaryView :sums="netAmounts"></SummaryView>
      </b-tab-item>
      <b-tab-item label="TIMELINE">
        <HistoryView :data="entries"></HistoryView>
      </b-tab-item>
    </b-tabs>

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
      entries: [
        {
          timestamp: 1605590911586,
          amount: 446,
          category: "Food",
          note: "",
        },
        {
          timestamp: 1605590971486,
          amount: 200,
          category: "Entertainment",
          note: "",
        },
        {
          timestamp: 1605590914486,
          amount: 200,
          category: "Food",
          note: "",
        },
      ],
      categories: ["Food", "Entertainment", "Misc", "Recreation"],

      // Function altering variables
      isComponentModalActive: false,
    };
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
    // Helper functions
    letterCapitalize(word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    // Data functions
    saveData(data) {
      localStorage.setItem("deep-p-data", JSON.stringify(data));
    },
    addEntry(entry) {
      // Validate category
      let entryObj = new Entry(Number(entry.amount), entry.category, entry.note);
      this.entries.push(entryObj)
    },
    addCategory(name) {
      const capitalizedName = this.letterCapitalize(name);
      if (capitalizedName in this.categories) {
        return -1;
      }
      this.categories.push(capitalizedName);
    },
    removeCategory(name) {
      this.categories.splice(this.categories.indexOf(name), 1);
    },
    editCategory(curName, newName) {
      if (name in this.categories) this.categories.indexOf(curName);
      this.categories.push(newName); // Correct this
      // Keep the position of the category the same
    },
    fetchData() {
      var dataString = localStorage.getItem("deep-p-data");
      var dataObj = JSON.parse(dataString);
      return dataObj;
    },
    IdGenerator() {
      let idArray = [];
      let entry = 0;
      for (entry in this.entries) {
        idArray.push(entry.id);
      }
      if (idArray.length == 0) {
        return 1;
      }
      idArray = idArray.sort((a, b) => {
        return a - b;
      });
      for (let i = 0; i < idArray.length; i++) {
        if (idArray[i + 1] - idArray[i] >= 1) {
          return idArray[i] + 1;
        }
      }
      return idArray[length - 1] + 1;
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
</style>
