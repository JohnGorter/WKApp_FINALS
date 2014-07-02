// isready event MAIN entry point
$(function(){
    $("button").popover();
    
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
        
        if ($("#ullist").data('values') != 'true') {
            $("#ullist").html('');
            $("#ullist").data('values', 'true')
        }
        
        $("<tr>").append($("<td>")
            .append($("<button class='popover-dismiss btn btn-link btn-xs'>")
                    .attr('data-toggle','popover')
                    .attr('data-content', description == "" ? "-no description-" : description)
                    .attr('title',game)
                    .text(game)
                    .popover({trigger: 'focus'}))
        ).appendTo($("#ullist"));
        
        $(".container").append("<div class='alert alert-info'><button data-dismiss='alert' class='close'>&times;</button><strong>Game</strong> inserted!</div>");
        $(".alert").delay(2000).fadeOut(200);
        
        $("#game").val('');
        $("#description").val('');
        $("#date").val('');
        $("#game").focus();
        
    });
   
});



