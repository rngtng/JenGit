(function($){
  var methods = {
    addLink : function($li, build, status) {
      $li.html('<a href="' + build.url + 'console" class="' + status.toLowerCase() + '" target="_blank">' + status + '</a>');
      if (status != "SUCCESS") {
        $("js-mergeable-clean").hide();
      };
    },

    init : function( options ) {
      return this.each(function() {
        var $output = $(this);
        $.ajax({
          url: options.url,
          dataType: 'json',
          success: function(build) {
            methods.addLink($output, build, build.result || "RUNNING");
          },
          error: function(build) {
            methods.addLink($output, build, "NOTFOUND");
          },
        });
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
  $(".commit-ref.from").each(function(){
    var shards = 6,
    branchName = $(this).html(),
    url = "http://builder.soundcloud.com/job/soundcloud_" + branchName + "_specs_00%SHARDNR%/lastBuild/api/json",
    $ol = $('<ol></ol>');

    for(var index = 1; index <= shards; index++) {
      $('<li>Checking...</li>').appendTo($ol).jenGit({
        url: url.replace(/%SHARDNR%/, index)
      });
    }

    $(".content-body.markdown-body.markdown-format:first").append($('<div class="jengit"><b>Tests:</b></div>').append($ol));
  });
});
