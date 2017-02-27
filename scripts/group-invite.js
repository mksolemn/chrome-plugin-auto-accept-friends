(function($) {
    $(document).ready(function() {

        var groupInviteModule = {};

        groupInviteModule = {

            currentTime: new Date(),
            inviteInterval: 86400000 / 2, // schedule for invitation

            // selectors
            inviteButton: $('div:contains("Invite friends to like this Page")').parents('a'),
            currentProfile: $('img[id^=profile_pic_header_]').attr('id').replace(/profile_pic_header_/i, ''),
            inviteToLikePage: $('div:contains("Invite friends to like this Page")'),


            someOption: '',

            init: function() {


                this.getProfiles();
            },

            getProfiles: function() {
                var self = this;
                $.get("http://127.0.0.1:8080/api/enjoyer", function(data) {
                    self.checkExistingProfiles(data);
                })
            },

            postData: function(trailUrl, passedData) {
                var self = this;
                //if profile doesn't exist already
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:8080/api" + trailUrl,
                    data: passedData,
                    success: '',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: "json"
                });
            },

            checkExistingProfiles: function(data) {
                var i = 0;
                var stateOfExistense = 0; // boolean if user exists or not
                var self = this;

                for (i; data.length > i; i += 1) {

                    if (data[i].nameId == this.currentProfile) {

                        if (data[i].inviteTime + this.inviteInterval < this.currentTime.getTime()) {

                            this.inviteToLikePage.click();

                            var checkIfLoaded = setInterval(function() {
                                if ($('.fbProfileBrowserListItem').length != 0) {
                                    self.clearInterval(checkIfLoaded);
                                    self.animateScroll();
                                } else {

                                }

                            }, 200);

                        }

                        stateOfExistance = 0;
                        break;

                    } else {
                        stateOfExistance = 1;

                    }
                }
                if (stateOfExistance) {
                    this.postData('/enjoyer', { nameId: this.currentProfile, inviteTime: this.currentTime.getTime() });
                }

            },

            inviteToLike: function() {

                $('body').append('<div class="friends-invited">30 friends invited to like </div>');
                for (var i = 0; i < $('span:contains("Invited")').length + 30; i += 1) {
                    $('span:contains("Invite")').eq(i).click();
                }
            },

            animateScroll: function() {
                $(".fbProfileBrowserResult").animate({ scrollTop: 100 * countInvited() * 2 }, 100 * countInvited(), function() {

                    inviteToLike();


                });
            }
        }

        groupInviteModule.init();



    });
})(jQuery)