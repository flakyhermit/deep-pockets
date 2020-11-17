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
            v-model="amount"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Category">
          <b-select placeholder="Category" required
            v-model="category">
            <option value="flint">Entertainment</option>
            <option value="silver">Food</option>
            <option value="silver">Beverage</option>
          </b-select>
        </b-field>

        <b-field label="Note">
          <b-input type="textarea" placeholder="Add a note"
            v-model="note">
          </b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Close
        </button>
        <button
          class="button is-primary"
          @click="emitAddEntryEvent"
        >
          ADD
        </button>
      </footer>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      amount: 0,
      category: "",
      note: "",
    };
  },
  methods: {
    emitAddEntryEvent: function() {
      this.$emit('add-entry-details', this.amount, this.category)
    }
  }
};
</script>