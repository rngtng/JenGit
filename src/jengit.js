(function($){
  var methods = {
    addLink : function($li, url, status) {
      $li.html('<a href="' + url + 'console" class="' + status.toLowerCase() + '" target="_blank">' + status + '</a>');

      if (status == "SUCCESS") {
        $("#js-mergeable-clean").show();
      }
      else {
        $("#js-mergeable-clean").hide();
      };
    },

    request: function(output, url) {
      $.ajax({
        url: url + '?' + Number(new Date()),
        dataType: 'json',
        success: function(build) {
          methods.addLink(output, build.url, build.result || "RUNNING");
        },
        error: function(build) {
          methods.addLink(output, "#", "NOTFOUND");
        }
      });
    },

    init : function( options ) {
      return this.each(function() {
        var output = $(this);
        methods.request(output, options.url);

        setInterval(function() {
          methods.request(output, options.url);
        }, 60000);
      });
    }
  };

  $.fn.jenGit = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.scWidgetfiy' );
      return false;
    }
  };
})(jQuery);

$(function() {
  $(".pull-head .state-open").each(function(){
    $(".pull-head .pull-branch:last").each(function(){
      var shards = 6,
          branchName = $(this).html(),
          $ol = $('<ol></ol>');

      for(var index = 1; index <= shards; index++) {
        $('<li>Checking...</li>').appendTo($ol).jenGit({
          url: "http://builder.soundcloud.com/job/soundcloud_" + branchName + "_specs_00" + index + "/lastBuild/api/json"
        });
      }

      $(".content-body:first").append($('<div class="jengit"><b>Tests:</b></div>').append($ol));
    });
  });
});
