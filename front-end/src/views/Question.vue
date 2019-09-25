<template>
    <div>
        <QuestionContent></QuestionContent>
    </div>
</template>

<script>
    import QuestionContent from '@/components/QuestionContent'

    export default {
        name: 'Question',
        components: {
            QuestionContent
        },
    }
</script>

<style>
    @import "../assets/css/question.css";
</style>
