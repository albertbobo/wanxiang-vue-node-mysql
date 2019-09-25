<template>
    <div>
        <RegisterForm></RegisterForm>
    </div>
</template>

<script>
    import RegisterForm from '@/components/RegisterForm'

    export default {
        name: 'Register',
        components: {
            RegisterForm
        },
    }
</script>

<style>
    @import "../assets/css/user.css";
</style>
