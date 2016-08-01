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


            $.post('https://fuzzychat.herokuapp.com/chatterbot/',{text: message}, function (result) {
                console.log(result);

                $(".chat").append(
                    '<li class="other">' +
                    '<div class="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>' +
                    '<div class="msg">'+
                    '<p>'+result+'</p>' +
                    '</div>'+
                    '</div>' +
                    '</li>'
                );
                $(window).scrollTop(10000000000000);
            });
        }
    })
});