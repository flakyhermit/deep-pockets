<template>
    <div id="main-view" class="has-navbar-fixed-bottom">
        <HeaderView></HeaderView>
        <DataView></DataView>
        <b-modal 
            v-model="isComponentModalActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal>
            <template #default="props">
                <modal-form @close="props.close"></modal-form>
            </template>
        </b-modal>
        <b-navbar fixed-bottom centered transparent spaced>
            <template slot="start">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-primary is-medium" @click="isComponentModalActive = true">
                            ADD NEW ENTRY
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
    </div>
</template>

<script>
import HeaderView from './HeaderView.vue'
import DataView from './DataView.vue'
import ModalForm from './AddModal.vue'

export default {
    name: 'MainView',
    components: {
        HeaderView,
        DataView,
        ModalForm
    },
    data: () => {
        return {
            isComponentModalActive: false,
        }
    }
}
</script>

<style scoped>
</style>
