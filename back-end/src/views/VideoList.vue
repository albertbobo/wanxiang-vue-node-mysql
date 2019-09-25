<template>
    <div>
        <VideoListComp></VideoListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VideoListComp from "../components/VideoListComp";

    export default {
        name: "VideoList",
        components: {
            VideoListComp
        }
    }
</script>
