(function($) {

    $(document).ready(function() {

        navigatorModule = {

                friendWrapper: '.friendRequestItem',
                randomNum: 12345,

                loopRequests: function() {

                    var acceptedNum = 0; //counter for accepted
                    var withoutImageNum = 0 // users without image
                    var setIntCounter = 0; //counter for setInterval

                    $(".friendRequestItem").each(function(index) {

                        console.log('for each is running');

                        var _this = this;
                        var previous;

                        randomNum = Math.floor(Math.random() * (2500 - 2000 + 1) + 2000);

                        var t = setTimeout(function() {

                            setIntCounter += 1;

                            console.log('set interval is running');

                            // highlight current target
                            $(_this).css({ 'position': 'relative' });

                            previous = $(_this);

                            checkIfHasImage();

                        }, randomNum * index);

                        var fadeOutEffect = function() {
                            // add affect for currently scanned request
                            $(_this).append('<div class="dum-current"></div>').fadeOut('slow');
                        }

                        var addToFriends = function() {
                            $(_this).find('.ruResponseButtons').children('button:first-child').click();
                            fadeOutEffect();
                        }

                        var rejectInvitation = function() {
                            // click to reject
                            $(_this).find('.ruResponseButtons').children('button:last-child').click();
                        }

                        var checkIfHasImage = function() {
                            if ($(_this).find('.uiScaledImageContainer').hasClass('silhouette')) {

                                withoutImageNum += 1;

                                $('.counter.rejected').text('- ' + withoutImageNum);

                                // change button color
                                $(_this).find('.ruResponseButtons').children('button:first-child').css('background', '#f00');

                                // add text to picture
                                $(_this).find('.silhouette').append('<p class="no-pic"> No pic no click </p>');

                                rejectInvitation();

                            } else {

                                acceptedNum += 1;

                                $('.counter.accepted').text('+ ' + acceptedNum);

                                //additional filter
                                checkName();

                            }
                        }

                        var checkName = function() {
                            var foreignCharacters = $(_this).children('div').children('div:last-child').children('div:first-child').children('a').html();
                            var rforeign = /[^\u0000-\u01F0]/;
                            console.log(foreignCharacters);
                            if (rforeign.test(foreignCharacters)) {
                                console.error('Reject invitation');
                                rejectInvitation();

                            } else {
                                console.info('Accept invitation');
                                addToFriends();

                            }
                        }



                    });

                }

            }

            // check URL, if on requests -accept 100
            console.log('CURRENT PAGE URL' + window.location.href );
            if((window.location.href).search('/friends/requests')){
                navigatorModule.loopRequests();
            };

            // check if ui exists
        var checkUi = setTimeout(function() {
            if ($('.accept-friends-btn').length != 0) {
                clearInterval(checkUi);
                $('.accept-friends-btn').on('click', function() {
                    
                    //navigatorModule.loopRequests();

                })

            } else {
                console.log('no UI');
            }
        }, 200);





    });

})(jQuery);