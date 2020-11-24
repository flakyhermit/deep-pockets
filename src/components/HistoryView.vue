<!-- HistoryView.vue - For event history  -->
<template>
  <div id="history-view" class="container">
    <div class="columns is-light is-gapless is-multiline">
      <b-field class="column is-one-third">
        <b-select icon="tag" placeholder="Category" v-model="selectedCategory" expanded 
            :disabled="!categories.length">
          <option
            v-for="category in categories"
            v-bind:key="category"
            v-bind:value="category"
          >
            {{ category }}
          </option>
        </b-select>
        <b-button @click="selectedCategory = null" :disabled="!selectedCategory" icon-left="times"></b-button>
      </b-field>
      <b-field class="column is-two-thirds">
      <b-datepicker
            placeholder="Select a date-range..."
            v-model="dateRange"
            range
            :mobile-native="false"
            expanded>
        </b-datepicker>
        <b-button @click="dateRange = null" :disabled="!dateRange" icon-left="times"></b-button>
      </b-field>
    </div>
    <b-table
      :data="filteredEntries"
      :mobile-cards="false"
      paginated
      per-page="9"
      scrollable
      hoverable
      :checked-rows.sync="checkedRows"
      :checkable="isCheckable"
      checkbox-position="left"
      pagination-position="bottom"
      default-sort-direction="asc"
    >
      <!-- <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
      </b-table-column> -->
      <b-table-column field="category" label="Category" v-slot="props">
        <span class="tag is-medium is-primary is-light has-text-weight-medium">
          {{ props.row.category }}
        </span>
      </b-table-column>
      <b-table-column field="timestamp" label="Date" v-slot="props" sortable>
        <span>
          {{ new Date(props.row.timestamp).toLocaleString() }}
        </span>
      </b-table-column>
      <b-table-column field="amount" label="Amount" v-slot="props" sortable>
        ₹
        <span class="is-size-5">
          {{ props.row.amount }}
        </span>
      </b-table-column>
      <template slot="bottom-left">
        <b-field grouped class="container is-1">
            <button
            class="button field"
            @click="isCheckable = !isCheckable"
          >
            <b-icon v-if="isCheckable" icon="check-double"></b-icon>
            <!-- <b-icon v-if="isCheckable" icon="times"></b-icon> -->
            <span>Select</span>
          </button>
          <button
            class="button field"
            @click="checkedRows = []"
            :disabled="!checkedRows.length"
          >
            <b-icon icon="times"></b-icon>
            <span>Clear</span>
          </button>
          <button
            class="button field is-danger"
            @click="deleteChecked"
            :disabled="!checkedRows.length"
          >
            <b-icon icon="trash-alt"></b-icon>
            <span>Delete</span>
          </button>
         
        </b-field>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "HistoryView",
  components: {},
  props: {
    data: Array,
  },
  data() {
    return {
      dateRange: null,
      checkedRows: [],
      isCheckable: false,
      selectedCategory: null
    };
  },
  computed: {
    categories: function () {
      let categories = []
      for (let entry of this.data) {
        if (categories.indexOf(entry.category) == -1) 
          categories.push(entry.category)
      }
      return categories
    },
    filteredEntries: function() {
      let filteredEntries = []
      for(let entry of this.data) {
        if (this.selectedCategory) {
          if (entry.category == this.selectedCategory) { // Category filter
            if (this.dateRange != null) {
              let timestampL = new Date(this.dateRange[0]).getTime()
              let timestampH = new Date(this.dateRange[1]).getTime()
              console.log(timestampH, ' ', timestampL)
              if (timestampL < entry.timestamp && entry.timestamp < timestampH)
                filteredEntries.push(entry)
            }
            else filteredEntries.push(entry)
          }
        }
        else if (this.dateRange != null) {
          let timestampL = new Date(this.dateRange[0]).getTime()
          let timestampH = new Date(this.dateRange[1]).getTime()
          console.log(timestampH, ' ', timestampL)
          if (timestampL < entry.timestamp && entry.timestamp < timestampH)
            filteredEntries.push(entry)
        }
        else filteredEntries.push(entry)
      }
      return filteredEntries
    }
  },
  methods: {
    deleteChecked() {
      this.$emit("delete-entries", this.checkedRows);
      this.checkedRows = [];
      this.$buefy.toast.open({
        message: `Entries deleted`,
        duration: 1000,
        position: "is-bottom",
        type: "is-success",
      });
    },
    clearFilters() {
      this.selectedCategory = null
      this.dateRange = null
    }
  },
};
</script>

<style scoped>
#history-view {
  max-width: 800px;
}
</style>