<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-weight-medium">Options</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Import/Export">
          <p class="content has-text-grey is-size-6">
            To save your data permanently you can export it, and import it back
            if you lose it.
          </p>
        </b-field>
        <div class="field file buttons">
          <b-button class="is-primary" @click="downloadJSON()">Export</b-button>
          <b-upload v-model="file" class="file-label" @input="validateJSON()">
            <span class="file-cta">
              <span class="file-label">Import</span>
            </span>
            <span class="file-name" v-if="file">
              {{ file.name }}
            </span>
          </b-upload>
          <b-button
            class="is-success"
            icon-left="check"
            v-if="validationFlag"
            @click="confirmImport()"
            >Load</b-button
          >
        </div>
        <b-field label="Manage categories">
          <p class="content has-text-grey is-size-6">
            Rename or delete categories.
            <br />
            <span class="has-text-weight-semibold">Note</span>:
            These operations change the entries themselves. Tread carefully.
          </p>
        </b-field>
        <b-field grouped group-multiline>
          <b-select
            class="control"
            placeholder="Select a category"
            required
            :disabled="!categories.length"
            v-model="selectedCategory"
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
          <p class="buttons control">
            <b-button
              :disabled="!selectedCategory"
              icon-left="pen"
              @click="promptRename"
              >Rename</b-button
            >
            <b-button
              :disabled="!selectedCategory"
              class="is-danger"
              icon-left="trash-alt"
              @click="confirmDelete"
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
    entries: Array,
  },
  mixins: [Toasts],
  data() {
    return {
      selectedCategory: null,
      file: null,
      importEntries: null,
      validationFlag: false,
      newCategoryName: null,
    };
  },
  computed: {
    jsonExportText: function () {
      return JSON.stringify(this.entries);
    },
  },
  methods: {
    renameConditionsCheck: function () {
      let newName = this.letterCapitalize(this.newCategoryName);
      if (
        newName &&
        newName.length > 0 &&
        this.categories.indexOf(newName) == -1
      ) {
        return true;
      } else this.toastDo("Invalid name / name already exists.");
      return false;
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
    confirmRename() {
      this.$buefy.dialog.confirm({
        title: "Confirm changes",
        message:
          "This operation will permanently change the category names in the entries you've added. Are you sure you want to go ahead with it?",
        type: "is-danger",
        confirmText: "Yes",
        ariaRole: "alertdialog",
        ariaModal: true,
        onConfirm: () => {
          this.emitRenameCategory();
        },
      });
    },
    confirmDelete() {
      this.$buefy.dialog.confirm({
        title: "Confirm deletion",
        message:
          "This operation will permanently delete all entries with the selected category. Are you sure?",
        type: "is-danger",
        confirmText: "Yes",
        ariaRole: "alertdialog",
        ariaModal: true,
        onConfirm: () => {
          this.emitDeleteCategory();
        },
      });
    },
    confirmImport() {
      this.$buefy.dialog.confirm({
        title: "Confirm import",
        message:
          "This operation will overwrite any data that you currently have in the cache. Are you sure?",
        type: "is-danger",
        cancelText: "Cancel",
        confirmText: "Yes",
        ariaRole: "alertdialog",
        ariaModal: true,
        onConfirm: () => {
          this.importJSON();
        },
      });
    },
    downloadJSON() {
      var element = document.createElement("a");
      let dateString = new Date().toISOString();
      let filename = "Deep-Pockets_" + dateString + ".json";
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(this.jsonExportText)
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    async validateJSON() {
      try {
        if (this.file.type != "application/json" || !this.file.size)
          throw "invalid";
        let fileText = await this.file.text();
        console.log(fileText);
        this.importEntries = JSON.parse(fileText);
        if (this.importEntries.constructor != Array) throw "invalid";
        if (this.importEntries.length == 0) throw "empty";
        let keys = Object.keys(this.importEntries[0]);
        console.log(keys.length);
        if (keys.length != 4) throw "corrupt";
        let flag = 0;
        let compareArray = ["timestamp", "amount", "category", "note"];
        for (var i = 0; i < 4; i++) {
          if (keys[i] != compareArray[i]) {
            flag = 1;
            break;
          }
        }
        if (flag == 1) throw "corrupt";
        this.validationFlag = true;
      } catch (error) {
        switch (error) {
          case "invalid":
            this.toastDo(
              "The file is not a valid Deep Pockets JSON",
              "is-danger"
            );
            break;
          case "empty":
            this.toastDo("The file has no entries in it. Nothing to do");
            break;
          case "corrupt":
            this.toastDo("The file is corrupt");
            break;
          default:
            this.toastDo(
              "The file is not a Deep Pockets JSON, or it is corrupted",
              "is-danger"
            );
        }
        // Clear upload
        this.file = null;
        this.importEntries = null;
        this.validationFlag = false;
        return;
      }
      this.toastDo("File validated. Click load to load data", "is-success");
    },
    importJSON() {
      this.$emit("import-entries", this.importEntries);
      this.toastDo("Imported entries", "is-success");
      this.file = null
      this.validationFlag = false;
    },
    promptRename() {
      this.$buefy.dialog.prompt({
        message: "Enter a new category name",
        inputAttrs: {
          type: "text",
          placeholder: "Category name",
          value: "",
        },
        confirmText: "RENAME",
        trapFocus: true,
        closeOnConfirm: false,
        onConfirm: (value, { close }) => {
          this.newCategoryName = value;
          if (this.renameConditionsCheck()) {
            this.confirmRename();
            close();
          }
        },
      });
    },
  },
};
</script>
