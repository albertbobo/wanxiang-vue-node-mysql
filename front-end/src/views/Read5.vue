<template>
    <div class="read-right">
        <ReadSort></ReadSort>
        <ReadContent5></ReadContent5>
    </div>
</template>

<script>
    import ReadSort from '@/components/ReadSort'
    import ReadContent5 from '@/components/ReadContent5'

    export default {
        name: 'Read5',
        components: {
            ReadSort,
            ReadContent5
        },
    }
</script>
