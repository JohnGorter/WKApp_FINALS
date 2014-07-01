
// isready event MAIN entry point
$(function(){
    $("#btnSave").click(function(){
        $("<li>")
            .append($("<span>").text($("#game").val()))
            .append($("<span class='hide'>").text($("#description").val()))
        .appendTo($("#ullist"));});
    
    $("#ullist").on("click", "li", function(){
        $("#details").html('<h1>' + $("span:first", this).text() + '</h1><p>' + $("span:last", this).text() +'</p>');});
});



