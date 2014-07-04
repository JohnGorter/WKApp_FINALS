var games = new Array();

function getGameByTitle(title) {
    for (var game in games)
        if (games[game].title == title)
            return games[game];
    return null;
}

$(function () {


    $(function () {
        $("#status").css('background-color', navigator.onLine ? 'green' : 'red');

        window.addEventListener("online", function () {

            console.log('sync our localstorage to the server');

            $("#status").css('background-color', 'green');
        }, false);
        window.addEventListener("offline", function () {
            $("#status").css('background-color', 'red');
        }, false);
    });


    var list = document.getElementById("list");
    list.ondragover = function () {
        return false;
    };
    list.ondragend = function () {
        return false;
    };
    list.ondrop = function (event) {
        var fr = new FileReader();
        fr.onload = function (data) {
            var newgames = JSON.parse(data.target.result);
            for (var g in newgames)
                games.push(newgames[g]);

            window.localStorage['gamesarray'] = JSON.stringify(games);
            populateList();

        };
        fr.readAsText(event.dataTransfer.files[0]);       
        
        return false;
    };
    


    populateList();

    $("#game").keyup(function () {
        if (this.value == "") {
             $("#gamespan").removeClass("hidden");
             $("#gameinputdiv").addClass("has-error");
        } else {
            $("#gamespan").addClass("hidden");
            $("#gameinputdiv").removeClass("has-error");
        }
    });

    $("#ullist").click(function (e) {
        var g = getGameByTitle($(window.event.srcElement).text());
        $("#list2 h1").text(g.title);
        $("#list2 p").text(g.description);
        makeMap(g);
    });

    $("#btnSave").click(function () {
        var game = $("#game").val();
        var description = $("#description").val();
        var date = $("#date").val();

        $("#gamespan").addClass("hidden");
        $("#gameinputdiv").removeClass("has-error");
        
        if (game == "") {
            $("#gamespan").removeClass("hidden");
            $("#gameinputdiv").addClass("has-error");
            $("#game").focus();
            window.event.preventDefault();
            window.event.stopPropagation();
            return;
        }


        // stuff the data into localStorage
        window.navigator.geolocation.getCurrentPosition(function (data) {
            var g = {
                'title': game,
                'description': description,
                'date': date,
                'lat' : data.coords.latitude,
                'long' : data.coords.longitude
            };
            games.push(g);

            if (navigator.onLine)
                console.log('store single game on the server ' + g.title);
            else {
                console.log('store single game locally ' + g.title);
                window.localStorage['gamesarray'] = JSON.stringify(games);
            }

            populateList();
        }, function (error) {
            var g = {
                'title': game,
                'description': description,
                'date': date,
                'lat': 0,
                'long': 0
            };
            games.push(g);

            if (navigator.onLine)
                console.log('store single game on the server ' + g.title);
            else {
                console.log('store single game locally ' + g.title);
                window.localStorage['gamesarray'] = JSON.stringify(games);
            }

            populateList();
        });

        //$.ajax({
        //    url: '/game/AddGamesJSON', cache: false, dataType: 'JSON', method: 'POST',
        //    data: { 'title': game, 'description': description, 'date': date },
        //    success: function () { populateList(); }
        //});
       
        $(".container").append("<div class='alert alert-info'><button data-dismiss='alert' class='close'>&times;</button><strong>Game</strong> inserted!</div>");
        $(".alert").delay(2000).fadeOut(200);
        $("#game").val('');
        $("#description").val('');
        $("#date").val('');
        $("#game").focus();
    });
});

function populateList() {
    $("#ullist").html('');
    if (navigator.onLine)
        console.log('haal de games van de server af');
        //games = ... van de server
    else {
        if ('gamesarray' in window.localStorage) {
            console.log('retrieving games locally');
            games = JSON.parse(window.localStorage['gamesarray']);
        }
    }
    for (var g in games)
      insertGame(games[g]);
}

    //$.ajax({
    //    url: '/game/getgamesjson', cache: false, dataType: 'JSON',
    //    success: function (data) {
    //        $("#ullist").html('');
    //        for (var game in data)
    //            insertGame(data[game]);
    //    }});


function insertGame(g) {
    $("<tr>")
        .append($("<td>")
        .append($("<button class='popover-dismiss btn btn-link btn-xs'>").attr('data-toggle', 'popover').attr('data-content', g.description == "" ? "-no description-" : g.description).attr('title', g.title).text(g.title)))
        .appendTo($("#ullist"));
}


function makeMap(g) {
    var mapcanvas = $('<div id="mapcanvas">').css('border','1px solid black').css('height', '170px').css('width', '100%');
    $("#list2map").html("").append(mapcanvas);

    var latlng = new google.maps.LatLng(g.lat, g.long);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($("#mapcanvas").get(0), myOptions);

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Game inserted here"
    });
}