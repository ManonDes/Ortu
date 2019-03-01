// Pour obtenir une présentation du modèle Vide, consultez la documentation suivante :
// http://go.microsoft.com/fwlink/?LinkID=397704
// Pour déboguer du code durant le chargement d'une page dans cordova-simulate ou sur les appareils/émulateurs Android, lancez votre application, définissez des points d'arrêt, 
// puis exécutez "window.location.reload()" dans la console JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    initialCheck();

    function onDeviceReady() {
        // Gérer les événements de suspension et de reprise Cordova
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova a été chargé. Effectuez l'initialisation qui nécessite Cordova ici.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: cette application a été suspendue. Enregistrez l'état de l'application ici.
    };

    function onResume() {
        // TODO: cette application a été réactivée. Restaurez l'état de l'application ici.
    };

    function getArticles() {

        var li = $('#articlelist li');
        var articlelist = $("#articlelist");
        //var span = $("#itemCount");
        var temp = [];

        //$.getJSON("http://mmi_user:mmi@iut.corse@193.48.29.108/html/MMI/wordpress/Desmettre/wordpress/index.php/wp-json/wp/v2/posts", function (data) {
        $.getJSON("http://www.pjc-graphics.com/index.php/wp-json/wp/v2/posts", function (data) {
            if (data.length > 0) {
                $.each(data, function (index) {
                    //var content = '<h1 class="ui-li-heading">' + data[index].title.rendered + '</h1><p class="ui-li-desc">Mon article</p>'
                    var content = data[index].title.rendered
                    var article = '<li><a href="#">' + content + '</a></li>';

                    // add content to remove old li after the add
                    temp[index] = content;

                    var exist = false;
                    li.each(function () {
                        if ($(this).html() == content) exist = true;
                    });
                    if (!exist) {
                        articlelist.append(article);
                    }

                });

                // Refresh
                articlelist.listview("refresh");

                //navigator.notification.alert('a new article has just arrived', '','New Article', 'Ok');
            }

           
            li.each(function () {
                if ($.inArray($(this).html(), temp) == -1) {
                    $(this).remove();
                }
            });

        });

        //span.text(li.length);
    }

    function initialCheck() {
        $("#articlelist").on("filterablefilter", function (event, ui) {
            getArticles();
        });
       
    };

} )();