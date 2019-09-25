<template>
    <div>
        <UserComp></UserComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UserComp from "../components/UserComp";

    export default {
        name: "User",
        components: {
            UserComp
        }
    }
</script>
