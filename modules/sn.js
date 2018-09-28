let extend = function(){
  return {
    list: arguments,
    with: function(object, forceProperty){
      if(typeof forceProperty === "undefined"){
        forceProperty = false;
      }
      for(let i = 0; i < this.list.length; i++){
        let target = ( this.list[i].hasOwnProperty("prototype") && forceProperty == false ? this.list[i].prototype : this.list[i] );
        for(let key in object){
          target[key] = object[key];
        }
      }
    }
  }
}
let sn = function(){

}
sn.prototype.post = function(url, params){
  if(typeof params === "undefined"){
    throw new Error("params are required");
  }
  if(params.hasOwnProperty("headers") === false){
    params.headers = {'Content-Type':'application/x-www-form-urlencoded'};
  } else if(params.headers.hasOwnProperty("Content-Type") === false){
    params.headers["Content-Type"] = 'application/x-www-form-urlencoded';
  }
  if(params.hasOwnProperty("method") === false){
    params.method = "POST";
  }
  return fetch(url, params);
}
sn.prototype.get = function(url, params){
  return fetch(url, params);
}
window.extend = extend;
window.snova = window.sn = new sn();
export { sn };
