function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

    $(document).ready(function(){
        $('.details-block').not("#entitledDetails").hide();
        $(".side-nav a[href=#entitledDetails]").addClass('active');

        $('.side-nav a').on('click',function(e){
            var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            if (viewportWidth > 640) {
                e.preventDefault();
            }

            var blockToShow = $(this).attr('href');

            $('.details-block').hide();
            $(blockToShow).show();

            $('.side-nav a').removeClass('active');
            $(this).addClass('active');
        });

        $('.nav-copy').hide();
        $('html').keypress(function(e){
            if (e.charCode === 100) {
                $('.nav-copy').toggle();
            }
        });
        $('.top-link').hide();

        var highlight = qs("highlight");

        if(highlight !== null) {

            var elem = $(".side-nav a[href=#"+highlight+"]");
            var blockToShow = elem.attr('href');

            $('.details-block').hide();
            $(blockToShow).show();

            $('.side-nav a').removeClass('active');
            elem.addClass('active');

        }
    });
