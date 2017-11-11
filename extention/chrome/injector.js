// Copyright 2013 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
console.log('foodies extention started');



var help_me=function(){
  var iframe  = document.createElement ("iframe");
  iframe.setAttribute("id", "foodie_to_foodie_iframe");
  iframe.setAttribute("style", "width:20%;position: fixed;top: 0px;left: 80%;height:500px;overflow: auto; z-index: 2147483647;background-color:whitesmoke;");
  console.log('selected '+getSelectionText());
  iframe.src  = 'https://foodieforfoodie.herokuapp.com/search?name='+getSelectionText();
  document.body.insertBefore (iframe, document.body.firstChild);  
  console.log('foodies iframe added');
}


var div  = document.createElement ("div");
div.addEventListener("click", help_me);
div.innerHTML = "help me";
div.setAttribute("style", "width:20%;position: fixed;top: 0px;left: 80%;height:500px;overflow: auto; z-index: 2147483646;background-color:whitesmoke;");
div.setAttribute("id", "foodie_to_foodie_div");
document.body.insertBefore (div, document.body.firstChild);
console.log('foodies div added');


var script = document.createElement('script');
script.src = chrome.extension.getURL('foodie_script.js');
document.body.insertBefore (script, document.body.firstChild);
console.log('foodies foodie_script added');


console.log('foodies extention ended');
