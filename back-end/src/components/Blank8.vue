<template>

</template>
<script>
    export default {
        name: "Blank8",
        created() {
            this.backTest();
        },

        methods: {
            backTest() {
                this.$router.replace({
                    path: '/testlist',
                    name: 'testlist'
                });
            }
        },
    }
</script>
