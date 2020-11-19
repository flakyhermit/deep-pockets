<!-- HistoryView.vue - For event history  -->
<template>
  <div id="history-view" class="container">

    <b-table
      :data="data"
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
  },
  data() {
    return {
      stickyHeaders: true,
      checkedRows: [],
    };
  },
  methods: {
    deleteChecked() {
      this.$emit('delete-entries', this.checkedRows)
      this.checkedRows = []
    }
  }
};
</script>

<style scoped>
#history-view {
  max-width: 700px;
}
</style>