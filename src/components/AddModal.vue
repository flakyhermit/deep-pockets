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
        <b-field grouped >
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
          <b-field label="Add category">
          <b-input type="text" v-model="newCategory" min="1" max="20"></b-input>
          <b-button class="is-success" @click="emitAddCategory"><strong>+</strong></b-button>
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
          Close
        </button>
        <button class="button is-success">ADD</button>
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
      this.entryDetails.amount = "";
      this.entryDetails.category = "";
      this.entryDetails.note = "";
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