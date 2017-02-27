(function ($) {
    $(document).ready(function () {
        
        var navigatorModule = {};
        
        navigatorModule = {

            registeredProfiles: {},
            lastUser: [],

            navigatorUi: function () {
                var self = this;
                $('body').append('<div class="enjoyer-ui"></div>');
                $('.enjoyer-ui').load(chrome.extension.getURL('views/navigator-ui.html'), function () {
                    $('.main-control-btn').on('click', function () {
                        $(this).siblings('button').removeClass('hidden');
                    });
                    $('.register-btn').on('click', function () {
                        $('.enjoyer-modal').removeClass('hidden');
                    })
                    $('.close-modal').on('click', function () {
                        $('.enjoyer-modal').addClass('hidden');
                    })

                    self.registerUser();

                });
            },

            registerUser: function () {
                var self = this;

                $('#enjoyer-submit').on('click', function () {

                    var un = $('#enjoyer-username').val();
                    var pw = $('#enjoyer-password').val();

                    if ((un.length != 0) && (pw.length != 0)) {
                        self.getAllUsers(un, pw);
                    } else {
                        alert('Username or Password is empty');
                    }
                })
            },

            getAllUsers: function (un, pw) {

                var self = this;

                $.get("http://127.0.0.1:8080/api/enjoyer", function (data) {
                    var i = 0;
                    var stateOfExistense = 0;
                    // check if database empty
                    if (data.length == 0) {
                        stateOfExistense = 1;
                    }
                    for (i; data.length > i; i += 1) {
                        if (data[i].username == un) {
                            // user exists
                            alert('User ' + un + ' already exists')
                            stateOfExistense = 0;
                            break;
                        } else {
                            // need to create user
                            stateOfExistense = 1;
                        }
                    }
                    if (stateOfExistense) {
                        self.sendUserDetails(
                            '/enjoyer', {
                                username: un,
                                password: pw,
                                userState: 1 // set user state 1, cause account was just created
                            });
                        // alert is required, cause data needs to get to the dabase, before launching other functions
                        self.logUserOut();

                        // run get last user to check what's update
                        self.getLastUser();
                    }
                })

            },

            // logout after clicking submit, regardless if user exists or not (this will need to be updated)
            logUserOut: function () {
                $("#logoutMenu>a>div").click();
                var checkIfLoaded = setInterval(function () {
                    if ($('#show_me_how_logout_1').length != 0) {
                        $('#show_me_how_logout_1').click();
                        self.clearInterval(checkIfLoaded);
                    }

                }, 200);
            },

            // get last registered user
            getLastUser: function () {
                var self = this;

                //get only last user
                $.get("http://127.0.0.1:8080/api/enjoyer", function (data) {
                    // if user state is 1, then  do this action, because it means user was just created
                    lastUser = data.reverse().slice(0, 1)[0];

                    if (lastUser.userState == 1) {

                        self.logUserIn(lastUser);

                        // update user info
                        self.updateNewUser(lastUser);
                    }


                });
            },

            // login user
            logUserIn: function (data) {

                // paste username to username field
                $('#email').val(data.username);

                // paste password to password field
                $('#pass').val(data.password);

                $('#loginbutton').click();

            },

            // update user after login

            updateNewUser: function (lastUserData) {

                $.ajax({
                    type: "PUT",
                    url: "http://127.0.0.1:8080/api/enjoyer/" + lastUserData._id,
                    data: {
                        username: lastUserData.username,
                        password: lastUserData.password,
                        userState: 2,
                        userImage: $('[id^=profile_pic_header_]').attr('src'),
                        nameId: $('[id^=profile_pic_header_]').attr('id').slice(19)
                    },
                    success: '',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: "json"
                });

            },

            sendUserDetails: function (trailUrl, passedData) {
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:8080/api" + trailUrl,
                    data: passedData,
                    success: '',
                    contentType: 'application/x-www-form-urlencoded',
                    dataType: "json"
                });

            }

            // SCENARIO PIECES AFTER USER IS LOGGED I AND REGISTERED

            // navigate to friend reuest page
            // if user has more than 4900 friends do nothing


        }

        //every time facebook page loads
        navigatorModule.navigatorUi();      // load UI
        navigatorModule.getLastUser();      // get last user




    });
})(jQuery)