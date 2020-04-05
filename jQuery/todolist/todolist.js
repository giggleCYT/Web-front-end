$(function() {
    load();
    $('#title').on('keydown', function(event) {
        //判断是否回车，是就获取本地存储
        if (event.keyCode === 13) {
            if ($(this).val() === '') {
                alert('请输入待办事项');
            } else {
                var local = getDate();
                //把输入数据追加在local
                local.push({ title: $(this).val(), done: false });
                //把local数组保存在本地存储
                saveDate(local);
                load();
                $(this).val('');
            }
        }
    });
    //删除操作
    $('ol,ul').on('click', 'a', function() {
        // 获取本地储存
        var data = getDate();
        // 修改数据
        var index = $(this).attr('id');
        console.log(index);
        data.splice(index, 1);
        //存储修改后的数据
        saveDate(data);
        //重新渲染页面
        load();

    });
    //正在进行和已经完成操作
    $('ol,ul').on('click', 'input', function() {
            var data = getDate();
            //修改数据
            var index = $(this).siblings('a').attr('id');
            data[index].done = $(this).prop('checked');
            //存储修改后的数据
            saveDate(data);
            //重新渲染页面
            load();
        })
        //获取本地存储数据函数
    function getDate() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储
    function saveDate(data) {
        localStorage.setItem('todolist', JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        var data = getDate();
        var todoCount = 0;
        var doneCount = 0;
        //渲染之前先清空
        $('ol,ul').empty();
        //遍历数据
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + n.title + '</p><a herf="javascript:;" id=' + i + '></a></li>');
                doneCount++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a herf="javascript:;" id=' + i + '></a></li>');
                todoCount++;
            }
            $('#todocount').text(todoCount);
            $('#donecount').text(doneCount);
        })
    }
})