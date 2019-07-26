window.onload = function(){
    // 左侧滑动
    leftSwipe();

    // 右侧滑动
    rightSwipe();
}
var leftSwipe = function(){
    // 左侧上下滑动
    var parBox = document.querySelector('.cate_left');
    var parBox_height = parBox.offsetHeight;
    // console.log(parBox_height);

    var childBox = parBox.querySelector('ul');
    var childBox_height = childBox.offsetHeight;
    // console.log(childBox_height);

    var startY = 0;
    var distanceY = 0;

    // 核心点
    var currentY = 0;

    childBox.addEventListener('touchstart', function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function(e){
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        var translateY = currentY + distanceY;
        
        if(translateY > 5){
            // 不能向下拉出界限
            childBox.style.transform = 'translateY(20px)';
            childBox.style.webKitTransform = 'translateY(20px)';
        }else{
            // 不能向上拉出界限
            if( (childBox_height - Math.abs(translateY)) < parBox_height*2/3){
                //    不能再向上拉了
                // console.log('不能再向上拉了');
                currentY = 2*parBox_height/3 - childBox_height;
                return;
            }
            childBox.style.transform = 'translateY(' + translateY + 'px' +')';
            childBox.style.webKitTransform = 'translateY(' + translateY + 'px' +')';
        }
    });
    childBox.addEventListener('touchend', function(){
        if((currentY + distanceY) > 0){
            // 表示超出下面50
            currentY = 0
            // 过渡
            childBox.style.transition = 'all 1s';
            childBox.style.webKitTransition = 'all 0.5s';
            // 位移
            childBox.style.transform = 'translateY(0px)';
            childBox.style.webKitTransform = 'translateY(0px)';
        }else{
            currentY += distanceY; 
        }
    });
 
};

var rightSwipe = function(){
    // 右侧上下滑动
    var parBox = document.querySelector('.cate_right');

    var childBox = parBox.querySelector('.cate_right_box');
    var parBox_height = parBox.offsetHeight;
    // console.log(parBox_height);
    var childBox_height = childBox.offsetHeight;

    var startY = 0;
    var distanceY = 0;

    // 核心点
    var currentY = 0;

    childBox.addEventListener('touchstart', function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove', function(e){
        var moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        var translateY = currentY + distanceY;
        
        if(translateY > 20){
            // 不能向下拉出界限
            childBox.style.transform = 'translateY(20px)';
            childBox.style.webKitTransform = 'translateY(20px)';
        }else{

            if( (childBox_height - Math.abs(translateY)) < parBox_height*2/3){
                //    不能再向上拉了
                // console.log('不能再向上拉了');
                currentY = 2*parBox_height/3 - childBox_height;
                return;
            }
            childBox.style.transform = 'translateY(' + translateY + 'px' +')';
            childBox.style.webKitTransform = 'translateY(' + translateY + 'px' +')';
        }
    });
    childBox.addEventListener('touchend', function(){
        if((currentY + distanceY) > 0){
            // 表示超出下面50
            currentY = 0
            // 过渡
            childBox.style.transition = 'all 1s';
            childBox.style.webKitTransition = 'all 0.5s';
            // 位移
            childBox.style.transform = 'translateY(0px)';
            childBox.style.webKitTransform = 'translateY(0px)';
        }else{
            currentY += distanceY; 
        }
    });

};