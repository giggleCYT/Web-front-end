import $ from 'jquery';
import './css/index.css';
import Vue from 'vue'
import App from './components/App.vue';
$(function() {
    $('li:odd').css('backgroundColor', 'yellow');
    $('li:even').css('backgroundColor', function() {
        return '#' + 'D97634'
    })
})

class Person {
    static into = 'abc'
}
console.log(Person.into);

const vm = new Vue({
    el: '#app',
    render: h => h(App)
})