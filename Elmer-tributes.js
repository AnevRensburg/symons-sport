$(".message-link").click(function(event){
    const linkNumber = event.target.className.split("-")[2];
    console.log(linkNumber);
    $(".message-"+linkNumber).removeClass("hidden");
    $(".overlay").removeClass("hidden");
    $("body").css("position","fixed");
});
$(".fa-times-circle").click(function(event){
    $(".overlay").addClass("hidden");
    const linkNumber = event.target.className.split("-")[4];
    console.log(linkNumber);
    $(".message-"+linkNumber).addClass("hidden");
    $("body").css("position","static");
});