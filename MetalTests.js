//var casper = require('casper').create();
var x = require('casper').selectXPath;

//Uncomment to run the tests as mobile...
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 Twitter for iPhone');

casper.test.begin('Front page tests', 1, function(test) {
    casper.start("http://metalminnie.com", function () {
        "use strict";
        test.assertTitle("MetalMinnie: The home of finest sliver.");
    }, true);

    casper.run(function(){
        test.done();
    });
});

casper.test.begin('Can book a free taster', 5, function(test) {
    casper.start("http://metalminnie.com/", function () {
        "use strict";
        test.assertTitle("MetalMinnie: The home of finest sliver.");

        this.clickLabel('Purchase high quality silver items from our website.','a');
    }, true);

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'http://metalminnie.com/shop/silver/categories/Direct-Sales.html');

        //this.waitForSelector('//a');
        this.click(x('//div/a[contains(text(), "Other")]'));
        //[@href="../items/../../../shop/silver/categories/Direct-Sales-Other.html#t"]
    });

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'http://metalminnie.com/shop/silver/categories/Direct-Sales-Other.html#t');
        this.click(x('//div/a[contains(text(), "CASED VICTORIAN 9CT GOLD PROPELLING MECHANICAL PENCIL")]'));
    });

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'http://metalminnie.com/shop/silver/items/CASED-VICTORIAN-9CT-GOLD-PROPELLING-MECHANICAL-PENCIL-S1386245773114.html#t');
        this.fill('form[action="https://www.paypal.com/cgi-bin/webscr"]', { }, true);
    });
    casper.then(function(){
        casper.wait(3000, function(){});
    });
    casper.then(function() {
        test.assertHttpStatus(200);
    });

    casper.run(function(){
        test.done();
    });
});
