var topics = ["Dogs", "Cats", "spam", "eggs"];
var API_KEY = "oWToCZYtmemH3h03mDlBacumloDRazdd";
var BASE_URL = "https://api.giphy.com/v1/gifs/search"

var queryObj = {
    'api_key': API_KEY,
    'q': "",
    'limit': '10',
    'rating': 'pg',
};


function generateDefaultButtons(arr){
    for(var i in arr){
        createButton(arr[i]);
    };
};

function createButton(text){

    topics.push(text);
    var newBtn = $("<button>");
    newBtn.addClass("topic_button");
    newBtn.html(text);
    newBtn.attr("id", text + "_button");
    newBtn.attr("onclick", "topicButtonPress('" + text + "')")

    $("#button_container").append(newBtn);
};

function displayGifs(array){
    for(i in array){
        var div = $("<div class='frame'></div>");
        var gif = $("<img>");
        var rating = $("<p>Rating: " + array[i]["rating"] + "</p>");
        var data = {
            "still": array[i]["images"]["fixed_height_still"]["url"],
            "animate": array[i]["images"]["fixed_height"]["url"],
            "state": "still",
        };
        gif.addClass("gif");
        gif.data(data)
        gif.attr("id", "gif" + i.toString());
        gif.attr("src", gif.data("still"));
        div.append(gif);
        div.append(rating);

        $("#gifs").append(div);

    };
    $(".gif").on("click", function(ev){
        gifPress(ev);
    });
};


function topicButtonPress(input){
    $("#gifs").empty();
    queryObj['q'] = input
    var final_url = BASE_URL + "?" + $.param(queryObj);
    console.log(final_url);
    $.ajax({url: final_url, method: "GET"}).done(function(response){
        var gifArray = response["data"];
        displayGifs(gifArray);
    });
};

function addButtonPress(event){
    $("#response").text("")
    event.preventDefault()
    var validInput = true;
    var txt = $("#button_text").val();
    if(txt == ""){
        $("#response").text("Can't input a black topic")
        validInput = false;
    };
    if(topics.includes(txt)){
        $("#response").text("topic already exists");
        validInput = false;
    };
    if(validInput){createButton(txt);};

    $("#button_text").val("");
};

function gifPress(event){
    var id = event.currentTarget.id;
    var element = $("#" + id);
    if(element.data("state") == "still"){
        element.attr("src", element.data("animate"));
        element.data("state", "animate");
    }
    else{
        element.attr("src", element.data("still"));
        element.data("state", "still");
    };

};


$(document).ready(function(){
    generateDefaultButtons(topics);
    $("#add_button").on("click", function(ev){
        addButtonPress(ev);
    });
});
