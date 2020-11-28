<template>
    <div></div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },
    methods: {
        toastDo: function (message, type) {
            let typeAssign = type ? type : "is-dark";
            this.$buefy.toast.open({
                message: message,
                duration: 2000,
                position: "is-bottom",
                type: typeAssign,
            });
        }
    },
}
</script>