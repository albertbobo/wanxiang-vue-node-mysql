<template>

</template>
<script>
    export default {
        name: "Blank5",
        created() {
            this.backExplore();
        },

        methods: {
            backExplore() {
                this.$router.replace({
                    path: '/explorelist',
                    name: 'explorelist'
                });
            }
        },
    }
</script>
