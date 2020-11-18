<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Entry</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Amount">
          <b-input
            type="number"
            min="1"
            size="is-medium"
            placeholder="Enter the amount"
            icon="credit-card"
            v-model="entryDetails.amount"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Category">
          <b-select
            placeholder="Category"
            icon="tag"
            v-model="entryDetails.category"
            required
          >
            <option
              v-for="entry in categories"
              v-bind:key="entry"
              v-bind:value="entry"
            >
              {{ entry }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Note">
          <b-input
            type="text"
            icon="sticky-note"
            maxlength="50"
            placeholder="Add a note"
            v-model="entryDetails.note"
          >
          </b-input>
        </b-field>

      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Close
        </button>
        <button class="button is-success" >
          ADD
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    categories: Array,
  },
  data() {
    return {
      entryDetails: {
        amount: "",
        category: "",
        note: "",
      },
    };
  },
  methods: {
    emitAddEntryEvent: function () {
      this.$emit("add-entry-details", this.entryDetails);
      this.entryDetails.amount = ""
      this.entryDetails.category = ""
      this.entryDetails.note = ""
    },
  },
};
</script>