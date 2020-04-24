import $ from 'jquery';
import './css/index.css';
import './css/index.less';
import './css/index.scss';
import '_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css'
$(function() {
    $('li:odd').css('backgroundColor', 'yellow');
    $('li:even').css('backgroundColor', function() {
        return '#' + 'D97634'
    })
})