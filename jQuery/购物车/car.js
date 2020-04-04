$(function() {
    $('.checkall').change(function() {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if ($('.j-checkbox').prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');

        }
    });
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        }
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');

        }
    });
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            return false
        }
        n--;
        $(this).siblings('.itxt').val(n);
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        $(this).parent().parent().siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        mysum();
    });
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        $(this).parent().parent().siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        mysum();
    });
    $('.itxt').change(function() {
        var n = $(this).val();
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        $(this).parent().parent().siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        mysum();
    });
    mysum();

    function mysum() {
        var money = 0;
        var count = 0;
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $('.price-sum em').text('￥' + money.toFixed(2));
    }
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        mysum();
    });
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        mysum();
    });
    $('.clear-all').click(function() {
        $('.j-checkbox').parents('.cart-item').remove();
        mysum();
    })
})