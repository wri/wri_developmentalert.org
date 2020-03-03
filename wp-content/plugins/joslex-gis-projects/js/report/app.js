(function(win, doc) {
    'use strict';

    var arcgis = {
        src: 'http://js.arcgis.com/3.12/',
        css: 'http://js.arcgis.com/3.12/esri/css/esri.css'
    }

    var version = 3;
    var URL = appConfig.jsUrl+"report/app";

    var css = [{
        'src': URL + '/css/base.css',
        'cdn': false
    }, {
        'src': 'http://js.arcgis.com/3.12/dijit/themes/claro/claro.css',
        'cdn': true
    }];


    var dojoConfig = {
        parseOnLoad: false,
        isDebug: false,
        async: true,
        cacheBust: "v=" + version
        // custom paths
        ,
        paths: {
            "Partials": URL + "/partials"
        },
        packages: [{
            name: "Libs",
            location: URL + "/js/libs"
        }, {
            name: "Main",
            location: URL + "/js/main"
        }, {
            name: "Map",
            location: URL + "/js/map"
        }, {
            name: "Models",
            location: URL + "/js/models"
        }, {
            name: "Utils",
            location: URL + "/js/utils"
        }],
        aliases: [
            ["MainController", "Main/Main"],

            ["MapController", "Map/MapController"],
            ["MapUI", "Map/MapUI"],
            ["MapConfig", "Map/MapConfig"],

            ["Model", "Models/Model"],
            ["ModelController", "Models/ModelController"],

            ["Delegator", "Utils/Delegator"],


            ["autoComplt", "Libs/autoComplt"],
            ["knockout", "Libs/knockout-3.1.0"],
            ["calendar","Libs/calendar"],


            ["esriRequest", "esri/request"],
            ["dom-construct", "dojo/dom-construct"],
            ["dom-style", "dojo/dom-style"],
            ["dom-class", "dojo/dom-class"],
            ["dom", "dojo/dom"],
            ["parser", "dojo/parser"],
            ["registry", "dijit/registry"],
            ["deferred", "dojo/Deferred"],
            ["array", "dojo/_base/array"],
            ["topic", "dojo/topic"],
            ["all", "dojo/promise/all"],
            ["Fx", "dojo/_base/fx"],
            ["has", "dojo/has"],
            ["on", "dojo/on"]
        ],
        deps: ["Main", "all", "dom", "dom-class", "dojo/ready", "dojo/domReady!"],
        callback: function(Main, all, dom, domClass, ready) {
            console.debug(dom.byId("app"))

            if (!dom.byId("app")) {
                throw new Error("div#app not defined", "home.js");
            }

            // Apply dojo class to body
            domClass.add(doc.body, "claro");
            Main.init(URL);
        } // End callback
    } // End dojoConfig



    var loadScript = function(src, attrs) {
        var s = doc.createElement('script');
        s.setAttribute('src', src);
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                s.setAttribute(key, attrs[key]);
            }
        }
        doc.getElementsByTagName('head')[0].appendChild(s);
    };

    var loadStyle = function(src, isCDN) {
        var l = doc.createElement('link'),
            path = isCDN ? src : src + "?v=" + version;
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('type', 'text/css');
        l.setAttribute('href', path);
        doc.getElementsByTagName('head')[0].appendChild(l);
    };

    var loadConfiguration = function() {
        win.dojoConfig = dojoConfig;
        loadScript(arcgis.src);
        loadStyle(arcgis.css, true);
        // Load css
        var i, files = css,
            length = files.length;
        for (i = 0; i < length; i++) {
            loadStyle(files[i].src, files[i].cdn);
        }
    };

    if (doc.readyState === "loaded") {
        loadConfiguration();
    } else {
        win.onload = loadConfiguration;
    }

})(window, document);