//default buttons that appear on page load
var topics = ["Mass Effect", "Lord of the Rings" ,"Starwars" , "Game of Thrones"];


var API_KEY = "oWToCZYtmemH3h03mDlBacumloDRazdd";
var BASE_URL = "https://api.giphy.com/v1/gifs/search"

//object that will be passed as a parameter in a $.param() call
//'q' is determined by the button the user presses
var queryObj = {
    'api_key': API_KEY,
    'q': "",
    'limit': '10',
    'rating': 'pg',
};


function generateDefaultButtons(arr){//loops through an array (topics, in this case) and calls the createButton function on each item
    for(var i in arr){
        createButton(arr[i]);
    };
};

function createButton(text){//Creates a new button with html set to the text parameter
    //add text parameter to the 'topics' array
    topics.push(text);

    //create new button DOM element
    var newBtn = $("<button>");

    //assign 'topic_button' class to the button
    newBtn.addClass("topic_button");

    //set html equal to the text parameter
    newBtn.html(text);

    //set the 'id' attribute
    newBtn.attr("id", text + "_button");

    //set the onclick attribute to execute the topicButtonPress() function with text as the parameter
    newBtn.attr("onclick", "topicButtonPress('" + text + "')");

    //append new button to the button_container div
    $("#button_container").append(newBtn);
};

function displayGifs(array){//meat and potatoes

    //for every item in array...
    for(i in array){

        //create new <div> and assign it the frame class
        var div = $("<div class='frame'></div>");

        //create new <img> element
        var gif = $("<img>");

        //create <p> element and set html to the rating of the gif
        var rating = $("<p>Rating: " + array[i]["rating"] + "</p>");

        //create object with the animated url, still url, and current state
        //store object as a data-variable attached to the <img> elementd
        var data = {
            "still": array[i]["images"]["fixed_height_still"]["url"],
            "animate": array[i]["images"]["fixed_height"]["url"],
            "state": "still",
        };
        gif.data(data);

        //assign appropriate class and attributes
        gif.addClass("gif");
        gif.attr("id", "gif" + i.toString());
        gif.attr("src", gif.data("still"));

        //append the gif and the rating into the div
        div.append(gif);
        div.append(rating);

        //append frame into gif container
        $("#gifs").append(div);

    };
    $(".gif").on("click", function(ev){
        gifPress(ev);
    });
};

function topicButtonPress(input){//executes every time a topic button is pressed

    //delete all elements inside the #gifs div
    $("#gifs").empty();

    //set the 'q' attribute of the queryObj equal to the input parameter
    queryObj['q'] = input;

    //create the final url by passing the queryObj to the .param() function
    var final_url = BASE_URL + "?" + $.param(queryObj);

    //make ajax call using the final url
    $.ajax({url: final_url, method: "GET"}).done(function(response){

        //set gifArray equal to response["data"], which is an array of objects, each object holds all the
        //necessary info to display the gif
        var gifArray = response["data"];

        //pass gifArray into displayGifs() function
        displayGifs(gifArray);
    });
};

function createButtonPress(event){//executes every time the 'create button' button is pressed

    //delete the contents of the response div
    $("#response").text("");

    //magical function that I don't fully understand
    event.preventDefault();

    var validInput = true;

    //set txt equal to the current value of the 'button_text' text box
    var txt = $("#button_text").val();

    //check for invalid inputs
    if(txt == ""){
        $("#response").text("Can't input a black topic");
        validInput = false;
    };
    if(topics.includes(txt)){
        $("#response").text("Topic already exists");
        validInput = false;
    };
    //execute createButton if validInput is truef
    if(validInput){createButton(txt)};

    //clear the 'button_text' text box
    $("#button_text").val("");
};

function gifPress(event){//executes every time a gif is pressed

    //select element that was clicked
    var id = event.currentTarget.id;
    var element = $("#" + id);

    //read state, animate or freeze gif depending on state, swap state
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
        createButtonPress(ev);
    });
});
