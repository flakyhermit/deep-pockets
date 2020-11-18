<template>
  <section>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Entry</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Amount">
          <b-input
            type="number"
            size="is-large"
            placeholder="Enter the amount"
            v-model="entryDetails.amount"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Category">
          <b-select placeholder="Category" required v-model="entryDetails.category">
            <option v-for="entry in categories" v-bind:key="entry" v-bind:value="entry">{{ entry }}</option>
          </b-select>
        </b-field>

        <b-field label="Note">
          <b-input type="textarea" placeholder="Add a note" v-model="entryDetails.note">
          </b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Close
        </button>
        <button class="button is-primary" @click="emitAddEntryEvent">
          ADD
        </button>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categories: Array
  },
  data() {
    return {
      entryDetails: {
        amount: 0,
        category: "",
        note: ""
      }
    };
  },
  methods: {
    emitAddEntryEvent: function () {
      this.$emit("add-entry-details", this.entryDetails);
    },
  },
};
</script>