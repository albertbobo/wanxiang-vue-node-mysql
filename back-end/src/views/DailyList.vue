<template>
    <div>
        <DailyListComp></DailyListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import DailyListComp from "../components/DailyListComp";

    export default {
        name: "DailyList",
        components: {
            DailyListComp
        }
    }
</script>
