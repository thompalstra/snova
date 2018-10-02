import { extend } from "./sn.js";

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
  HTMLFormElement.prototype.serialize = function(object){
    let output = [];
    for(let pair of (new FormData(this)).entries()){
      output.push(encodeURIComponent(pair[0])+"="+encodeURIComponent(pair[1]))
    }
    if(typeof object !== "undefined"){
      output.push(Object.serialize(object));
    }
    return output.join("&");
  }
}
if(HTMLFormControlsCollection.prototype.hasOwnProperty("forEach") === false){
  HTMLFormControlsCollection.prototype.forEach = Array.prototype.forEach;
}
if(NodeList.prototype.hasOwnProperty("forEach") === false){
  NodeList.prototype.forEach = Array.prototype.forEach;
}
if(HTMLCollection.prototype.hasOwnProperty("forEach") === false){
  HTMLCollection.prototype.forEach = Array.prototype.forEach;
}
var obj = {};
var fn = function(){}
extend(Node).with({
  one: function(q){ return this.querySelector(q); },
  find: function(q){ return this.querySelectorAll(q); },
  addClass: function(c){ this.classList.add(c); },
  removeClass: function(c){ this.classList.remove(c); },
  hasClass: function(c){ return this.classList.contains(c); },
  toggleClass: function(c){ return this.classList.toggle(c); },
  siblings: function(q){
    let r = [];
    for(let i = 0; i < this.parentNode.children.length; i++){
      let n = this.parentNode.children[i];
      if(typeof q !== "undefined" && typeof n["matches"] == "function" && n.matches(q)){
        r.push(n);
      } else if(typeof q === "undefined"){
        r.push(n);
      }
    }
    return r;
  },
  parents: function(q){
    let r = [];
    for (let n = this.parentNode; n; n = n.parentNode) {
      if(typeof q !== "undefined" && typeof n["matches"] == "function" && n.matches(q)){
        r.push(n);
      } else if(typeof q === "undefined"){
        r.push(n);
      }
    }
    return r;
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
  do: function(eventType, options ){
    if(typeof options == "undefined"){
      options = {
        cancelable: true,
        bubbles: false,
        detail: {}
      };
    }
    let ce = new CustomEvent(eventType, options);
    this.dispatchEvent(ce);
    return ce;
  }
});
if(NodeList.prototype.hasOwnProperty("splice") === false){
  NodeList.prototype.splice = Array.prototype.splice;
}
if(HTMLCollection.prototype.hasOwnProperty("splice") === false){
  HTMLCollection.prototype.splice = Array.prototype.splice;
}
if(NodeList.prototype.hasOwnProperty("indexOf") === false){
  NodeList.prototype.indexOf = Array.prototype.indexOf;
}
if(HTMLCollection.prototype.hasOwnProperty("indexOf") === false){
  HTMLCollection.prototype.indexOf = Array.prototype.indexOf;
}
extend(NodeList, HTMLCollection).with({
  delegate: function(type, arg){
    this.forEach((node)=>{
      if(typeof node[type] === "function"){
        node[type].apply(node, arg);
      } else {
        console.warn("Undefined method '" + type + "' for node");
      }
    })
  },
  on: function(){ this.delegate("on", arguments); },
  do: function(eventType){ this.delegate("do", arguments); }
})
document.addEventListener("DOMContentLoaded", function(event){
  document.do("app.ready", {
    cancelable: false,
    bubbles: false,
    detail: {}
  });
})
