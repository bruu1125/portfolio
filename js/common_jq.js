$(function(){
    AOS.init({
        offset: 150,
        easing: 'ease-out',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom'
    });

    let lastScrollTop = 0;
    const delta = 100;

    $(window).scroll(function(event){
        const st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if((st > lastScrollTop) && (lastScrollTop > 0)) {
            $('.header').addClass('header-hide');
        } else {
            $('.header').removeClass('header-hide');
        }

        if((st < lastScrollTop) && (lastScrollTop > 0)) {
            $('.navi').addClass('navi-show');
        } else {
            $('.navi').removeClass('navi-show');
            $('.fixed-top').addClass('fixed-top-show');
            $('.fixed-contact').addClass('fixed-contact-y');
        }

        // index 섹션 진입 시 .navi-show 클래스 제거
        var indexOffset = $('.index').offset().top;
        var indexHeight = $('.index').height();
        if (st >= indexOffset - $(window).height() && st < indexOffset + (indexHeight * 0.5)) {
            $('.navi').removeClass('navi-show');
            $('.fixed-top').removeClass('fixed-top-show');
            $('.fixed-contact').removeClass('fixed-contact-y');
        }

        lastScrollTop = st;
    });

    $("input[type=radio]").each(function(){ 
        var chk = $(this).is(":checked");
        var name = $(this).attr('name');
        if(chk == true) 
            $("input[name='"+name+"']").data("previous",$(this).val());
    });

    $("input[type=radio]").click(function(){
        var pre = $(this).data("previous");
        var chk = $(this).is(":checked");
        var name = $(this).attr('name');
        if(chk == true && pre == $(this).val()){
            $(this).prop('checked',false);
            $("input[name='"+name+"']").data("previous",'');
        } else {
            if(chk == true) 
                $("input[name='"+name+"']").data("previous",$(this).val());
        }
    });
});