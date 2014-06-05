test( "Always passes", function() {
  ok( 1 == "1", "Passed!" );
});

module( "Core replacements" );
test("Basic replacement", function(){
   var HTML="{{test}}",
       data={test:"a hard test"};
       
   ok(NIFTY.replace(HTML, data)=='a hard test') 
});

test("Multi replacement", function(){
   var HTML="{{test}} OR {{test}}",
       data={test:"a thing"};
       
   ok(NIFTY.replace(HTML, data)=='a thing OR a thing') 
});

test("Basic replacement functions", function(){
   var HTML="{{test}}",
       data={test:function(){return "a new test"}};
       
   ok(NIFTY.replace(HTML, data)=='a new test') 
});

test("Basic replacement objects", function(){
   var HTML="{{test.sub}}",
       data={test:{sub:'a sub value'}};
       
   ok(NIFTY.replace(HTML, data)=='a sub value') 
});

module( "HTML string generation" );

test("Generate HTML from string template", function(){
    var HTML="<p>{{test}}</p>",
        data={test:"a test"};
        
    ok(NIFTY.html(HTML, data)=="<p>a test</p>");
});


test("Generate HTML from string template, missing attributes", function(){
    var HTML="<p>{{test}}<br>{{nothere}}</p>",
        data={test:"a test"};
        
    ok(NIFTY.html(HTML, data)=="<p>a test<br></p>");
});

test("Generate HTML from string template, functions and sub objects", function(){
    var HTML="<p>{{test}}<br>{{nothere}}<br>{{func}}<br>{{sub.data}}</p>",
        data={test:"a test", func:function(){return "tulip"}, sub:{data:"hamster"}};
        
    ok(NIFTY.html(HTML, data)=="<p>a test<br><br>tulip<br>hamster</p>");
});

test("Non string function return becomes empty string", function(){
    var HTML="<p>{{func}}</p>",
        data={func:function(){return {data:'test'}}};
        ok(NIFTY.html(HTML, data)=="<p></p>");
});

module( "Templates replacements" );

test("Test script templates", function(){
    var data={test:'test data 1'};
    ok(NIFTY.tmpl('test-tmpl-1', data)=='<div>test data 1</div>')
});

test("DOM elements for inject", function(){
    var data={test:'test data 2'},
        node=NIFTY.dom('test-tmpl-1', data);
    ok(typeof node == "object" &&
         "nodeType" in node &&
       node.nodeType === 1 && 
       node.cloneNode)
});

