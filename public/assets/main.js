$(document).ready(function() {
    console.log($('#mov-keyword').text())
    $('#movie-input').val($('#mov-keyword').text());

    var mov_arr = [];
    $('.btn-nominate').click(function() {
        if (!$(this).hasClass('disabled')) {
            console.log("HElloooo " + $(this).siblings('input.nom_title').val());
            $title = $(this).siblings('input.nom_title').val();
            mov_arr.push($title);
            console.log(mov_arr);
            $('#nomination_list').append('<li class="list-group-item">' + $title + ' <button class="btn btn-danger btn-xs rem_mov"><i class="fa fa-times"></i></button></li>');
            $(this).addClass("disabled");
            if (mov_arr.length == 5) {
                $('.notices').append('<div class="alert alert-danger" role="alert"> You have added 5 nominations!</div>')
                $('.btn-nominate').addClass('disabled');
            }
        }
    });

    $('#nomination_list').on('click', 'button.rem_mov', function(events) {
        $(this).parents('.list-group-item').fadeOut(300, function() { $(this).remove() });
        console.log("Arr " + mov_arr);
    });

    if ($('#nomination_list').children.length == 5) {
        window.alert("Hello 5");
    }
});