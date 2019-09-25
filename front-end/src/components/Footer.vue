<template>
    <footer>
        <div class="container">
            <div class="copyright">
                <p>Copyright © 2018-2019
                    <router-link to="/" class="mr0">「万象」</router-link>
                </p>
                <p>
                    <a href="#">关于</a>
                    <a href="#">用户协议</a>
                    <a href="#">联系我们</a>
                </p>
                <p>粤ICP备190406号</p>
            </div>
        </div>
        <div class="scroll-up-wrapper"><i class="fa fa-angle-double-up"></i></div>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',

        mounted() {
            let backToTop = $(".scroll-up-wrapper");
            $(backToTop).hide();
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $(backToTop).stop(true, true).fadeIn();
                } else {
                    $(backToTop).stop(true, true).fadeOut();
                }
            });
            $(backToTop).click(function () {
                $("body,html").animate({
                    scrollTop: 0
                });
            });
        }
    }
</script>
