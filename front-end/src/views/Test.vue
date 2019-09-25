<template>
    <div>
        <TestContent></TestContent>
    </div>
</template>

<script>
    import TestContent from '@/components/TestContent'

    export default {
        name: 'Test',
        components: {
            TestContent
        },
    }
</script>

<style>
    @import "../assets/css/test.css";
</style>
