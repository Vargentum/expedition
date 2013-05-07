$(function() {
    var scrolltopin = function(n) {
        var scroll_h = (($('#pin1').height() + $('#era1').height() + 5000)*n) - $('#pin1').height()/2 - $('#era1').height()/2;
        if (scroll_h <= 1) {
            scroll_h = 1;
        }
        TweenLite.to(window, 0, {
            scrollTo: scroll_h,
            onComplete: function() {
                setTimeout(function() {
                    $('.timeLine i').removeClass('active');
                    $('.timeLine i').eq(n).addClass('active');
                }, 100)
                setTimeout(function() {
                    $('.timeLine i').removeClass('active');
                    $('.timeLine i').eq(n).addClass('active');
                }, 300)
            }
        });
    }

    $('.timeLine i').click(function() {
        scrolltopin($('.timeLine i').index($(this)));

    });

    $('.indexPage .scrollName').click(function() {
        scrolltopin(0);
    });

    var forward_nulls = function(n) {
        if ((n+'').length == 1) {
            return '0000' + n;
        } else {
            return '000' + n;
        }
    }

    var calculate_cover_position = function() {
        var wh = $(window).height();
        var ww = $(window).width();
        $('.pin-content .cover-image').each(function(i, e) {
            $(e).css({
                left: (($(e).width() - ww) / -2) + 'px',
                top: (($(e).height() - wh) / -2) + 'px'
            })
        });
    }

    $(window).resize(function(){
        calculate_cover_position();
    });
    calculate_cover_position();

    var controller = $.superscrollorama();

    $('.pin').each(function(i, e) {
        var pa = new TimelineLite();

        for (var j = 1; j < 51; j++) {
            var img_path = SLIDES_PATH + 'slide' + (i + 1) + '/' + forward_nulls(j) + '.jpg';
//            $('body').append($('<img>').attr('src', img_path).css({width: 0, height: 0, position: 'absolute', left: '-9000px'}));

            var ta;
            if (($.browser.msie)&&($.browser.version <= 8)) {
                ta = [
                    TweenMax.to(
                        $(e).find('.pin-content .cover-image'),
                        1,
                        {
                            onStart: function() {
                                this.target.attr('src', SLIDES_PATH + 'slide' + (i + 1) + '/' + forward_nulls(this.startTime() + 1) + '.jpg');
                            },
                            onReverseComplete: function() {
                                this.target.attr('src', SLIDES_PATH + 'slide' + (i + 1) + '/' + forward_nulls(this.startTime() + 1) + '.jpg');
                            }
                        }
                    )
                ];
            } else {
                ta = [
                    TweenMax.to($(e).find('.pin-content'), 1, {
                        css: {
                            backgroundImage: 'url(' + img_path + ')'
                        }
                    })
                ];
            }

            ta.push(
                TweenMax.to($(e).find('.card'), 1, {css:{top: 1000-j*40}})
            )

            pa.append(ta)
        }

        controller.pin($(e), 5000, {
            anim: pa,
            onPin: function(r) {
                //if ($(e).attr('id') == 'pin1' && !r) {
                //    $('.timeLine')
                //        .show()
                //        .css({bottom: '-100px'})
                //        .animate({bottom: 0});
                //}
                $('.pin .card').hide();
                $(e).find('.card').show();
                $('.timeLine i').removeClass('active');
                $('.timeLine i').eq($('.pin').index($(e))).addClass('active');
            },
            onUnpin: function(r) {
                //if ($(e).attr('id') == 'pin1' && !r) {
                //    $('.timeLine')
                //        .animate({bottom: '-100px'}, function() {
                //            $('.timeLine').hide();
                //        });
                //}
                if ($(e).attr('id') == 'pin11') {
                    if (r) {
                        $(e).css({
                            position: 'fixed',
                            top: 0
                        })
                    } else {
                        $(e).css({
                            position: 'relative',
                            top: 0
                        })
                    }
                }
            }
        });
    });
});

