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
let Templates = function(){}
extend(Templates).with({
  data: { map: new Map() },
  setMap: function(map){
    this.data.map = map;
  },
  getMap: function(){
    return this.data.map;
  },
  load: function(uris){
    return new Promise((res, rej)=>{
      (function next(i){
        if(i < uris.length){
          fetch(uris[i])
            .then(res => res.text())
            .then(text => {
              this.add(uris[i], text);
              next.call(this, ++i);
            });
        } else {
          res();
        }
      }.bind(this))(0);
    });
  },
  add: function(uri, html){
    this.getMap().set(uri, html);
  },
  remove: function(uri){
    this.getMap().remove(uri);
  },
  render: function(node, uri, object){
    let content = this.getMap().get(uri);
    return new Template()
      .setNode(node)
      .setContent(content)
      .setObject(object)
      .render();
  }
})
extend(Node).with({
  update: function(object){
    return this.Template.update(object);
  }
})
let Template = function(){}
extend(Template).with({
  data: { node: null,  content: null, object: null },
  setNode: function(node){
    this.data.node = node;
    this.getNode().Template = this;
    return this;
  },
  getNode: function(){
    return this.data.node;
  },
  setContent: function(content){
    this.data.content = content;
    return this;
  },
  getContent: function(){
    return this.data.content;
  },
  setObject: function(object){
    this.data.object = object;
    return this;
  },
  getObject: function(){
    return this.data.object;
  },
  render: function(){
    let fobject = Object.flatten(this.getObject());
    let content = this.getContent();
    Object.keys(fobject).forEach((key)=>{
      let regExp = new RegExp("{{" + key + "}}", "g");
      content = content.replace(regExp, fobject[key]);
    })
    this.getNode().innerHTML = content;
    return this;
  },
  update: function(object){
    this.setObject(object);
    return this.render();
  }
})
let sn = {};
extend(sn).with({
  templates: new Templates(),
  describe: {
    "post": "POST function(url, params)",
    "get": "GET function(url)",
  },
  post: function(url, params){
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
  },
  get: function(url, params){
    return fetch(url, params);
  }
});
export { extend, sn, Templates, Template };