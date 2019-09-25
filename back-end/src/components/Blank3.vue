<template>

</template>
<script>
    export default {
        name: "Blank3",
        created() {
            this.backRead();
        },

        methods: {
            backRead() {
                this.$router.replace({
                    path: '/readlist',
                    name: 'readlist'
                });
            }
        },
    }
</script>
