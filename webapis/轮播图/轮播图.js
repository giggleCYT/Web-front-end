window.addEventListener('load', function() {
    var right = document.querySelector('.right');
    var left = document.querySelector('.left');
    var bodier = document.querySelector('.bodier');
    var radius = document.querySelector('.radius');
    var box = document.querySelector('.box');
    var bodierWidth = bodier.offsetWidth;


    bodier.addEventListener('mouseenter', function() {
        right.style.display = 'block';
        left.style.display = 'block';
        //清除定时
        clearInterval(timmer);
        timmer = 0;
    });
    bodier.addEventListener('mouseleave', function() {
        right.style.display = 'none';
        left.style.display = 'none';
        //添加定时
        timmer = setInterval(function() {
            right.click();
        });
    });

    for (var i = 0; i < box.children.length; i++) {
        // 创建li
        var li = this.document.createElement('li');
        // 记录索引号，自定义
        li.setAttribute('index', i);

        radius.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < radius.children.length; i++) {
                radius.children[i].className = '';

            }
            this.className = 'current';
            // 点击小○，移动图片 ul
            var index = this.getAttribute('index');
            // 点击之后把li的index赋值给num
            num = index;
            // 点击之后把li的index赋值给num1
            num1 = index;
            // console.log(bodierWidth);
            // console.log(-index * bodierWidth);

            move(box, -index * bodierWidth);
        });
    }
    radius.children[0].className = 'current';
    var first = box.children[0].cloneNode(true);
    box.appendChild(first);
    // 让箭头可点击
    var num = 0;
    // 让小圆点跟图片动起来
    var num1 = 0;
    // 节流阀
    var flag = true;
    //右箭头
    right.addEventListener('click', function() {

        if (flag) {
            flag = false;
            if (num == box.children.length - 1) {
                box.style.left = 0;
                num = 0;
            }
            num++;
            move(box, -num * bodierWidth, function() {
                flag = true;
            });
            num1++;

            if (num1 == radius.children.length) {
                num1 = 0;
            }
            for (var i = 0; i < radius.children.length; i++) {
                radius.children[i].className = '';
            }
            radius.children[num1].className = 'current';
        }
    });
    //左箭头
    left.addEventListener('click', function() {

        if (flag) {
            flag = false;
            if (num == 0) {
                num = box.children.length - 1;
                box.style.left = -num * bodierWidth + 'px';
            }
            num--;
            move(box, -num * bodierWidth, function() {
                flag = true;
            });
            num1--;
            if (num1 < 0) {
                num1 = radius.children.length - 1;
            }
            for (var i = 0; i < radius.children.length; i++) {
                radius.children[i].className = '';
            }
            radius.children[num1].className = 'current';
        }
    });
    //添加自动播放功能
    var timmer = this.setInterval(function() {
        right.click(); //手动添加
    }, 2000);
})