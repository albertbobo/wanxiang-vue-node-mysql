<template>

</template>
<script>
    export default {
        name: "Blank2",
        created() {
            this.backSlide();
        },

        methods: {
            backSlide() {
                this.$router.replace({
                    path: '/slideshow',
                    name: 'slideshow'
                });
            }
        },
    }
</script>
