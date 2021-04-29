安装 node-dev yarn global add node-dev
下载代码 https://github.com/maqunchao/corsAndJsonp.git
进入 qq-com 运行 server.js cd corsAndJsonp/qq-com; node-dev server.js 8888
进入 mark-com 运行 server.js cd ../mark-com; node-dev server.js 9999
设置 hosts
127.0.0.1 qq.com
127.0.0.1 mark.com
打开两个页面 qq.com:8888/index.html 和 mark.com:9999/index.html
记得做完之后，删掉 hosts 里的两行，否则 qq.com 无法正常访问！
