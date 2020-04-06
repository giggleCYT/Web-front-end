var that;
class Tab {
    constructor(id) {
            that = this;
            this.main = document.querySelector(id);
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('.fisrstnav ul:first-child');
            this.tabscon = this.main.querySelector('.tabscon');
            this.init();
        }
        //初始化操作
    init() {
        this.updata();
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.icon[i].onclick = this.removeTab;
            this.span[i].ondblclick = this.changeTab;
            this.section[i].ondblclick = this.changeTab;
        }
    }
    updata() {
            this.lis = this.main.querySelectorAll('li');
            this.span = this.main.querySelectorAll('li span:first-child');
            this.icon = this.main.querySelectorAll('.icon-guanbi');
            this.section = this.main.querySelectorAll('section');
        }
        // 1.切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.section[this.index].className = 'conactive';
    }
    clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = '';
                this.section[i].className = '';
            }
        }
        //2.增加功能
    addTab() {
            that.clearClass();
            var random = Math.random();
            var li = '<li class="liactive"><span>新建选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var section = '<section class="conactive">测试' + random + '</section>';
            that.ul.insertAdjacentHTML('beforeEnd', li);
            that.tabscon.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        //3.删除功能
    removeTab(e) {
            e.stopPropagation();
            var index = this.parentNode.index;
            that.lis[index].remove();
            that.section[index].remove();
            if (document.querySelector('.liactive')) return;
            index--;
            that.lis[index] && that.lis[index].click();

        }
        //4.修改功能
    changeTab() {
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty;
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');