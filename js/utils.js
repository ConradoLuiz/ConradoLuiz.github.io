

if(window.innerWidth < 700){

    let toggle = false;

    $('#menu-toggle').on('click', function () {
        // console.log('menu');
        $('nav').css('display', 'flex');
        toggle = true;
    });

    $('nav a').on('click', function(){
        $('nav').css('display', 'none');
        toggle = false;
    })

}
