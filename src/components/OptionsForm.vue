<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5 has-text-weight-medium">Options</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Import/Export">
          <p class="content has-text-grey is-size-6">
            To save your data permanently you can export it, and import it back
            if you lose it.
          </p>
        </b-field>
        <div class="buttons">
          <b-button class="is-primary">Export</b-button>
          <b-button class="button">Import</b-button>
        </div>
        <b-field label="Manage categories">
          <p class="content has-text-grey is-size-6">
            Rename or delete category names.
            <br />
            <span class="has-text-danger has-text-weight-semibold">Note</span>:
            These operations change the entries themselves. Deleting a category
            will delete all the entries with that category. Renaming will rename
            the category in the past entries.
          </p>
        </b-field>
        <b-field grouped group-multiline>
          <b-select class="control"
            placeholder="Select a category"
            required
            :disabled="!categories.length"
            v-model="selectedCategory"
            @input="clearOps"
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
          <b-field v-if="isRename && selectedCategory">
            <b-input
              placeholder="New name"
              v-model="newCategoryName"
              expanded
            >
            </b-input>
            <b-button
              class="is-success"
              icon-left="check"
              @click="
                isRename = false;
                emitRenameCategory();
              "
              ></b-button> 
              <b-button
              @click="clearOps"
              icon-left="times"
              ></b-button>
          </b-field>
          <p class="buttons control">
            <b-button
              :disabled="!selectedCategory"
              v-if="!isRename"
              class="is-warning"
              icon-left="pen"
              @click="isRename = true"
            >Rename</b-button>
            <b-button
              :disabled="!selectedCategory"
              class="is-danger"
              icon-left="trash-alt"
              @click="
                isRename = false;
                emitDeleteCategory();
              "
            >Delete</b-button>
          </p>
        </b-field>

        <p class="content has-text-grey is-size-6">
          You can add new categories when you add new entries.
        </p>
      </section>
    </div>
  </form>
</template>

<script>
import Toasts from './Toasts.vue'
export default {
  props: {
    categories: Array,
  },
  mixins: [Toasts],
  data() {
    return {
      showButtons: false,
      selectedCategory: null,
      isRename: false,
      newCategoryName: null,
    };
  },
  methods: {
    emitRenameCategory: function () {
      if (this.newCategoryName && this.newCategoryName.length > 0) {
        this.$emit(
          "rename-category",
          this.selectedCategory,
          this.newCategoryName
        );
        this.selectedCategory = null;
        this.newCategoryName = null;
        this.toastDo("Renamed all entries", "is-success");
      } else this.toastDo("Enter a valid category name", "is-grey");
    },
    emitDeleteCategory: function () {
      this.$emit("delete-category", this.selectedCategory);
      this.toastDo(
        "All entries with the category '" + this.selectedCategory + "' deleted",
        "is-danger"
      );
      this.selectedCategory = null;
    },
    clearOps: function () {
      console.log("Here");
      this.isRename = false;
    },
  },
};
</script>
