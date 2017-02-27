(function ($) {

    $(document).ready(function () {
        navigatorModule = {

            // watch URL
            urlWatcher: function () {
                // check URL, if on requests - accept 100
                console.log('CURRENT PAGE URL' + window.location.href);
                if ((window.location.href).search('/friends/requests')) {
                    this.loopRequests();
                };

            },

            // watch for UI to load
            uiWatcher: function () {

                var checkUi = setTimeout(function () {
                    if ($('.accept-friends-btn').length != 0) {
                        clearInterval(checkUi);
                        $('.accept-friends-btn').on('click', function () {
                            //navigatorModule.loopRequests();
                        })

                    } else {
                        console.log('no UI');
                    }
                }, 200);

            }

        }

        navigatorModule.urlWatcher();
        navigatorModule.uiWatcher();

    });

})(jQuery);