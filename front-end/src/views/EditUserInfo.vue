<template>
    <div>
        <EditContent></EditContent>
    </div>
</template>

<script>
    import EditContent from '@/components/EditContent'

    export default {
        name: 'EditUserInfo',
        components: {
            EditContent
        },
    }
</script>

<style>
    @import "../assets/css/user.css";
</style>
