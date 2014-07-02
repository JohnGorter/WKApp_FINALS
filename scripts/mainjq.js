
// isready event MAIN entry point
$(function(){
    
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
        
        $("#gamespan").addClass("hidden");
        $("#gameinputdiv").removeClass("has-error");
        
        if (game == "") {
             $("#gamespan").removeClass("hidden");
             $("#gameinputdiv").addClass("has-error");
             $("#game").focus();
             return;
        }
        $("<li>")
            .append($("<span>").text($("#game").val()))
            .append($("<span class='hide'>").text($("#description").val()))
        .appendTo($("#ullist"));
        
        $("form").append("<div class='alert alert-info'><button data-dismiss='alert' class='close'>&times;</button><strong>Game</strong> inserted!</div>");
        $(".alert").delay(2000).fadeOut(200);
        
        $("#game").val('');
        $("#description").val('');
        $("#date").val('');
         $("#game").focus();
         
        });
    
    $("#ullist").on("click", "li", function(){
        $("#details").html('<h1>' + $("span:first", this).text() + '</h1><p>' + $("span:last", this).text() +'</p>');
        
        });
});



