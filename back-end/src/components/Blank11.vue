<template>

</template>
<script>
    export default {
        name: "Blank11",
        created() {
            this.backUser();
        },

        methods: {
            backUser() {
                this.$router.replace({
                    path: '/user',
                    name: 'user'
                });
            }
        },
    }
</script>
