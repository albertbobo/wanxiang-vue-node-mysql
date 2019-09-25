<template>
    <div class="read-right">
        <ReadSort></ReadSort>
        <ReadContent2></ReadContent2>
    </div>
</template>

<script>
    import ReadSort from '@/components/ReadSort'
    import ReadContent2 from '@/components/ReadContent2'

    export default {
        name: 'Read2',
        components: {
            ReadSort,
            ReadContent2
        },
    }
</script>
