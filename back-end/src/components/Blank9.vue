<template>

</template>
<script>
    export default {
        name: "Blank9",
        created() {
            this.backTopic();
        },

        methods: {
            backTopic() {
                this.$router.replace({
                    path: '/topiclist',
                    name: 'topiclist'
                });
            }
        },
    }
</script>
