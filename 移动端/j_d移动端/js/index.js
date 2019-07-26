window.onload = function(){
    // 初始化页面

    // 搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();

};
var search = function(){
    // 功能
    // 1、当页面初始化的时候  距离顶部0的时候  透明度是0
    // 2、当页面滚动的时候， 透明度随滚动条距离顶部变化  越大透明度也深
    // 3、当滚动的距离超过轮播图的距离的时候  保存不变

    // 获取元素
    var sear = document.querySelector('.jd_search_box');
    var bann = document.querySelector('.jd_banner');

    // 获取banner的高度
    var banner_height = bann.offsetHeight;

    // 绑定滚动事件(监听滚动条的变化)
    window.onscroll = function(){
        // 获取滚动的长度
        var scroll_top = document.documentElement.scrollTop;  
        // var scroll_top = document.documentElement.scrollTop || document.body.scrollTop;  //兼容
       
        var opcity = 0.9;
        if(scroll_top > banner_height){
            // 当滚动的距离超过轮播图的距离的时候  保存不变
            opcity = 0.9;
        }else{
            // 当页面滚动的时候， 透明度随滚动条距离顶部变化  越大透明度也深
            opcity = 0.9 * (scroll_top / banner_height);
        }
        sear.style.background = 'rgba(216,80,92,'+opcity+')';
    }
}
var banner = function(){
    // 1.无缝滚动&无缝滑动（定时器 过渡 位移）
    // 2.点盒子随图片变化 (改变当前样式)
    // 3.可以滑动        (touch事件 监听触摸点坐标，改变距离  位移)
    // 4.当滑动距离不够的时候  吸附回去          （过渡 位移）
    // 5.当滑动距离够的时候  跳转 上一张or 下一张  （判断方向 过渡 位移）

    // 获取banner
    var banner = document.querySelector('.jd_banner');
    var banner_width = banner.offsetWidth;
    // 图片容器
    var images_box = banner.querySelector('ul:first-child');
    // 点容器
    var point_box = banner.querySelector('ul:last-child');
    // 每一个点
    var point_list = point_box.querySelectorAll('li');
    // var point_list = point_box.children;
    // console.log(point_list);

    // 提取几个公用的方法
    // 添加过渡
    var setTrasiton = function(){
        images_box.style.transition = 'all 0.2s';
        images_box.style.webKitTransition = 'all 0.2s';  //兼容
    };
    // 清除过渡
    var removeTransition = function(){
        images_box.style.transition = 'none';
        images_box.style.webKitTransition = 'none';
    };
    // 位移
    var setTranslateX = function(translateX){
        // images_box.style.transform = 'translateX('+ (-10*index) + '%' +')';   // 格式：transform: translateX(-10%);
        // images_box.style.webKitTransform = 'translateX(' + (-10*index) + '%' + ')'; 
        images_box.style.transform = 'translateX(' + translateX + 'px' + ')';
        images_box.style.webKitTransform = 'translateX(' + translateX + 'px' + ')';
    };
    // 改变点的位置的方法
    var setPoint = function(){
        // index 1-8
        // 清除所有的点的类 now
        for(var i = 0;i < point_list.length;i++){
            point_list[i].classList.remove('now');
        }
        // 设置当前点的类 now  point_list 0-7
        point_list[index-1].classList.add('now');
    }
    
    var index = 1;  // 默认的index

    // 无缝滚动&无缝滑动（定时器 过渡 位移）
    var timer = setInterval(function(){
        index++;
        // 过渡
        setTrasiton();
        //位移
        setTranslateX(-index*banner_width);
    },3000);

    // 监听过渡结束  从8（最后一张）到9（第一张）过渡结束瞬间回到1（第一张）
    images_box.addEventListener('transitionend', function(){
        if(index >= 9){
            // 瞬间回到第一张
            index = 1;
            // 清除过渡效果
            removeTransition();
            // 移动
            setTranslateX(-index*banner_width);
        }else if(index <= 0){
            // 瞬间回到第八张
            index = 8;
            // 清除过渡效果
            removeTransition();
            // 移动
            setTranslateX(-index*banner_width);
        }
        // 2.点盒子随图片变化 (改变当前样式)   这里index的值是1-8
        setPoint();
    });

    // 3.可以滑动        (touch事件 监听触摸点坐标，改变距离  位移)

    var startX = 0;   // 定义开始点的X轴位置
    var distanceX = 0;  //滑动的距离
    // 严禁操作
    var isMove = false;  //是否滑动

    images_box.addEventListener('touchstart', function(event){
        // 关闭定时器
        clearInterval(timer);
        // 获取触摸点的开始位置 X轴
        startX = event.touches[0].clientX;
        // console.log(startX);
    });
    images_box.addEventListener('touchmove', function(event){
        // 获取移动点的位置
        var moveX = event.touches[0].clientX;
        distanceX = moveX - startX;
        // 向右移  distanceX > 0
        // 向左移  distanceX < 0

        // 基于当前位置 改变位置
        var move = -index*banner_width + distanceX;
        setTranslateX(move);

        isMove = true;
    });
    images_box.addEventListener('touchend', function(event){
        if(isMove){
            if(Math.abs(distanceX) < banner_width/3){
                // 4.当滑动距离不够的时候  吸附回去      （过渡 位移）
                // 过渡
                setTrasiton();
                // 移动
                setTranslateX(-index*banner_width);
            }else{
                // 5.当滑动距离够的时候  跳转 上一张or 下一张  （判断方向 过渡 位移）
                if(distanceX > 0){
                    // 向右移  上一张
                    index--;
                }else{
                    // 向左移  下一张
                    index++;
                }
                // 过渡
                setTrasiton();
                // 移动
                setTranslateX(-index*banner_width);
            }
        }
        // 严谨  一定只有一个定时器
        clearInterval(timer);
        // 开启定时器
        timer = setInterval(function(){
            index++;
            // 过渡
            setTrasiton();
            //位移
            setTranslateX(-index*banner_width);
        },3000);

        // 重置参数
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
}

var downTime = function(){
    // 模拟倒计时  11小时
    // 1.利用定时器，每隔1s一次  重新展示时间
    
    var time = 11*60*60;  //s
    // 获取显示时间的容器
    var spans = document.querySelectorAll('.ms_time span');
    var timer = setInterval(function(){
        time--;
        // 格式化时间
        var hour = parseInt(time/(60*60));
        
        var min = parseInt(time%3600/60);

        var second = parseInt(time%60);

        spans[0].innerHTML = parseInt(hour/10);
        spans[1].innerHTML = parseInt(hour%10);

        spans[3].innerHTML = parseInt(min/10);
        spans[4].innerHTML = parseInt(min%10);

        spans[6].innerHTML = parseInt(second/10);
        spans[7].innerHTML = parseInt(second%10);

        if(time <= 0){
            clearInterval(timer);
        }
    }, 1000);


}