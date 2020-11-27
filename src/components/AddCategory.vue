<template>
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
      class="is-warning"
      @click="emitAddCategory"
      icon-left="plus"
    ></b-button>
  </b-field>
</template>

<script>
export default {
  data: function () {
    return {
      newCategory: null,
    };
  },
  methods: {
    emitAddCategory() {
      this.$emit('add-category-low', this.newCategory)
    },
  },
};
</script>