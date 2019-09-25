<template>
    <div class="read-sort">
        <div class="read-sort-title">排序方式</div>
        <div class="read-sort-content">
            <div class="btn-read-sort">
                <div class="sort-selected">
                    <i class="fa fa-clock-o fa-fw"></i><span>日期</span>
                    <i class="fa fa-angle-down"></i>
                </div>
            </div>
            <ul class="read-sort-list">
                <li class="current">
                    <div class="sort-option">
                        <i class="fa fa-clock-o fa-fw"></i><span>日期</span>
                        <i class="fa fa-angle-down color-transparent"></i>
                    </div>
                </li>
                <li>
                    <div class="sort-option">
                        <i class="fa fa-fire fa-fw"></i><span>热度</span>
                        <i class="fa fa-angle-down color-transparent"></i>
                    </div>
                </li>
                <li>
                    <div class="sort-option">
                        <i class="fa fa-random fa-fw"></i><span>随机</span>
                        <i class="fa fa-angle-down color-transparent"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    export default {
        name: 'ReadSort',

        methods: {
            readSort() {
                // 悦读排序方式
                // 点击小三角旋转
                $(".btn-read-sort").click(function () {
                    $(".read-sort-list").stop(true, false).slideToggle(300);
                    let angleDown = $(".btn-read-sort .fa-angle-down");
                    if (angleDown.hasClass("angle-rotate")) {
                        angleDown.removeClass("angle-rotate").addClass("angle-rotate2");
                    } else {
                        angleDown.addClass("angle-rotate").removeClass("angle-rotate2");
                    }
                });

                // 点击下拉选择
                $(".read-sort-list li").click(function () {
                    let optionClone1 = $(this).find(".sort-option i:first-of-type").clone();
                    let optionClone2 = $(this).find(".sort-option span").clone();
                    $(".sort-selected i:first-of-type").replaceWith(optionClone1);
                    $(".sort-selected span").replaceWith(optionClone2);
                    $(".read-sort-list").slideUp(300);
                    $(".btn-read-sort .fa-angle-down").removeClass("angle-rotate").addClass("angle-rotate2");
                    $(this).addClass("current").siblings().removeClass("current");
                });
            },
        },

        mounted() {
            this.readSort();
        }
    }
</script>
