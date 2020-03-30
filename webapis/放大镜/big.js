window.addEventListener('load', function() {
    var body = this.document.querySelector('.body');
    var mask = this.document.querySelector('.mask');
    var big = this.document.querySelector('.big');
    var img = this.document.querySelector('.img')
    body.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    body.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    body.addEventListener('mousemove', function(e) {
        var x = e.pageX - body.offsetLeft;
        var y = e.pageY - body.offsetTop;
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        var maskXMax = body.offsetWidth - mask.offsetWidth;
        var maskYMax = body.offsetHeight - mask.offsetHeight;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskXMax) {
            maskX = maskXMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskYMax) {
            maskY = maskYMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigXMax = img.offsetWidth - big.offsetWidth;
        var bigYMax = img.offsetHeight - big.offsetHeight;
        var bigX = maskX * bigXMax / maskXMax;
        var bigY = maskY * bigYMax / maskYMax;
        if (bigX <= 0) {
            bigX = 0;
        } else if (bigX >= bigXMax) {
            bigX = bigXMax;
        }
        if (bigY <= 0) {
            bigY = 0;
        } else if (bigY >= bigYMax) {
            bigY = bigYMax;
        }
        img.style.left = -bigX + 'px';
        img.style.top = -bigY + 'px';
    })
})