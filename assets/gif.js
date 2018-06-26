$(document).ready(function() {
    console.log("ready!");


    var animals = ["Wolf", "fox","dog","cat","Tiger"]
    var animal;
   



    $("#bContainer").on("click", ".Drect", function() {

        animal = $(this).attr("data-animal");

        console.log(animal);
        console.log("hello");

        displayAnimalGif();
    });

    function displayAnimalGif() {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7tGp5YYCPv9T3FNcTRLli4JLDAzbeJGJ&q=" + animal + "&limit=10&offset=0&rating=G&lang=en"
        var state = $(this).attr("data-state");
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);

            var results = response.data;
            console.log(results);



            for (var i = 0; i < results.length; i++) {


                var gifDiv = $("<div class='items'>");

                var rating = results[i].rating;


                var personImage = $("<img>");
                var klass="item"
                personImage.attr("src", results[i].images.fixed_height_still.url)
                personImage.attr("data-state", "still")
                personImage.attr("data-still", results[i].images.fixed_height_still.url)
                personImage.attr("data-animate", results[i].images.fixed_height.url)
                personImage.attr("class", klass);




                gifDiv.append(personImage);
                gifDiv.append("<br/>" + "Rating:" + rating);

                $("#gif-Container").prepend(gifDiv);









            }


        });

    };


    $("#gif-Container").on("click", ".item", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }



    });






    function makeButtons() {

        $("#bContainer").empty();

        for (var i = 0; i < animals.length; i++) {
            console.log("helloWorld");


            var a = $("<button>");
            a.addClass("Drect");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#bContainer").append(a);

        }

    }


    $("#add-animal").on("click", function(event) {
        event.preventDefault();


        var direct = $("#animal-input").val().trim();

        animals.push(direct);


        makeButtons();

    });



    makeButtons();


});