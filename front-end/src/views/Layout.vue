<template>
    <div class="wrapper">
        <Header></Header>
        <main>
            <div class="container">
                <keep-alive exclude="Login,Register,UserCenter,FindPwd,EditUserInfo,EditPwd">
                    <router-view/>
                </keep-alive>
            </div>
        </main>
        <Footer></Footer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        name: 'Layout',
        components: {
            Header,
            Footer,
        },
    }
</script>
