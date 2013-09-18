(function (w) {
    var NIFTY={};
    NIFTY.html = function (html, data) {
        return NIFTY.replace(html, data).replace(/\{\{.*\}\}/g, '');
    }
    
    NIFTY.tmpl = function(tmpl, data){
        return NIFTY.html(document.getElementById(tmpl).innerHTML, data);
    }
    
    NIFTY.dom = function(tmpl, data){
        var elem=document.createElement('div');        
        elem.innerHTML=NIFTY.tmpl(tmpl, data);
        return elem.firstChild;
    }
    
    NIFTY.replace=function (html,data,parent){
        parent=parent || '';
        for(prop in data){
            var inject;
            if(typeof data[prop] === 'function'){
                inject=data[prop]();
                if(typeof inject !='string'){
                    inject= '';
                }
            }
            else if(typeof data[prop] === 'object'){
                return NIFTY.replace(html, data[prop], prop+'.');
            }
            else {
                inject=data[prop];
            }
        
            html = html.replace('{{'+parent+prop+'}}', inject);
        }
        return html
    }
    
    w.NIFTY=NIFTY;
    
}(window));