var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];
if(!port){
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}


var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url;
    var queryString = ''
    //判断url中的参数
    if(pathWithQuery.indexOf('?') >= 0){ 
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) 
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    // console.log(query);
      console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);


    response.statusCode = 200;
    //默认首页
    const filePath = path === "/" ? 'index.hmtl' : path;
    const index = filePath.lastIndexOf('.');
    //截取路径的后缀
    const suffix = filePath.substring(index);
    //设置hash表来取出对应文件后缀的 content-type
    const fileTypes = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        '.png':'image/png',
        '.jpg':'image/jpeg'
    }
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    //设置CORS 跨域资源共享  直接访问
    //接受从mark-com 127.0.0.1:8989来的请求

    let content
    if(filePath === "/friends.json"){
        response.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8989");
    } else if(filePath === "/friends.js"){
        //采用jsonp的方式
        if(request.headers["referer"].indexOf("http://127.0.0.1:8989") === 0){
            response.statusCode = 200;
            const string = `window['{xxx}']({data}) `
            const data = fs.readFileSync("./public/friends.json").toString(); 
            content = string.replace("{data}", data).replace("{xxx}", query.callback);
        }
    }

   
    try {
        if(!content){
            content = fs.readFileSync(`./public${filePath}`)
        }
    } catch (error){
        content = "文件不存在"
        response.statusCode = 404
    }
    response.write(content)
    response.end()
})

server.listen(port)
console.log('监听' + port + '成功打开 http://localhost:' + port)