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


var iFrame  = document.createElement ("div");
iFrame.setAttribute("style", "width:20%;position: fixed;top: 0px;left: 80%;height:500px;overflow: auto; z-index: 2147483647;background-color:whitesmoke;");
//iFrame.src  = 'http://localhost:5000/';
document.body.insertBefore (iFrame, document.body.firstChild);
iFrame.innerHTML ="Loading...";
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      iFrame.innerHTML =this.responseText;
    }
};
xhttp.open("GET", 'https://foodieforfoodie.herokuapp.com/', true);
xhttp.send();
