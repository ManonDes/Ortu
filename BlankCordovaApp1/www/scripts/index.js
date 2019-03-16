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

    function getArticles(search) {

        var li = $('#articlelist li');
        var articlelist = $("#articlelist");
        
        var results = "";

        //$.getJSON("http://mmi_user:mmi@iut.corse@193.48.29.108/html/MMI/wordpress/Desmettre/wordpress/index.php/wp-json/wp/v2/posts", function (data) {
        //$.getJSON("http://www.pjc-graphics.com/index.php/wp-json/wp/v2/posts", function (data) {
        $.getJSON("http://www.pjc-graphics.com/index.php/wp-json/wp/v2/posts?_embed&search="+search, function (data) {
            if (data.length > 0 && search != "") {
                $.each(data, function (index) {
                    var title = data[index].title.rendered;
                    var description = data[index].excerpt.rendered;
                    var id = data[index].id;

                    var img_path = ""; 

                    var content = '<h1 class="ui-li-heading">' + title + '</h1><p class="ui-li-desc">' + description + '</p>';

                    //var article = '<li><a href="#article?id=' + id + '">' + content + '</a><img src='+img_path+'></li>';
                    var article = '<li><a href="#article?id=' + id + '">' + content + '</a></li>';

                    // Add the element in the list
                    results += article;
                });
            }

           // Clear, append and refresh
            articlelist.empty().append(results).listview('refresh');

        });
    }


    function initialCheck() {
        
        $('#home').bind('pagebeforeshow', function (event) {
            // add footer for all pages

            $("#footerhome").load('footer.html', function () { $(this).trigger("create") });
            $("#footerpropose").load('footer.html', function () {$(this).trigger("create")});
            $("#footermessage").load('footer.html', function () {$(this).trigger("create")});
            $("#footerprofil").load('footer.html', function () { $(this).trigger("create") });
            $("#footerarticle").load('footer.html', function () { $(this).trigger("create") });
        

            // call the get Articles function to populate the ul depending on the search criteria
            $("#search-basic").keyup(function () {
                var iVal = $("#search-basic").val();
                getArticles(iVal);
            });
        
        });

        $('#article').bind('pagebeforeshow', function (event) {
          // populate the page from article properties
      
            // url of article containing the id
            var url = event.currentTarget.baseURI;

            // surch the id from url
            var re = /id=([0-9]*)/i;
            var id = url.match(re)[1];

            //var id = $(event.currentTarget).context.children[0].id;
            var article = $("#contentarticle");

            article.empty();

            $.getJSON("http://www.pjc-graphics.com/index.php/wp-json/wp/v2/posts/" + id, function (data) {

                var title = data.title.rendered;
                var description = data.content.rendered;

                article.append("<h1>" + title + "</h1> <p> " + description + "</p>");

            });    

        });

    };

   

})();

