<template>
    <div class="read-right">
        <ReadSort></ReadSort>
        <ReadContent1></ReadContent1>
    </div>
</template>

<script>
    import ReadSort from '@/components/ReadSort'
    import ReadContent1 from '@/components/ReadContent1'

    export default {
        name: 'Read1',
        components: {
            ReadSort,
            ReadContent1
        },
    }
</script>
