function centerElements(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $('.b-for_old_browsers').css({
        width: windowWidth,
        height: windowHeight
    });
    $('.b-for_old_browsers__label').css({
        'margin-top': $('.b-for_old_browsers__label').height() * -0.5,
        'margin-left': $('.b-for_old_browsers__label').width() * -0.5
    });
}

$(window).load(function(){
    //    cloud-icon (story image) positioning
    $('.postImg').each(function(){
        var image = $(this).find('.postImg__img');
        var icon = $(this).find('.postImg__icon');
        $(icon).css('left', $(image).width() +15).show();
    });
    centerElements();
});
$(window).resize(function(){ centerElements() });


$(function(){
    /*story gallery lightbox*/
    $(".fancybox").fancybox({
        helpers : {
            title	: { type : 'inside' },
            overlay : {
                css : {
                    'background' : 'rgb(237,237,237)',
                    'background' : 'rgba(237,237,237,.5)'
                }
            }
        },
        padding: [20,75,20,75],
        nextEffect: 'none',
        prevEffect: 'none'
    });

//    $('#initialPreloaderFade .percent').css({
//        'height': $(window).height(),
//        'width': $(window).width()
//    });
    $('.historyText').autoresize();
    $('.postImg').each(function(){
        var icon = $(this).find('.postImg__icon');
        $(icon).hide();
    });


    var centering = function(obj){
        $(obj).each(function(){
            var parent = $(this).parent();
            var parentHeight = $(parent).height();
            var parentWidth = $(parent).width();
            $(this).css({
                'height': parentHeight,
                'width': parentWidth
            });
        });
    };
    //    centering content in cards (index page)
    centering($('.card__content'));



//    CUstom selectbox init
    $('select').selectBox();


	// Хаки для резиновой шапки
//	var headerInnerWidth = $('.header .inner').width();
//	$('.header ul.right').css('left', (headerInnerWidth / 2) + (headerInnerWidth / 4) + 'px');
//	$('.header ul.bottom').css('left', (headerInnerWidth / 2) + (headerInnerWidth / 4) + 'px');


    var $header = $('.indexPage .header');

    if ($header.length > 0) {
        $('.header').addClass('scroll-visible');

        $header.hover(
            function(){$header.addClass('hovered')},
            function(){$header.removeClass('hovered')}
        );

//        if($('html').hasClass('ie8')){
//            $(window).resize(function(){
//                var width = $(this).width();
//                var height = $(this).width();
//            });
//        }

        $(window).scroll(function () {

            var header_height = $header.height();
            var header_top = $(window).scrollTop();
            if (header_top > header_height) {
                header_top = header_height;
                $('.header').addClass('hidden');
                $('.header').removeClass('scroll-visible');
            } else {
                $('.header').removeClass('hidden');
                $('.header').addClass('scroll-visible');
            }
            if($('.header').onmouseover){
//                alert($('.header').onmouseover));
            }

            $header.css({top: -header_top});
            if($header.hasClass('hovered')){
                $header.css({top: 0});
            }

//            fade you
            if(header_top == 0){
                $('.b-pageIndex__down').removeClass('disabled').fadeIn('fast');
            }else{
                $('.b-pageIndex__down').addClass('disabled').fadeOut(600);
            }
        });

        $('#menu_mouse_over').mouseenter(function() {
            if (!$('.header').hasClass('scroll-visible')) {
                if ($('.header').hasClass('hidden')) {
                    $('.header.hidden').animate({
                        top: 0
                    }, 200, function() {
                        $('.header').removeClass('hidden');
                    });
                    $('.bottom-centered-logo').animate({
                        bottom:'-70px'
                    }, 200);
                    $('.scrollName').fadeOut(200);
                }
            }
        });

        $('.header').mouseleave(function() {
            if (!$('.header').hasClass('scroll-visible')) {
                if (!$('.header').hasClass('hidden')) {
                    $('.header').delay(250).animate({
                        top: '-185px'
                    }, 200, function() {
                        $('.header').addClass('hidden');
                    });
                    $('.bottom-centered-logo').delay(500).animate({
                        bottom: 0
                    }, 200);
                    $('.scrollName').delay(500).fadeIn(200);
                }
            }
        });

    }

	// Верхнее меню
//	$('.header.visible').delay(2000).addClass('hidden').animate({
//		top: '-185px'
//	}, 200);
//	$('.header.visible').removeClass('visible');



    $(".pin").css({backgroundSize: "cover"});

    /*
	$('.header.hidden .menuHover').hover(
		function(){
			$('.header.hidden').animate({
				top: 0,
			}, 200);
		},
		function(){
			$('.header.hidden').stop().delay(500).animate({
				top: '-185px',
			}, 200);
		}
	);
	*/

	if($('.tagBlock.items').height() > 120){
		$(this).css({
			height: '120px',
			overflow: 'hidden'
		})
	}

	$('input[placeholder], textarea[placeholder]').each(function(){
		$(this).placeholder();
	});
	// $('textarea')jtextarea();

	

	$('.addHistory .jq-file .name').text('Фотография к истории');

	$('.addHistory form input[type=submit].disable').click(function(){
		return false;
	});

	var changeTitle = false;
	var changeYear = false;
	var changeHistory = false;

	$('.addHistoryPage form .title').change(function(){
//        alert($(this).val());
        if($(this).val()){
            changeTitle = true;
        }else{changeTitle = false;}
		testHistoryForm();
	});

	$('.addHistoryPage form .selectOuter select').change(function(){
        if($(this).val()){
            changeHistory = true;
        }else{changeHistory = false;}
		testHistoryForm();
	});


    $('.addHistoryPage form .historyText').change(function(){
        if($(this).val()){
            changeYear = true;
        }else{changeYear = false;}
        testHistoryForm();
    });

	function testHistoryForm(){
		if(changeTitle && changeHistory && changeYear){
			$('.addHistoryPage form input[type=submit]').unbind('click');
			$('.addHistoryPage form input[type=submit]').removeClass('disable');
		}else{
            $('.addHistoryPage form input[type=submit]').bind('click');
            $('.addHistoryPage form input[type=submit]').addClass('disable');
        }
	}

	$('.addHistoryPage form input[type=submit].disable').live('click', function(){
		return false;
	});

	$('input[type=file]').each(function(){
		$(this).styler({
			browseText: 'Обзор'
		});
	});

	$('.detailStoryPage .leftStory').height($('.detailStoryPage .content').height() + 'px');
	$('.detailStoryPage .rightStory').height($('.detailStoryPage .content').height() + 'px');

	/*$('.myLenta .addHistory').click(function(){
		$('.modalWrap.reg').fadeIn();
		return false;
	});*/

	$('.modalWrap.reg .modalBlock .close').click(function(){
		$('.modalWrap.reg').fadeOut();
		return false;
	});

	$('.myLenta .historyInfo .delete').click(function(){
		$('.modalWrap.del').fadeIn();
		return false;
	});

	$('.modalWrap.del .modalBlock .close').click(function(){
		$('.modalWrap.del').fadeOut();
		return false;
	});

	$('.myLenta h1').click(function(){
		$('.modalWrap.app').fadeIn();
		return false;
	});

	$('.modalWrap.app .modalBlock .close').click(function(){
		$('.modalWrap.app').fadeOut();
		return false;
	});


//    input file hover
//    $('.selectFile input[type=file]').hover(function(){
//        $('.selectFile .browse').css({
//            'outline': '4px solid #ed1c3d'
//        });
//    },function(){
//        $('.selectFile .browse').css({
//            'outline': '0 solid #ed1c3d'
//        });
//    });
});

function textAreaAdjust(o) {
//    o.style.height = "1px";
//    o.style.height = (31+o.scrollHeight)+"px";
}

