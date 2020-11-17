<!-- HistoryView.vue - For event history  -->
<template>
  <div id="history-view" class="container">
    <b-table
      :data="entries"
      :mobile-cards="false"
      paginated
      per-page="9"
      scrollable
      hoverable
      pagination-position="bottom"
      default-sort-direction="asc"
    >
      <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column field="category" label="Category" v-slot="props">
        <span class="tag is-medium is-primary is-light has-text-weight-medium">
          {{ props.row.category }}
        </span>
      </b-table-column>
      <b-table-column field="date" label="Date" v-slot="props">
        <span>
          {{ new Date(props.row.timestamp).toLocaleString() }}
        </span>
      </b-table-column>
      <b-table-column field="amount" label="Amount" v-slot="props">
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