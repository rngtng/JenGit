var self = require("self");

require("page-mod").PageMod({
  include : [ "https://mail.google.com/mail/u/*", "https://mail.google.com/mail/?ui=2&view=bsp*" ],
  contentScriptFile: [self.data.url("jquery-1.6.1.js"), self.data.url("javascripts.js")],
  contentScript: "loader(jQuery, '" + self.data.url("styles.css") + "')",
  contentScriptWhen: 'end'
});

