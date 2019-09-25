<template>

</template>
<script>
    export default {
        name: "Blank4",
        created() {
            this.backVideo();
        },

        methods: {
            backVideo() {
                this.$router.replace({
                    path: '/videolist',
                    name: 'videolist'
                });
            }
        },
    }
</script>
