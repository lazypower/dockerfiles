/*! SHOUTcast & Icecast Radio Player  v1.1 (2/7/17) | (c) 2017, Danial Sabagh | http://danialsabagh.com | http://mersadesign.com */
(function ($) {
    "use strict";

    $(".shiPlayer").append('<div class="blur"></div>' +
        '<div class="mainSection"><div class="panel1"><div class="top"><div class="trackTitle">Track Title</div><div class="trackSinger">Track Artist</div></div><div class="middle"><div class="centered-vertically"></div><div class="play"><div class="playpausebtn icon-play-r"></div><div class="frontTiming">00:00 / </div></div></div></div>' +
        '<div class="panel2" style="display:none"><ul></ul></div>' +
        '<div class="panel3" style="display:none"><div class="rLogo" alt="" title=""></div><div class="rName"><span class="icon-radio-tower"></span><span class="ct"></span></div><div class="cListeners"><span class="icon-headphones"></span><span class="ct"></span></div><div class="pListeners"><span class="icon-power"></span><span class="ct"></span></div><div class="rSite"><span class="icon-link"></span><span class="ct"></span><a target="_blank" href="" title="Stream Website" >Stream Website</a></div><div class="rTags"><span class="icon-tag"></span></div></div></div>' +
        '<div class="dashboard"><div class="centered-vertically"></div><div class="icon-Info"></div><div class="icon-history2"></div><div class="live" style="width: 50px"><div class="bliking"></div><div class="icon"></div></div><div class="sound shake icon-volume-high"></div><!--<div class="share-button "><div href="#" class="social-toggle icon-share"></div><div class="social-networks"><ul><li class="social-twitter icon-twitter"><a target="_blank" href="#"></a></li><li class="social-facebook icon-facebook"><a target="_blank" href="#"></a></li><li class="social-gplus icon-google-plus"><a target="_blank" href="#"></a></li><li class="social-email icon-email"><a target="_blank" href="#"></a></li></ul></div></div>--></div>');

    $.fn.shiPlayer = function (options) {
        var settings = $.extend({
            // The defaults
            type: "",
            URL: "",
            lastFMkey: "665b8ff2830d494379dbce3fb3b218a9",
            mount_point: "",
            cors_proxy: "",
            stream_id: 1,
            streampath: "/stream?icy=http",
            radio_logo: "",
            default_image: "./img/default_artwork.jpg",
            blurriness: "",
            autoplay: false

        }, options);
        var thisObj;
        thisObj = this;
        var audio;
        var ppBtn = $(".playpausebtn", thisObj);

        audio = new Audio();
        audio.volume = 1;


        thisObj.each(function () {
            //Settings
            if(settings.radio_logo.length > 0){
                $("div.panel3 > div.rLogo", thisObj).css('background-image', 'url(' + settings.radio_logo + ')');
            }
            if(settings.blurriness.length > 0){
                $("div.blur", thisObj).css({
                    'filter': 'blur(' + settings.blurriness + ')',
                    '-webkit-filter': 'blur(' + settings.blurriness + ')',
                    '-moz-filter': 'blur(' + settings.blurriness + ')',
                    '-ms-filter': 'blur(' + settings.blurriness + ')',
                    '-o-filter': 'blur(' + settings.blurriness + ')'
                })
            }
            if (settings.autoplay){
                audio.autoplay = true;
            }
            ShareImplementation();


            if (settings.type.toLowerCase() == "shoutcast") {

                audio.src = settings.URL + settings.streampath;
                var dataURL = settings.URL + "/stats?sid="+ settings.stream_id +"&json=1&callback=?";
                var hisURL = settings.URL + "/played?sid="+ settings.stream_id +"&type=json&callback=?";

                updateSH(dataURL, hisURL);
            }
            else if (settings.type.toLowerCase() == "icecast") {
                audio.src = settings.URL + "/" + settings.mount_point;
                var dataURL = settings.cors_proxy + settings.URL + "/status-json.xsl";

                updateIC(dataURL);
            }

        });


        $(audio).on("playing", function () {
            togglePlying(ppBtn, true);
            $(ppBtn).addClass("icon-stop-r");
            $(ppBtn).removeClass("icon-play-r");
        });
        $(audio).on("pause", function () {
            togglePlying(ppBtn, false);
            $(ppBtn).removeClass("icon-stop-r");
            $(ppBtn).addClass("icon-play-r");
        });
        $(audio).on("timeupdate", function () {
            $(".frontTiming", thisObj).text(getReadableTime(this.currentTime));//.append("<span class='inf'>∞</span>");
        });


        // Buttons
        $(ppBtn, thisObj).on("click tap", function () {
            playManagement();
        });
        $(".sound", thisObj).on("click tap", function() {
            if($(this).hasClass("icon-volume-mute2")){
                $(audio).animate({volume: 1}, 500);
                $(this, thisObj).removeClass("icon-volume-mute2", 1000, "linear" );
            }
            else{
                $(audio).animate({volume: 0}, 500);
                $(this, thisObj).addClass("icon-volume-mute2", 1000, "linear" );
            }
            closeShareButton();
        });


        //Utility Functions
        function togglePlying(aClassName, bool) {
            $(aClassName).toggleClass("playing", bool);
        }

        function playManagement() {
            if (audio.paused) {
                setTimeout(function () {
                    audio.play();
                }, 150);

                var $playing = $('.playpausebtn.playing');
                if ($(thisObj).find($playing).length === 0) {
                    $playing.click();
                }

                $(thisObj).addClass("bekhon");
                $(".shiPlayer", thisObj).removeClass("nakhon ");
            } else {
                audio.pause();

                $(thisObj).addClass("nakhon");
                $(".shiPlayer", thisObj).removeClass("bekhon");
            }

        }

        function getReadableTime(value) {
            //Convert milisec to "readable" time
            if (value == "Infinity") {
                return "live";
            } else {
                var durmins = Math.floor(value / 60);
                var dursecs = Math.floor(value - durmins * 60);
                if (dursecs < 10) {
                    dursecs = "0" + dursecs;
                }
                if (durmins < 10) {
                    durmins = "0" + durmins;
                }
                return durmins + ":" + dursecs + " / ";
            }

        }

        function splitter(text, ref) {
            if(text === undefined){
                text = "undefined - undefined";
            }
            if(text.indexOf('-') > -1) {
                var [artist, title] = text.split(/-(.+)?/);
                if (ref == "artist") {
                    return artist.trim();
                }
                else if (ref == "title") {
                    return title.trim();
                }
            }
            else{
                console.log("The track name is not separated by - (dash)!");
                if (ref == "artist") {
                    return "";
                }
                else if (ref == "title") {
                    return text;
                }
            }
        }

        function updateArtist(name) {
            $(".trackSinger", thisObj).attr("data-text", name).text(textShortener(name, 30));
        }

        function updateTitle(name) {
            $(".trackTitle", thisObj).attr("data-text", name).text(textShortener(name, 25));
        }

        function updateTag(data) {
            $(thisObj).attr("data-tag", data);
        }

        function getImage(artist) {
            artist = prepareArtistName(artist);
            artist = encodeURI(artist);

            var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + settings.lastFMkey + "&format=json";
            $.getJSON(url, function (data) {
                var image = settings.default_image;
                if(data.error){
                    console.log(data.message);
                    console.log("The above error is for " + encodeURI(artist));
                }
                else if(data.artist.image[data.artist.image.length - 1]["#text"].length > 0){
                    image = data.artist.image[data.artist.image.length - 1]["#text"];
                }
                else{
                    console.log("No image is associated with \'"+ decodeURI(artist) + "\' on Last.FM!")
                }

                $(".blur", thisObj).css("background-image", "url(" + image + ")");
            })
                .error(function() { console.log("#getImage(), Error in loading artist background image for "  + decodeURI(artist)); });

        }

        function getTag() {
            return $(thisObj).attr("data-tag");
        }

        function updateSH(url, history) {
            setInterval(function () {
                $.getJSON(url, function (data) {
                    if (data.songtitle != getTag()) {
                        updateTag(data.songtitle);
                        var artist = splitter(data.songtitle, "artist");
                        var title = splitter(data.songtitle, "title");
                        updateArtist(artist);
                        updateTitle(title);
                        getImage(artist);


                        updateHistory(history);
                        getNextSong(data);
                        updateServerInfoSH(data);
                    }
                })
                    .error(function() { console.log("Error, in loading ShoutCast " + url); });
            }, 750);
        }

        function updateHistory(url) {
            $(".panel2 ul li", thisObj).remove();
            $.getJSON(url, function (data) {
                for (var i = 0; i < data.length; i++) {
                    var rowNum = i;
                    var artist = splitter(data[i].title, "artist");
                    var title = splitter(data[i].title, "title");
                    var listVal = rowNum;
                    if (rowNum === 0) {
                        listVal = "NOW";
                    }

                    var artistTEMP = textShortener(artist, 20);
                    var titleTEMP = textShortener(title, 28);

                    $(".panel2 ul", thisObj).append(
                        "<li class='list' id='row" + rowNum + "'>" +
                        "<div class='leftBox'><div class='listNum'><span>" + listVal + "</span></div>" +
                        "<p class='title'>" + titleTEMP + "</p>" +
                        "<p class='singer'>" + artistTEMP + "  " + getTime(data[i].playedat) + "</p>" +
                        "</div>" +
                        "<div class='rightBox'>" +
                        "<div class='artwork'></div>" +
                        "</div>" +
                        "</li>"
                    );
                    getImageList(artist, rowNum);
                }
            });
        }

        function getImageList(artist, i) {
            artist = prepareArtistName(artist);
            artist = encodeURI(artist);

            var url = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=" + settings.lastFMkey + "&format=json";
            $.getJSON(url, function (data) {
                var image = settings.default_image;
                if(data.error){
                    // Do nothing
                }
                else if(data.artist.image[data.artist.image.length - 1]["#text"].length > 0){
                    image = data.artist.image[data.artist.image.length - 1]["#text"];
                }

                $("li#row" + i + ".list > div.rightBox > div.artwork", thisObj).css("background-image", "url(" + image + ")");
            })
                .error(function() { console.log("#getImageList(), Error in loading history image list for "  + decodeURI(artist)); });
        }

        function getNextSong(data) {
            setTimeout(function () {
                if(data.nexttitle !== undefined){
                    var artist = splitter(data.nexttitle, "artist");
                    var title = splitter(data.nexttitle, "title");

                    var artistTEMP = textShortener(artist, 20);
                    var titleTEMP = textShortener(title, 28);

                    $(".panel2 ul li.list#row0", thisObj).before(
                        "<li class='list' id='row" + "NEXT" + "'>" +
                        "<div class='leftBox'><div class='listNum nxttrack'><span>" + "NEXT" + "</span></div>" +
                        "<p class='title'>" + titleTEMP + "</p>" +
                        "<p class='singer'>" + artistTEMP + "</p>" +
                        "</div>" +
                        "<div class='rightBox'>" +
                        "<div class='artwork'></div>" +
                        "</div>" +
                        "</li>"
                    );
                    getImageList(artist, "NEXT");
                }

            }, 2000);
        }

        function getTime(unixtimestamp) {
            var dt = eval(unixtimestamp * 1000);
            var myDate = new Date(dt);
            var mt = myDate.toTimeString();
            return "<span class='playedAT'>" + mt.substring(0, 9) + "</span>";
        }

        function updateServerInfoSH(data) {
            $("div.rName > .ct", thisObj).text(data.servertitle);
            $("div.cListeners > .ct", thisObj).text("Current Listeners: " + data.currentlisteners);
            $("div.pListeners > .ct", thisObj).text("Peak Listeners: " + data.peaklisteners);
            $("div.rSite > a", thisObj).attr("href", data.serverurl);
            $("div.rTags > .tg", thisObj).remove();


            let result = [];
            Object.keys(data).forEach( key => {
                if(/servergenre/.test(key)){
                    result.push(data[key])
                }
            });

            for(var i =0; i < result.length; i++){
                if(result[i] !== "") {
                    $("div.rTags", thisObj).append("<span class='tg'>" + result[i] + "</span>")
                }
            }

        }

        // ICECAST
        function updateIC(url) {
            setInterval(function () {
                $.getJSON(url, function (data) {
                    var dataBit = findMountPointData(data);

                    if (dataBit.title != getTag()) {
                        updateTag(dataBit.title);
                        var artist = splitter(dataBit.title, "artist");
                        var title = splitter(dataBit.title, "title");
                        updateArtist(artist);
                        updateTitle(title);
                        getImage(artist);


                        if(history.length >= 20){
                            history = [];
                        }

                        updateHistoryIC(artist, title);
                        updateServerInfoIC(dataBit);

                    }
                })
                    .error(function() { console.log("Error, in loading Icecast " + url); });;
            }, 750);
        }

        function findMountPointData(data) {
            if (data.icestats.source.length === undefined){
                return data.icestats.source
            }
            else{
                for (var i = 0; i < data.icestats.source.length; i++) {
                    var str = data.icestats.source[i].listenurl;
                    if (str.indexOf(settings.mount_point) >= 0) {
                        return data.icestats.source[i];
                    }
                }
            }
        }

        function updateHistoryIC(artist, title) {
            addToHistoryArray(title, artist, new Date().getTime() / 1000);
            history[history.length-1].tm = 0;
            createHistoryRows();
        }

        function updateServerInfoIC(data) {
            //console.log(data);
            $("div.rName > .ct", thisObj).text(data.server_name);
            $("div.cListeners > .ct", thisObj).text("Current Listeners: " + data.listeners);
            $("div.pListeners > .ct", thisObj).text("Peak Listeners: " + data.listener_peak);
            $("div.rSite > a", thisObj).attr("href", data.server_url);
            $("div.rTags > .tg", thisObj).remove();

            var result = data.genre.split(" ");
            for(var i =0; i < result.length; i++){
                if(result[i] !== "") {
                    $("div.rTags", thisObj).append("<span class='tg'>" + result[i] + "</span>")
                }
            }
        }

        function prepareArtistName(artist){
            artist = artist.toLowerCase();
            if (artist.includes("&")) {
                artist = artist.replace('&', 'and');
            }
            else if(artist.includes("feat")) {
                artist = artist.substr(0, artist.indexOf('feat'));
            } else if (artist.includes("ft")) {
                artist = artist.substr(0, artist.indexOf('ft'));
            }

            return artist;
        }

        var history = new Array();
        function addToHistoryArray(title, artist, time) {
            history.unshift({ar: artist, tt: title, tm: time});
        }

        function createHistoryRows(){
            $(".panel2 ul li", thisObj).remove();

            for(var i = 0; i < history.length; i++){
                var rowNum = i;
                var time = 0;
                var listVal = rowNum;

                if (rowNum === 0) {
                    listVal = "NOW";
                }

                if(i !== history.length-1){
                    time = getTime(history[i].tm);
                }else{
                    time = "";
                }

                var artist = history[i].ar;
                var title = history[i].tt;

                var artistTEMP = textShortener(artist, 20);
                var titleTEMP = textShortener(title, 28);

                $(".panel2 ul", thisObj).append(
                    "<li class='list' id='row" + rowNum + "'>" +
                    "<div class='leftBox'><div class='listNum'><span>" + listVal + "</span></div>" +
                    "<p class='title'>" + titleTEMP + "</p>" +
                    "<p class='singer'>" + artistTEMP + "  " + time + "</p>" +
                    "</div>" +
                    "<div class='rightBox'>" +
                    "<div class='artwork'></div>" +
                    "</div>" +
                    "</li>"
                );

                getImageList(history[i].ar, rowNum);
            }
        }


        // Share
        function setFBShareAttr(siteURL) {
            var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(siteURL);
            $("li.social-facebook", thisObj).find("a").attr("href", url);
        }

        function setTWShareAttr(siteURL) {
            var url = "https://twitter.com/home?status=" + encodeURIComponent(siteURL);
            $("li.social-twitter", thisObj).find("a").attr("href", url);
        }

        function setGPShareAttr(siteURL) {
            var url = "https://plus.google.com/share?url=" + encodeURIComponent(siteURL);
            $("li.social-gplus", thisObj).find("a").attr("href", url);
        }

        function setEmailAttr(siteURL) {
            var radioName = $("div.panel3 > div.rName > span.ct").text();

            var subjectText = "Listen to " + radioName;
            var bodyText = "Check out the radio station " + radioName + " on " + siteURL;

            var url = 'mailto:' + '' + '?subject=' + subjectText + '&body=' + bodyText;
            $(".social-email > a", thisObj).on("click tap", function(event) {
                event.preventDefault();
                window.location = url;

            });
        }

        function ShareImplementation() {
            // Share implementations
            setTimeout(function(){
                "use strict";
                var trackURL = window.location.href;
                setFBShareAttr(trackURL);
                setTWShareAttr(trackURL);
                setGPShareAttr(trackURL);
                setEmailAttr(trackURL);
            }, 3000);
        }

        function closeShareButton() {
            if ($(".social-networks", thisObj).hasClass("open-menu")) {
                $(".social-networks", thisObj).removeClass("open-menu");
            }
        }

        function textShortener(text, length){
            if(text.length > length){
                return text.substring(0, length - 1) + "...";
            }else{
                return text;
            }
        }




        // Third Party
        $('.social-toggle', thisObj).on('click', function () {
            $(this).next().toggleClass('open-menu');
        });
        $("div.icon-history2", thisObj).on("click", function () {
            $("div.icon-Info", thisObj).removeClass("pressed");
            $(this).toggleClass("pressed");
            var visibleObj = $('.mainSection > div:visible', thisObj);
            if ($("div.panel2", thisObj).css("display") == "none") {
                var inVisibleObj = $("div.panel2", thisObj)
            }
            else {
                var inVisibleObj = $("div.panel1", thisObj)
            }
            visibleObj.fadeOut(500, function () {
                inVisibleObj.fadeIn(500);
            });
            closeShareButton();
        });
        $("div.icon-Info", thisObj).on("click", function () {
            $("div.icon-history2", thisObj).removeClass("pressed");
            $(this).toggleClass("pressed");
            var visibleObj = $('.mainSection > div:visible', thisObj);
            if ($("div.panel3", thisObj).css("display") == "none") {
                var inVisibleObj = $("div.panel3", thisObj)
            }
            else {
                var inVisibleObj = $("div.panel1", thisObj)
            }
            visibleObj.fadeOut(500, function () {
                inVisibleObj.fadeIn(500);
            });

            closeShareButton();
        });


        // Keyboard
        $(window).keypress(function(e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault();
                if ($(thisObj).hasClass("bekhon")) {
                    audio.pause();
                    $(thisObj).removeClass("bekhon");
                    $(thisObj).addClass("nakhon");
                } else if ($(thisObj).hasClass("nakhon")) {
                    audio.play();
                    $(thisObj).removeClass("nakhon");
                    $(thisObj).addClass("bekhon");
                }
            }
        })
    };


})(jQuery);

