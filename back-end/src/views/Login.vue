<template>
    <div class="login-wrapper">
        <LoginForm></LoginForm>
    </div>
</template>

<script>
    // @ is an alias to /src
    import LoginForm from '@/components/LoginForm.vue'

    export default {
        name: "Login",
        components: {
            LoginForm
        }
    }
</script>
