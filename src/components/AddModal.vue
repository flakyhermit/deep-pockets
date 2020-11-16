<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">New Entry</p>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"/>
            </header>

            <section class="modal-card-body">
                <b-field label="Amount">
                    <b-input
                        type="number"
                        :value="amount"
                        size="is-large"
                        placeholder="0"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Category">
                    <b-select placeholder="Category" required>
                        <option value="flint">Entertainment</option>
                        <option value="silver">Food</option>
                        <option value="silver">Beverage</option>
                    </b-select>
                </b-field>

                <b-field label="Note">
                    <b-input
                        type="textarea"
                        :value="note"
                        placeholder="Add a note">
                    </b-input>
                </b-field>
            </section>

            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$emit('close')">Close</button>
                <button class="button is-primary">Add Entry</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            amount: 0,
            note: ''
        }
    }
}
</script>