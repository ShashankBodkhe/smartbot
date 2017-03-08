$(document).ready(function() {
    $("#message").on('keyup', function (e) {
        if(e.key === 'Enter'){
            var message = $('#message').val();
            $('#message').val('');
            $(".chat").append(
                '<li class="self">' +
            '<div class="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="false"/></div>' +
                '<div class="msg">'+
                    '<p>'+message+'</p>' +
                '</div>'+
            '</div>' +
            '</li>'
            );
            $(window).scrollTop(10000000000000);


            $.post('http://127.0.0.1:8000/chatterbot/',{text: message}, function (response) {
                var tourNeeded,
                    tourName,
                    result;
                var textInTourNeededResponse = 'TourNeeded';
                response = filterResponse(response);
                var resultArray = response.split('&');
                if(resultArray[0]==0){
                    result = 'Sorry!I am not trained to answer this query yet.'
                }else{
                   result=resultArray[2];
                }
                if(result.indexOf(textInTourNeededResponse) >= 0 ) {
                    tourNeeded = true;
                    tourName = result.split(':')[1];
                    result = "Ok! Let me navigate you through " + tours[tourName];
                }

                $(".chat").append(
                    '<li class="other">' +
                    '<div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>' +
                    '<div class="msg">'+
                    '<p>'+result+'</p>' +
                    '</div>'+
                    '</div>' +
                    '</li>'
                );

                if(tourNeeded){
                    console.log('indicating that tour is needed');
                    if(window.location != window.top.location) {
                        window.top.postMessage({tourNeeded: true, tourName: tourName}, "*");
                    }
                    tourNeeded = false;
                }

                $(window).scrollTop(10000000000000);
            });
        }
    })
});

var filterResponse = function (data) {
    return data.replace(/"/g , "");
};

var tours = {
    "rewardsHub" : "Rewards And Benefits Center Experience.",
    "rewardsActivity" : "Rewards Activity Experience.",
    "accountsummary":"Your Account Summary"
};