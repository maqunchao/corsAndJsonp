console.log('mark的网站');
function ajax(method, url){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = () =>{
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.response);
                } else {
                    reject(xhr);
                }

            }
        }
        xhr.send();
    });
}
ajax('get', 'http://127.0.0.1:8686/friends.json').then(response => {
    console.log(response)
})

//通过jsonp设置跨域访问
function jsonp(url){
    return new Promise((resolve, reject) => {
        //防止函数命名重复
        const random = "markJsonpCallBack" + Math.random();
        //声明该回调函数
        window[random] = data => {
            // console.log(data);
            resolve(data);
        };
        //创建srcipt标签
        const script = document.createElement("script");
        //拼接标签的src地址
        script.src = `${url}?callback=${random}`;
        // console.log(src);

        //在执行过script标签的js代码后删除该script标签
        script.onload = () =>{
            script.remove();
        };
        script.onerror = ()=>{
            reject();
        };
        //加载script标签
        document.body.appendChild(script);

    });
}

jsonp("http://127.0.0.1:8686/friends.js").then(data => {
    console.log(data);
});