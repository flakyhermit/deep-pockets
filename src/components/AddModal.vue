<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-weight-medium">New Entry</p>
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

            <b-button
              @click="promptCategory"
              icon-left="plus"
              >Add Category</b-button
            >
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
// import AddCategory from "./AddCategory.vue";
import Toasts from "./Toasts.vue";

export default {
  props: {
    categories: Array,
  },
  mixins: [Toasts],
  components: {
    // AddCategory,
  },
  data() {
    return {
      entryDetails: {
        amount: null,
        category: null,
        note: null,
      },
    };
  },
  methods: {
    emitAddEntryEvent: function () {
      this.$emit("add-entry-details", this.entryDetails);
      this.entryDetails.amount = null;
      this.entryDetails.category = null;
      this.entryDetails.note = null;
      this.toastDo("Entry added", "is-success");
    },
    letterCapitalize: function (word) {
      return word[0].toUpperCase() + word.slice(1);
    },
    emitAddCategory: function (newCategory) {
      if (newCategory == null) {
        return false;
      }
      let capitalizedName = this.letterCapitalize(newCategory);
      if (this.categories.indexOf(capitalizedName) != -1) {
        this.toastDo(`Category already exists!`);
        return false;
      } else {
        this.$emit("add-category", capitalizedName);
        this.newCategory = null;
        this.toastDo("Category added", "is-success");
        return true;
      }
    },
    promptCategory() {
      this.$buefy.dialog.prompt({
        message: "Enter a new category name",
        inputAttrs: {
          type: "text",
          placeholder: "Category name.",
          value: "",
        },
        confirmText: "ADD",
        trapFocus: true,
        closeOnConfirm: false,
        onConfirm: (value, { close }) => {
          if (this.emitAddCategory(value)) close();
        },
      });
    },
  },
};
</script>
