<template>
    <div>
        <TopicListComp></TopicListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TopicListComp from "../components/TopicListComp";

    export default {
        name: "TopicList",
        components: {
            TopicListComp
        }
    }
</script>
