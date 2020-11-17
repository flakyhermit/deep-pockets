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
      <template>
        <modal-form @add-entry-details="recordEntry" @close="isComponentModalActive = false"></modal-form>
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
      temp: 0
    };
  },
  methods: {
    invokeModal: function() {
      this.isComponentModalActive = !this.isComponentModalActive;
    },
    recordEntry(am, cat) {
        this.temp = am
        console.log(this.temp + ' ' + cat)
        this.isComponentModalActive = false
    }
  }
};
</script>

<style scoped>
</style>
