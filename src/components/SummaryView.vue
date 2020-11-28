<template>
  <div id="summary-view" class="container">
    <div
      class="mb-2 buttons is-flex is-justify-content-center is-flex-wrap-wrap"
    >
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[0] }"
        @click="tagClick(0)"
      >
        Forever
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[1] }"
        @click="tagClick(1)"
      >
        Today
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[2] }"
        @click="tagClick(2)"
      >
        Yesterday
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[3] }"
        @click="tagClick(3)"
      >
        This week
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[4] }"
        @click="tagClick(4)"
      >
        This month
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[5] }"
        @click="tagClick(5)"
      >
        Last month
      </div>
      <div
        class="button is-small is-rounded has-text-weight-medium"
        v-bind:class="{ 'is-primary': tagObj[2] }"
        @click="isDatePickerVisible = !isDatePickerVisible"
      >
        Custom range
      </div>
    </div>
    <div
      class="field is-flex is-justify-content-center"
      v-if="isDatePickerVisible"
    >
      <b-datepicker
        placeholder="Select a date-range..."
        v-model="dateRange"
        range
        :mobile-native="false"
        expanded
      >
      </b-datepicker>
    </div>
    <!-- Filter -->
    <!-- <b-field class="columns" grouped group-multiline>
    
    <b-tag-taglist class="tags column has-text-weight-medium">
        <b-tag class="is-primary">This month</b-tag>
        <b-tag class="is-red is-light">Last month</b-tag>
        <b-tag>This week</b-tag>
        <b-tag>Today</b-tag>
        <b-tag>Custom range</b-tag>
    </b-tag-taglist>
    </b-field> -->
    <div
      id="summary-entry"
      class="notification is-primary is-light mb-2 px-5"
      v-for="(entry, index) in sortedSums"
      v-bind:key="index"
    >
      <div class="level is-mobile">
        <div class="level-left has-text-weight-medium is-size-5">
          {{ entry.category }}
        </div>
        <div class="level-right has-text-primary">
          <span class="has-text-weight-semibold is-size-5">₹</span>
          <span class="has-text-weight-semibold is-size-4">
            {{ entry.amount }}</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="sortedSums.length == 0"
      class="notification has-text-centered has-text-weight-medium is-success is-light"
    >
      Wow, such empty!
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryView",
  components: {},
  props: {
    sums: Array,
  },
  data: () => {
    return {
      isDatePickerVisible: false,
      dateRange: [],
      tagObj: { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    };
  },
  computed: {
    sortedSums: function () {
      let tempSums = [];
      for (let sum of this.sums) {
        if (sum.amount > 0) tempSums.push(sum);
      }
      tempSums.sort(function (a, b) {
        return b.amount - a.amount;
      });
      return tempSums;
    },
  },
  methods: {
    tagClick(id) {
      this.isDatePickerVisible = false;
      this.tagObj[id] = true;
      for (let el in this.tagObj) {
        if (el != id) this.tagObj[el] = false;
      }
    },
  },
};
</script>

<style scoped>
#summary-view {
  max-width: 800px;
}
</style>
