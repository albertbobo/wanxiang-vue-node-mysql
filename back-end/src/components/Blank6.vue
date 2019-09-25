<template>

</template>
<script>
    export default {
        name: "Blank6",
        created() {
            this.backQuestion();
        },

        methods: {
            backQuestion() {
                this.$router.replace({
                    path: '/questionlist',
                    name: 'questionlist'
                });
            }
        },
    }
</script>
