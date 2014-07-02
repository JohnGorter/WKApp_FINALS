// isready event MAIN entry point
$(function () {
    populateList();

    $("#game").keyup(function(){
        if (this.value == "") {
             $("#gamespan").removeClass("hidden");
             $("#gameinputdiv").addClass("has-error");
        } else {
            $("#gamespan").addClass("hidden");
            $("#gameinputdiv").removeClass("has-error");
        }
    });
    $("#btnSave").click(function(){
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
        
        $.ajax({
           url: '/game/AddGamesJSON', cache: false, dataType: 'JSON', method: 'POST', data: { 'title': game, 'description': description, 'date': date }, success: function () {
               populateList();
          }
        });
       
        $(".container").append("<div class='alert alert-info'><button data-dismiss='alert' class='close'>&times;</button><strong>Game</strong> inserted!</div>");
        $(".alert").delay(2000).fadeOut(200);
        
        $("#game").val('');
        $("#description").val('');
        $("#date").val('');
        $("#game").focus();
        
    });
   
});

function populateList() {
    $.ajax({
        url: '/game/getgamesjson', cache: false, dataType: 'JSON', success: function (data) {
            $("#ullist").html('');
            for (var game in data)
                insertGame(data[game]);
        }
    });
}

function insertGame(g) {
    $("<tr>").append($("<td>")
        .append($("<button class='popover-dismiss btn btn-link btn-xs'>")
                .attr('data-toggle', 'popover')
                .attr('data-content', g.description == "" ? "-no description-" : g.description)
                .attr('title', g.title)
                .text(g.title)
                .popover({ trigger: 'focus' }))
    ).appendTo($("#ullist"));
}




