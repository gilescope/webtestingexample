//var casper = require('casper').create();
var x = require('casper').selectXPath;

//Uncomment to run the tests as mobile...
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 Twitter for iPhone');

casper.test.begin('Front page tests', 1, function(test) {
    casper.start("http://crossfitblackwater.com", function () {
        "use strict";
        test.assertTitle("CrossFit Blackwater, Witham's Premier CrossFit box. Witham, Essex.");

    }, true);

    casper.run(function(){
        test.done();
    });
});

casper.test.begin('Can book a free taster', 5, function(test) {
    casper.start("http://crossfitblackwater.com", function () {
        "use strict";
        test.assertTitle("CrossFit Blackwater, Witham's Premier CrossFit box. Witham, Essex.");

        this.clickLabel('Programs','a');
        this.clickLabel('CrossFit Taster','a');
    }, true);

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'https://crossfitblackwater.com/free-gym-taster-witham/');

        this.clickLabel('Book my free taster!', 'span');
    });

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'https://goteamup.com/p/174765-blackwater-health-and-fit/auth/9096/');
        this.back();
    });

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'https://crossfitblackwater.com/free-gym-taster-witham/');

        this.clickLabel('Already sold? See Membership Deals', 'span');
    });

    casper.then(function() {
        test.assertEquals(this.getCurrentUrl(), 'https://crossfitblackwater.com/membership/');
    });

    casper.run(function(){
        test.done();
    });
});

casper.test.begin('Membership tests', 2, function(test) {

    casper.start("http://crossfitblackwater.com/membership", function(){
        "use strict";
        test.assertTitle("Membership Packages - CrossFit Blackwater");

        this.clickLabel('Get Started', 'span');
    }, true);

    casper.then(function() {
        test.assertTrue(this.getCurrentUrl().startsWith('https://goteamup.com/w174765/p/174765-blackwater-health-and-fit/memberships/'));
    });

    casper.run(function(){
        test.done();
    });
});