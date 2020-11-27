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
            <br>
            <span class="has-text-danger has-text-weight-semibold">Note</span>: These operations change
            the entries themselves. Deleting a category will delete all the
            entries with that category. Renaming will rename the category in the
            past entries.
          </p>
        </b-field>
        <b-field grouped>
          <b-select
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
          <b-input
            placeholder="New name"
            v-if="isRename && selectedCategory"
            v-model="newCategoryName"
          >
          </b-input>
          <div class="buttons">
            <b-button
              :disabled="!selectedCategory"
              v-if="!isRename"
              class="is-warning"
              icon-left="pen"
              @click="isRename = true"
            ></b-button>
            <b-button
              v-if="isRename"
              class="is-success"
              @click="
                isRename = false;
                emitRenameCategory();
              "
              >Rename</b-button
            >
            <b-button
              :disabled="!selectedCategory"
              class="is-danger"
              icon-left="trash-alt"
              @click="isRename = false; emitDeleteCategory()"
            ></b-button>
            
          </div>
        </b-field>
        
          <p class="content has-text-grey is-size-6">
            You can add new categories when you add new entries.
          </p>
      </section>

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
      showButtons: false,
      selectedCategory: null,
      isRename: false,
      newCategoryName: null,
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
      this.selectedCategory = null;
      this.toastDo(
        "All entries with the category '" + this.selectedCategory + "' deleted",
        "is-danger"
      );
    },
    clearOps: function() {
      console.log('Here');
      this.isRename = false
    }
  },
};
</script>
