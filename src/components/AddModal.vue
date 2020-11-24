<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5 has-text-weight-medium">
          New Entry
        </p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Amount">
          <b-input
            type="number"
            min="1"
            size="is-medium"
            placeholder="Enter the amount"
            v-model="entryDetails.amount"
            required
          >
          </b-input>
        </b-field>
        <b-field grouped group-multiline class="mb-5">
          <b-field label="Category">
            <b-select
              placeholder="Select a category"
              required
              v-model="entryDetails.category"
              :disabled="!categories.length"
              expanded
              icon="tag"
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
          <b-field label="Add category">
            <b-input
              placeholder="New category name"
              class="control"
              type="text"
              v-model="newCategory"
              min="1"
              max="20"
              expanded
            ></b-input>
            <b-button
              class="is-success"
              @click="emitAddCategory"
              icon-left="plus"
            ></b-button>
          </b-field>
        </b-field>

        <b-field label="Note">
          <b-input
            type="text"
            icon="sticky-note"
            maxlength="50"
            placeholder="Add an optional note"
            v-model="entryDetails.note"
          >
          </b-input>
        </b-field>
      </section>

      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          <b-icon icon="times"></b-icon>
          <span>Close</span>
        </button>
        <button class="button is-success">
          <b-icon icon="check"></b-icon>
          <span>ADD</span>
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
        amount: null,
        category: null,
        note: null,
      },
      newCategory: "",
    };
  },
  methods: {
    toastDo: function (message, type) {
      let typeAssign = type ? type : "is-dark";
      this.$buefy.toast.open({
        message: message,
        duration: 1000,
        position: "is-bottom",
        type: typeAssign,
      });
    },
    emitAddEntryEvent: function () {
      this.$emit("add-entry-details", this.entryDetails);
      this.entryDetails.amount = null;
      this.entryDetails.category = null;
      this.entryDetails.note = null;
      this.toastDo("Entry added", "is-success");
    },
    // Helper functions
    letterCapitalize: function (word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    emitAddCategory: function () {
      let capitalizedName = this.letterCapitalize(this.newCategory);
      if (this.categories.indexOf(capitalizedName) != -1) {
        this.toastDo(`Category already exists!`);
      } else {
        this.$emit("add-category", this.newCategory);
        this.newCategory = "";
        this.toastDo("Category added", "is-success");
      }
    },
  },
};
</script>