<template>
    <div>
        <CenterContent></CenterContent>
    </div>
</template>

<script>
    import CenterContent from '@/components/CenterContent'

    export default {
        name: 'UserCenter',
        components: {
            CenterContent
        },
    }
</script>

<style>
    @import "../assets/css/user.css";
    @import "../assets/css/read-content.css";
</style>
