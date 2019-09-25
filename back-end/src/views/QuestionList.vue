<template>
    <div>
        <QuestionListComp></QuestionListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import QuestionListComp from "../components/QuestionListComp";

    export default {
        name: "QuestionList",
        components: {
            QuestionListComp
        }
    }
</script>
