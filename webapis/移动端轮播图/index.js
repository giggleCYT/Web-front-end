window.addEventListener('load', function() {
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;
    var flag = false;
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        //过渡效果
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    //监听结束过渡transitionend
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            //清除过渡
            ul.style.transition = 'none';
            //滚动图片
            translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        //去除类名current
        ol.querySelector('.current').classList.remove('current');
        //给对应小圆点添加类名
        ol.children[index].classList.add('current');
    });
    //手指拉动轮播图
    var starX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function(e) {
        starX = e.targetTouches[0].pageX;
        //手指触摸停止自动播放
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - starX;
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        //阻止屏幕滑动
        e.preventDefault();
    });
    ul.addEventListener('touchend', function(e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
    });
    //回到顶部
    var nav = this.document.querySelector('nav');
    var goBack = this.document.querySelector('.goBack');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})