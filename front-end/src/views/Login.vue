<template>
    <div>
        <LoginForm></LoginForm>
    </div>
</template>

<script>
    import LoginForm from '@/components/LoginForm'

    export default {
        name: 'Login',
        components: {
            LoginForm
        },
    }
</script>

<style>
    @import "../assets/css/user.css";
</style>
