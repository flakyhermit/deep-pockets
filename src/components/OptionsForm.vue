<template>
  <form @submit.prevent="emitAddEntryEvent">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title is-size-5 has-text-weight-medium">
          Options
        </p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <b-field label="Import/Export">
            <p class="content has-text-grey is-size-6">To save your data permanently you can export it, and import it back if you lose it.</p>
        </b-field>
        <div class="buttons">
            <b-button class="is-primary">Export</b-button>
            <b-button class="button">Import</b-button>
        </div>
        <b-field label="Manage categories">
            <p class="content has-text-grey is-size-6">Add, delete, rename categories and limits.</p>
        </b-field>
            <b-field  grouped>
            <b-select
              placeholder="Select a category"
              required
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
            <div class="buttons">
                
                
                <b-button class="is-danger" icon-left="trash-alt"></b-button>
                <b-button class="is-warning" icon-left="pen"></b-button>
            </div>
            
            </b-field>
            <b-field label="Add category">
            <b-input
              placeholder="New category name"
              class="control"
              type="text"
              v-model="newCategory"
              min="1"
              max="20"
            ></b-input>
            <b-button
              class="is-success"
              @click="emitAddCategory"
              icon-left="plus"
            ></b-button>
          </b-field>
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
      selectedCategory: null
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
    }
  }
};
</script>
