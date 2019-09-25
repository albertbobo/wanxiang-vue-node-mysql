<template>
    <div>
        <TestListComp></TestListComp>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TestListComp from "../components/TestListComp";

    export default {
        name: "TestList",
        components: {
            TestListComp
        }
    }
</script>
