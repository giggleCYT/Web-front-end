import $ from 'jquery';
import './css/index.css';
$(function() {
    $('li:odd').css('backgroundColor', 'yellow');
    $('li:even').css('backgroundColor', function() {
        return '#' + 'D97634'
    })
})