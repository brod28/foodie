var htmlEncode=function(html) {
    return document.createElement( 'a' ).appendChild( 
        document.createTextNode( html ) ).parentNode.innerHTML;
};

var getSelectionText = function () {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

var help_me = function () {

    console.log('foodies help_me started');
    console.log('foodies getSelectionText defined');
    var iframe = document.getElementById("foodie_to_foodie_iframe")
    if (iframe == undefined) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("id", "foodie_to_foodie_iframe");
        iframe.setAttribute("style", "width:20%;position: fixed;top: 0px;left: 80%;height:100%;overflow: auto; z-index: 2147483646;background-color:whitesmoke;");
        console.log('foodies selected ' + getSelectionText());
        document.body.insertBefore(iframe, document.body.firstChild);
    }
    iframe.src = 'https://foodieforfoodie.herokuapp.com/search/' + getSelectionText();
    var iframe_trace = document.getElementById("foodie_to_foodie_iframe_trace");
    iframe_trace.src = 'https://foodieforfoodie.herokuapp.com/api/tracer=query' + htmlEncode(tracer.toString());
    
    console.log('foodies iframe added');
    console.log('foodies help_me ended');
}

let addButton = function (text) {
    var div = document.createElement("div");
    div.innerHTML = '<button id="foodie_to_foodie_button" onclick="help_me()">' + text + '</button>';
    div.setAttribute("style", "position: fixed;top: 0px;right: 0;overflow: auto; z-index: 2147483647;background-color:whitesmoke;");
    div.setAttribute("id", "foodie_to_foodie_div");
    document.body.insertBefore(div, document.body.firstChild);
    console.log('foodies div added');
}

/*
let is_button = false;
foodie_config.data.forEach(function (element) {
    if (element.type == "include") {
        if (window.location.href.includes(element.pattern)) {
            addButton(element.text);
            is_button = true;
            console.log('foodies foodie_script button is there');
        }
    }
})*/

addButton('Check It');

let tracer=[];

function textSelected(e) {
    if(e.path[0].id!='foodie_to_foodie_button'){
        last_selected=e;
        let path='';
        let is_body_was=false;
        let counter=0;
        e.path.forEach(function(element){
            if(!is_body_was && counter<4){
                counter++;
                let node_name=(element.nodeName=='' || element.nodeName==undefined)?'':' '+element.nodeName.trim().toLowerCase();
                if(node_name==' body' || node_name==' html'){
                    is_body_was=true;
                }
                let class_name=(element.className=='' || element.className==undefined)?'':'.'+element.className.trim().replace(new RegExp(' ', 'g'), ".")
                path=node_name+class_name+path;
            }
        })
        path=path.trim();
        console.log();
        tracer=[];
        let elements=document.querySelectorAll(path);
        elements.forEach(function(element){
            let restaurant_name=element
            .innerHTML.replace(new RegExp("[0-9]?[0-9]?[0-9]?[0-9]?[0-9]."), "")
            .replace(new RegExp("[0-9]?[0-9]?[0-9]?[0-9]?[0-9] ."), "")
            .trim()
            tracer.push(restaurant_name);
        });
        tracer.push(path);
    
    }
}

window.document.onmouseup = textSelected;
window.document.onkeyup = textSelected;





console.log('foodies foodie_script loaded');

