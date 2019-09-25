<template>
    <div>
        <AdminUserComp></AdminUserComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import AdminUserComp from "../components/AdminUserComp";

    export default {
        name: "AdminUser",
        components: {
            AdminUserComp
        }
    }
</script>
