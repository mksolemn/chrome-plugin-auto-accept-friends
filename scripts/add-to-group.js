(function($) {

    $(document).ready(function() {

            navigatorModule = {

                randomNum: 12345,

                initModule: function(){
                    console.log('friends will be shown');
                    var self = this;
                    // open list of suggested friends
                    $("#group_rhc_see_more_link>i").click();

                    setTimeout(function(){
                        self.showFriends();
                    }, 400)

                    
                },

                
                showFriends: function(){
                    
                    var self = this;

                    // add timeout to each
                        $('[id^=suggested_member_]').find('button').each(function(index) {

                            var _this = this;
                            var previous;
                            var timer = 1*index*Math.floor(Math.random() * (2500 - 1000 + 1) + 1000);
                            console.log(timer/1000);

                            var t = setTimeout(function() {

                            $(_this).click();

                        }, timer);

                        });

                }

            }

                // check if ui exists
        var checkUi = setTimeout(function() {
            if ($('.btn.add-to-group').length != 0) {
                clearInterval(checkUi);
                $('.btn.add-to-group').on('click', function() {
                    navigatorModule.initModule();
                })

            } else {
                console.log('no UI');
            }
        }, 200);
            

            });

})(jQuery)