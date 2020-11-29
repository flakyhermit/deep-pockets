<template>
  <div class="main-view">
    <HeaderView></HeaderView>
    <div ref="contentView" class="content-view">
      <!-- Add data modal -->
      <b-modal
        v-model="isComponentModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template v-slot="props">
          <modal-form
            v-bind:categories="categories"
            @add-entry-details="recordEntry"
            @add-category="addCategory"
            @close="writeFlag = !writeFlag; props.close()"
          ></modal-form>
        </template>
      </b-modal>

      <b-modal
        v-model="isOptionsModalActive"
        has-modal-card
        trap-focus
        :destroy-on-hide="false"
        aria-role="dialog"
        aria-modal
      >
        <template #default="props">
          <options-form
            v-bind:categories="categories"
            @close="props.close"
            @rename-category="renameCategory"
            @delete-category="deleteCategoryEntries"
          ></options-form>
        </template>
      </b-modal>

      <b-tabs position="is-centered has-text-weight-semibold" animated>
        <b-tab-item label="SUMMARY">
          <SummaryView :entries="entries" :categories="categories"></SummaryView>
        </b-tab-item>
        <b-tab-item label="HISTORY">
          <HistoryView
            :view-height="viewHeight"
            :data="entries"
            @delete-entries="deleteEntries"
          ></HistoryView>
        </b-tab-item>
      </b-tabs>
    </div>
    <div class="buttons my-5 is-flex is-justify-content-center">
      <b-button
        icon-left="file"
        class="button is-primary mx-2"
        v-on:click="isComponentModalActive = !isComponentModalActive"
        >ADD NEW ENTRY</b-button
      >
      <b-button
        icon-left="cog"
        class="button"
        v-on:click="isOptionsModalActive = !isOptionsModalActive"
        >Options</b-button
      >
    </div>
  </div>
</template>

<script>
import HeaderView from "./HeaderView.vue";
import SummaryView from "./SummaryView.vue";
import HistoryView from "./HistoryView.vue";
import ModalForm from "./AddModal.vue";
import OptionsForm from "./OptionsForm.vue";

function Entry(amount, category, note) {
  this.timestamp = new Date().getTime();
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
    OptionsForm,
  },
  data: function () {
    return {
      entries: [],
      categories: [],
      // Function altering variables
      isComponentModalActive: false,
      isViewMounted: false,
      isOptionsModalActive: false,
      writeFlag: false
    };
  },
  mounted: function () {
    let dataString = localStorage.getItem("deep-pockets-data");
    if (dataString) this.entries = JSON.parse(dataString);
    this.isViewMounted = true;
  },
  watch: {
    entries: function () {
      let dataString = JSON.stringify(this.entries);
      localStorage.setItem("deep-pockets-data", dataString);

      let categories = []
      for (let entry of this.entries) {
        if (categories.indexOf(entry.category) == -1) 
          categories.push(entry.category)
      }
      this.categories = categories
    },
    writeFlag: function () {
      let dataString = JSON.stringify(this.entries);
      localStorage.setItem("deep-pockets-data", dataString);

      let categories = []
      for (let entry of this.entries) {
        if (categories.indexOf(entry.category) == -1) 
          categories.push(entry.category)
      }
      this.categories = categories
    }
  },
  computed: {
    viewHeight: function () {
      let height = 0;
      if (this.isViewMounted) {
        let el = this.$refs.contentView;
        height = el.clientHeight;
      }
      return height;
    },
  },
  methods: {
    addEntry(entry) {
      // Validate category
      let entryObj = new Entry(
        Number(entry.amount),
        entry.category,
        entry.note
      );
      this.entries.push(entryObj);
    },
    addCategory(name) {
      this.categories.push(name);
    },
    deleteEntries(entries) {
      for (let entry of entries) {
        for (let i = 0; i < this.entries.length; i++) {
          if (entry.timestamp == this.entries[i].timestamp)
            this.entries.splice(i, 1);
        }
      }
    },
    deleteCategoryEntries(category) {
      let newEntries = []
      for (let entry of this.entries) {
        if (entry.category != category) {
          newEntries.push(entry)
        }
      }
      this.entries = newEntries
    },
    // Event listener calls
    recordEntry(entryDetails) {
      // console.log(entryDetails);
      this.isComponentModalActive = false;
      this.addEntry(entryDetails);
    },
    renameCategory: function (oldName, newName) {
      console.log(oldName, newName)
      for (let entry of this.entries) {
        if (entry.category == oldName) 
          entry.category = newName[0].toUpperCase() + newName.slice(1)
      }
      this.writeFlag = !this.writeFlag
    }
  },
};
</script>

<style scoped>
.main-view {
  display: flex;
  height: 100vh;
  flex-direction: column;
}
.content-view {
  flex-grow: 1;
  overflow: auto;
}
.buttons {
  align-self: center;
}
</style>
