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
ajax('get', './friends.json').then(response => {
    console.log(response)
})