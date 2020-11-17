<template>
  <div
    id="main-view"
    class="has-navbar-fixed-bottom"
  >
    <HeaderView v-on:add-entry-button-click="invokeModal"></HeaderView>
    <DataView></DataView>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <template #default="props">
        <modal-form @close="props.close"></modal-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import HeaderView from "./HeaderView.vue";
import DataView from "./DataView.vue";
import ModalForm from "./AddModal.vue";

export default {
  name: "MainView",
  components: {
    HeaderView,
    DataView,
    ModalForm,
  },
  data: function() {
    return {
      isComponentModalActive: false,
    };
  },
  methods: {
    invokeModal: function() {
      this.isComponentModalActive = !this.isComponentModalActive;
    }
  }
};
</script>

<style scoped>
</style>
