$(document).ready(function (e) {
    /**/
    var heighthbody = document.documentElement.scrollHeight > window.innerHeight ? document.documentElement.scrollHeight : window.innerHeight;
    $('body').css('height', heighthbody);
    $('#wrapper').css('height', heighthbody);

    var heightimg = $('.box_utility_img').css('height');
    console.log('heightimg: ',heightimg);
    //$('.box_utility_content').css('height',heightimg);
  
});