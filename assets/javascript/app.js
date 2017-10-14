var topics = ["starwars", "this", "that", "spam", "eggs"];


function generateDefaultButtons(arr){
    for(var i in arr){
        newBtn = $("<button>");
        newBtn.addClass("topic_button");
        newBtn.html(topics[i]);
        $("#button_container").append(newBtn);
    };
};











$(document).ready(function(){
    generateDefaultButtons(topics);
});