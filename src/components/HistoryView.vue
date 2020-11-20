<!-- HistoryView.vue - For event history  -->
<template>
  <div id="history-view" class="container">
    <b-field class="notification is-light py-2 px-2">
      <b-select icon="tag" placeholder="Filter by category" v-model="selectedCategory">
        <option value="" class="is-color-grey">-</option>
        <option
          v-for="category in categories"
          v-bind:key="category"
          v-bind:value="category"
        >
          {{ category }}
        </option>
      </b-select>
      <b-datepicker
            placeholder="Select a date-range..."
            range>
        </b-datepicker>
        <b-button @click="clearFilters" icon-left="times has-align-items-right">Clear All</b-button>
    </b-field>
    <b-table
      :data="filteredEntries"
      :mobile-cards="false"
      paginated
      per-page="9"
      scrollable
      bordered
      hoverable
      :checked-rows.sync="checkedRows"
      checkable
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
        <b-field grouped class="container">
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
    categories: Array,
  },
  data() {
    return {
      dateRange: [],
      checkedRows: [],
      selectedCategory: ''
    };
  },
  computed: {
    filteredEntries: function() {
      let filteredEntries = []
      if (this.selectedCategory.length) {
        for(let entry of this.data) {
          if (entry.category == this.selectedCategory)
            filteredEntries.push(entry)
        }
      }
      else filteredEntries = this.data
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
      this.selectedCategory = ''
    }
  },
};
</script>

<style scoped>
#history-view {
  max-width: 700px;
}
</style>