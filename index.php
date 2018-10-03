<?php
if($_POST){
  var_dump($_POST); exit;
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <link href="./bundle.css" rel="stylesheet"/>
    <script src="./bundle.js" type="module"></script>
  </head>
  <body>
    <app-view id="splash">
      <h2>Loading...</h2>
    </app-view>
  </body>
  <script>
    document.addEventListener("app.ready", ()=>{
      window.app = {};
      extend(app).with({
        navigate: {
          history: {
            history: [],
            push: function(state, url){
              this.history.push({ state: state, url: url });
            },
            pop: function(){
              return this.history.pop();
            }
          },
          to: function(url, object){
            return new Promise((res, rej)=>{
              let view = document.createElement("app-view");
              view.dataset.href = url.replace(/\//g, "-").replace(/\./g, "-");
              let Template = sn.templates.render(view, url, object)
                .then(()=>{
                  this.history.push({
                    view: view,
                    url: url
                  }, url);
                  document.body.appendChild(view);
                  res();
                })
            });
          },
          back: function(e){
            let last = this.history.pop();
            last.state.view.remove();
          }
        }
      })

      document.on("click", "a[data-navigate-to]", function(event){
        event.preventDefault(); event.stopPropagation();
        if(this.dataset.params){
          params = JSON.parse(this.dataset.params);
        } else {
          params = {};
        }
        app.navigate.to(this.getAttribute("href"), params);
      })
      document.on("click", "a[data-navigate-back]", function(e){
        event.preventDefault(); event.stopPropagation();
        app.navigate.back();
      })

      sn.templates.load([
        ["category-list", "./html/templates/category/list.html"],
        ["product-list", "./html/templates/product/list.html"],
        "./html/category/index.html",
        "./html/category/view.html",
        "./html/product/view.html",
        "./html/home.html"
      ]).then(()=>{
        app.navigate.to("./html/home.html");
        document.getElementById("splash").remove();
      });
    });
  </script>
</html>
