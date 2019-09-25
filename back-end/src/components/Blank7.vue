<template>

</template>
<script>
    export default {
        name: "Blank7",
        created() {
            this.backUserAsk();
        },

        methods: {
            backUserAsk() {
                this.$router.replace({
                    path: '/userasklist',
                    name: 'userasklist'
                });
            }
        },
    }
</script>
