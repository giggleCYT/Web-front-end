window.addEventListener('load', function() {
    var c_nav = this.document.querySelector('.c-nav');
    var cloud = this.document.querySelector('.cloud');
    var lis = c_nav.querySelectorAll('li');
    var clicker = 0;
    for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('mouseenter', function() {
            move(cloud, this.offsetLeft);
        });
        lis[i].addEventListener('mouseleave', function() {
            move(cloud, clicker);
        });
        lis[i].addEventListener('click', function() {
            clicker = this.offsetLeft;
        });
    }
})