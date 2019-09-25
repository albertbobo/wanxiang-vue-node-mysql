<template>
    <div class="read-wrapper">
        <ReadClassification></ReadClassification>
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<script>
    import ReadClassification from '@/components/ReadClassification'

    export default {
        name: 'ReadLayout',
        components: {
            ReadClassification
        },
    }
</script>

<style>
    @import "../assets/css/read-classification.css";
    @import "../assets/css/read-sort.css";
    @import "../assets/css/read-content.css";
</style>
