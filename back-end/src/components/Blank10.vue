<template>

</template>
<script>
    export default {
        name: "Blank10",
        created() {
            this.backDaily();
        },

        methods: {
            backDaily() {
                this.$router.replace({
                    path: '/dailylist',
                    name: 'dailylist'
                });
            }
        },
    }
</script>
