<template>
    <div class="read-left">
        <ul class="read-switcher">
            <li class="read-switcher-item">
                <router-link to="/read1">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-globe fa-fw"></i>
                    <span>世界之旅</span>
                </router-link>
            </li>
            <li class="read-switcher-item">
                <router-link to="/read2">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-space-shuttle fa-fw"></i>
                    <span>光年之外</span>
                </router-link>
            </li>
            <li class="read-switcher-item">
                <router-link to="/read3">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-eye fa-fw"></i>
                    <span>人文之美</span>
                </router-link>
            </li>
            <li class="read-switcher-item">
                <router-link to="/read4">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-flask fa-fw"></i>
                    <span>科技之光</span>
                </router-link>
            </li>
            <li class="read-switcher-item">
                <router-link to="/read5">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-heartbeat fa-fw"></i>
                    <span>身心之语</span>
                </router-link>
            </li>
            <li class="read-switcher-item">
                <router-link to="/read6">
                    <div class="switcher-item-bgc"></div>
                    <i class="fa fa-thermometer-full fa-fw"></i>
                    <span>万物之理</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ReadClassification',

        methods: {
            readMenu() {
                // 悦读switcher背景色切换
                $(".read-switcher-item a").hover(function () {
                    let switcherBgc = $(this).parent(".read-switcher-item").css("border-left-color");
                    $(this).find(".switcher-item-bgc").css("background-color", switcherBgc);
                });
                let currentSwitcherBgc = $(".read-switcher .current").parent(".read-switcher-item").css("border-left-color");
                $(".read-switcher .current .switcher-item-bgc").css("background-color", currentSwitcherBgc);
            },
        },

        mounted() {
            this.readMenu();
        }
    }
</script>
