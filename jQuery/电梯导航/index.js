$(function() {
    var tooltop = $('.recommend').offset().top;
    var flag = true;
    tool();

    function tool() {
        if ($(document).scrollTop() >= tooltop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }

    $(window).scroll(function() {
        tool();
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    });
    $('.fixedtool li').click(function() {
        flag = false;
        var top = $('.floor .w').eq($(this).index()).offset().top;
        $('body,html').stop().animate({
            scrollTop: top
        });
        $(this).addClass('current').siblings().removeClass('current');
    })
})