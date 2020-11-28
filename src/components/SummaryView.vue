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
        v-bind:class="{ 'is-primary': tagObj[6] && datePickerRange }"
        @click="isDatePickerVisible = true; tagClick(6);"
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
        v-model="datePickerRange"
        range
        :mobile-native="false"
        expanded
      >
      </b-datepicker>
    </div>
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
    entries: Array,
    categories: Array,
  },
  data: () => {
    return {
      isDatePickerVisible: false,
      activeTag: 0,
      trigger: false,
      curTimestamp: new Date(),
      datePickerRange: [],
      tagObj: { 0: true, 1: false, 2: false, 3: false, 4: false, 5: false },
    };
  },
  watch: {
    entries: function () {
      this.curTimestamp = new Date()
    }
  },
  computed: {
    sums: function () {
      let sums = [];
      for (let category of this.categories) {
        let curAmount = 0;
        for (let entry of this.filteredEntries) {
          if (entry.category == category) {
            curAmount = curAmount + entry.amount;
          }
        }
        let amountObj = {};
        amountObj["category"] = category;
        amountObj["amount"] = curAmount;
        sums.push(amountObj);
      }
      return sums;
    },
    dateRange: function () {
      let dateRange = [];
      let curDate = this.curTimestamp
      switch (this.activeTag) {
        case 0:
          // Forever
          dateRange[0] = new Date(0);
          dateRange[1] = curDate;
          break;
        case 1:
          // Today
          dateRange[0] = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            curDate.getDate()
          );
          dateRange[1] = curDate;
          break;
        case 2:
          // Yesterday
          dateRange[0] = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            curDate.getDate() - 1
          );
          dateRange[1] = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            curDate.getDate()
          );
          break;
        case 3:
          // This week
          dateRange[0] = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            curDate.getDate() - curDate.getDay()
          );
          dateRange[1] = curDate;
          break;
        case 4:
          // This month
          dateRange[0] = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
          dateRange[1] = curDate;
          break;
        case 5:
          // Last month
          dateRange[0] = new Date(
            curDate.getFullYear(),
            curDate.getMonth() - 1,
            1
          );
          dateRange[1] = new Date(curDate.getFullYear(), curDate.getMonth(), 0);
          break;
        case 6:
          if(this.datePickerRange.length) {
            dateRange[0] = new Date(this.datePickerRange[0]);
            dateRange[1] = new Date(this.datePickerRange[1].getTime() + (1000 * 60 * 60 * 24));
          }
          else dateRange = this.datePickerRange
          break;
      }
      return dateRange;
    },
    filteredEntries: function () {
      let filteredEntries = []
      for (let i = 0; i < this.entries.length; i++) {
        let entryDate = new Date(this.entries[i].timestamp)
        if (this.dateRange[0] <= entryDate && entryDate < this.dateRange[1])
          filteredEntries.push(this.entries[i])
      }
      return filteredEntries
    },
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
      this.curTimestamp = new Date()
      if (id != 6)
        this.isDatePickerVisible = false;
      this.activeTag = id;
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
