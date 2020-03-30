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
    });
    bodier.addEventListener('mouseleave', function() {
        right.style.display = 'none';
        left.style.display = 'none';
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
            console.log(bodierWidth);
            console.log(-index * bodierWidth);

            move(box, -index * bodierWidth);
        });
    }
    radius.children[0].className = 'current';
})