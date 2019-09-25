<template>
    <div class="read-right">
        <ReadSort></ReadSort>
        <ReadContent4></ReadContent4>
    </div>
</template>

<script>
    import ReadSort from '@/components/ReadSort'
    import ReadContent4 from '@/components/ReadContent4'

    export default {
        name: 'Read4',
        components: {
            ReadSort,
            ReadContent4
        },
    }
</script>
