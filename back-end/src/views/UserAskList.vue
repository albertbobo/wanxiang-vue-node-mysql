<template>
    <div>
        <UserAskListComp></UserAskListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import UserAskListComp from "../components/UserAskListComp";

    export default {
        name: "UserAskList",
        components: {
            UserAskListComp
        }
    }
</script>
