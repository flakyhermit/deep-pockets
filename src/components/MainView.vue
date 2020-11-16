<template>
    <div id="main-view" class="has-navbar-fixed-bottom">
        <ViewHeader></ViewHeader>
        <TabView></TabView>
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
                            <a class="button is-primary is-light is-rounded">
                                <strong>  Settings  </strong>
                            </a>
                            <a class="button is-primary is-expanded is-large is-rounded" @click="isComponentModalActive = true">
                                <strong>+</strong>
                            </a>
                            <a class="button is-primary is-light is-rounded" @click="logger('logg')">
                                <strong>Category</strong>
                            </a>
                        </div>
            </b-navbar-item>
        </template>
        </b-navbar>
        </div>
</template>

<script>
import ViewHeader from './ViewHeader.vue'
import TabView from './TabView.vue'
import ModalForm from './AddModal.vue'
export default {
    name: 'MainView',
    components: {
        ViewHeader,
        TabView,
        ModalForm
    },
    data: () => {
         return {
             isComponentModalActive: false,
        }
    },
    methods: {
        logger(par) {
            console.log(par)
        }
    }
}
</script>

<style scoped>
</style>
