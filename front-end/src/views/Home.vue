<template>
    <div>
        <SlideShow></SlideShow>
        <DailyUpdate></DailyUpdate>
    </div>
</template>

<script>
    import SlideShow from '@/components/SlideShow'
    import DailyUpdate from '@/components/DailyUpdate'

    export default {
        name: 'Home',
        components: {
            SlideShow,
            DailyUpdate
        },
    }
</script>

<style>
    @import '../assets/css/slide-show.css';
    @import "../assets/css/daily-update.css";
</style>
