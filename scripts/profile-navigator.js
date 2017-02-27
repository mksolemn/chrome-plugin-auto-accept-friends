(function($) {
    $(document).ready(function() {
        var switcherModule = {}

        switcherModule = {

            //selectors
            usernameInput: $('#enjoyer-username'),
            passwordInput: $('#enjoyer-password'),
            submitButton: $('#enjoyer-submit'),

            registerUser: function() {
                this.submitButton.on('click', function() {
                    console.log('form submited');
                })
            }

        }

        switcherModule.registerUser();

    });
})(jQuery)