<template>
    <div class="read-right">
        <ReadSort></ReadSort>
        <ReadContent3></ReadContent3>
    </div>
</template>

<script>
    import ReadSort from '@/components/ReadSort'
    import ReadContent3 from '@/components/ReadContent3'

    export default {
        name: 'Read3',
        components: {
            ReadSort,
            ReadContent3
        },
    }
</script>
