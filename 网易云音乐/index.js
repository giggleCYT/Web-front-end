window.onload = function() {
    axios.defaults.baseURL = 'https://autumnfish.cn';

    function fn() {
        axios.get('/top/playlist?limit=10&order=new')
            .then(function(res) {
                console.log(res);
            }).catch(function(error) {
                console.log('获取失败！');

            })
    }
    fn()

}