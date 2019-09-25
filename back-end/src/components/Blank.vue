<template>

</template>
<script>
    export default {
        name: "Blank",
        created() {
            this.backAdmin();
        },

        methods: {
            backAdmin() {
                this.$router.replace({
                    path: '/adminuser',
                    name: 'adminuser'
                });
            },
        },
    }
</script>
