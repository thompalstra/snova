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
    <script src="./bundle.js" type="module"></script>
  </head>
  <body>
    <ul>
      <li>item</li>
      <li>item</li>
      <li>item
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </li>
      <li>item</li>
      <li>item</li>
      <li>item
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </li>
      <li>item</li>
      <li>item
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </li>
    </ul>
    <form id="form-form-1">
      <input type="text" name="street" value="Neede" placeholder="street"/>
      <input type="text" name="housenumber" value="33" placeholder="housenumber"/>
      <input type="text" name="housenumberext" value="X" placeholder="housenumberext"/>
      <input type="text" name="city" value="Amsterdam" placeholder="city"/>
      <input type="text" name="zipcode" value="9999XX" placeholder="zipcode"/>
      <select name="country" value="nl_NL" placeholder="Select">
        <option value="nl_NL">Nederland</option>
        <option value="en_UK">United Kingdom</option>
        <option value="en_US">United States</option>
        <option value="xx_XX">Other</option>
      </select>
      <div>

      </div>
      <div>
        <label><input type="radio" name="gender" value="man"></input>male</label>
        <label><input type="radio" name="gender" value="vrouw"></input>female</label>
      </div>
      <div>
        <label><input type="checkbox" name="delivery_options[]" value="24h"></input>24h</label>
        <label><input type="checkbox" name="delivery_options[]" value="express"></input>express</label>
        <label><input type="checkbox" name="delivery_options[]" value="insure"></input>insure</label>
      </div>
    </form>
  </body>
  <script>
    document.addEventListener("DOMContentLoaded", ()=>{

    });
  </script>
</html>