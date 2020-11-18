<!-- HistoryView.vue - For event history  -->
<template>
  <div id="history-view" class="container">
    <b-table
      :data="entries"
      :mobile-cards="false"
      paginated
      per-page="9"
      scrollable
      bordered
      hoverable
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
      entries: this.data,
    };
  },
  computed: {
    dressedData: () => {},
  },
};
</script>

<style scoped>
#history-view {
  max-width: 700px;
}
</style>