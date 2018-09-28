if(Object.hasOwnProperty("flatten") === false){
  Object.flatten = function(target){
    let output = {};
    Object.keys(target).forEach((key)=>{
      if(typeof target[key] === "object"){
        let ftarget = Object.flatten(target[key]);
        Object.keys(ftarget).forEach((fkey)=>{
          output[fkey + "." + key] = ftarget[fkey];
        })
      } else {
        output[key] = target[key];
      }
    });
    return output;
  }
}
if(Object.hasOwnProperty("serialize") === false){
  Object.serialize = function(target){
    let output = [];
    Object.keys(target).forEach((key)=>{
      output.push(encodeURIComponent(key)+"="+encodeURIComponent(target[key]))
    });
    return output.join("&");
  }
}
if(HTMLFormElement.prototype.hasOwnProperty("serialize") === false){
  HTMLFormElement.prototype.serialize = function(){
    let output = [];
    for(let pair of (new FormData(this)).entries()){
      output.push(encodeURIComponent(pair[0])+"="+encodeURIComponent(pair[1]))
    }
    return output.join("&");
  }
}
if(HTMLFormControlsCollection.prototype.hasOwnProperty("forEach") === false){
  HTMLFormControlsCollection.prototype.forEach = Array.prototype.forEach;
}
if(HTMLCollection.prototype.hasOwnProperty("forEach") === false){
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}
var obj = {};
var fn = function(){}
extend(Node).with({
  one: function(q){
    return this.querySelector(q);
  },
  find: function(q){
    return this.querySelectorAll(q);
  },
  on: function(eventTypes, b, c){
    eventTypes.split(" ").forEach((eventType)=>{
      if(typeof b === "function"){
        this.addEventListener(eventType, b);
      } else if(typeof b === "string" && typeof c === "function"){
        this.addEventListener(eventType, (oe)=>{
          let target = null;
          if(oe.target.matches(b)){
            c.call(oe.target, oe);
          } else if((target = oe.target.closest(b))){
            c.call(target, oe);
          }
        });
      }
    })
  },
  do: function(eventType, options){
    if(typeof options === "undefined"){
      options = {cancelable: true,bubbles: true};
    } else if(typeof options === "boolean"){
      options = {cancelable: options,bubbles: options};
    }
    let ce = new CustomEvent(eventType, options);
    this.dispatchEvent(ce);
    return ce;
  }
});

document.on("click", function(event){
  console.log(this);
})
document.on("click", "li", function(event){
  console.log(this);
})
document.find("li").on("click", "li", function(event){
  console.log(this, "li > li");
})
