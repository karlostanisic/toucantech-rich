$(document).ready(function(){
    $('.modal').modal();
    $('#form-member-emailAddress').blur(function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test($(this).val())) {
            $(this).addClass('warning');
        } else {
            $(this).removeClass('warning');
        }
    });
});