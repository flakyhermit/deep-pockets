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
          <b-select
            class="control"
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
            <b-input placeholder="New name" v-model="newCategoryName" expanded>
            </b-input>
            <b-button
              class="is-success"
              icon-left="check"
              @click="
                isRename = false;
                renameConditionsCheck();
              "
            ></b-button>
            <b-button @click="clearOps" icon-left="times"></b-button>
          </b-field>
          <p class="buttons control">
            <b-button
              :disabled="!selectedCategory"
              v-if="!isRename"
              class="is-warning"
              icon-left="pen"
              @click="isRename = true"
              >Rename</b-button
            >
            <b-button
              :disabled="!selectedCategory"
              class="is-danger"
              icon-left="trash-alt"
              @click="
                isRename = false;
                emitDeleteCategory();
              "
              >Delete</b-button
            >
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
import Toasts from "./Toasts.vue";
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
      alertObj: {
        title: "Confirm changes",
        message:
          "This operation will permanently change the category names in the entries you've added. Are you sure you want to go ahead with it?",
        type: "is-warning",
        cancelText: "Cancel",
        confirmText: "Confirm rename",
        ariaRole: "alertdialog",
        ariaModal: true,
        onConfirm: () => {
          this.emitRenameCategory();
        },
      },
    };
  },
  methods: {
    renameConditionsCheck: function () {
      let newName = this.letterCapitalize(this.newCategoryName)
      if (
        newName &&
        newName.length > 0 &&
        (this.categories.indexOf(newName) == -1)
      ) {
        this.confirmRenameDialog();
      } else this.toastDo("Invalid name / name already exists.");
    },
    emitRenameCategory: function () {
      this.$emit(
        "rename-category",
        this.selectedCategory,
        this.newCategoryName
      );
      this.selectedCategory = null;
      this.newCategoryName = null;
      this.toastDo("Renamed all entries", "is-success");
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
      this.isRename = false;
    },
    confirmRenameDialog() {
      this.$buefy.dialog.confirm(this.alertObj);
    },
    alertDelete() {},
    alertRename() {},
  },
};
</script>
