(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application;

  Application = {
    initialize: function() {
      var HomeView, Router;
      HomeView = require('views/home_view');
      Router = require('lib/router');
      require('test');
      this.homeView = new HomeView();
      this.router = new Router();
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    }
  };

  module.exports = Application;
  
});
window.require.register("initialize", function(exports, require, module) {
  var application;

  application = require('application');

  $(function() {
    application.initialize();
    return Backbone.history.start();
  });
  
});
window.require.register("lib/router", function(exports, require, module) {
  var Router, application,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  application = require('application');

  module.exports = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '': 'home'
    };

    Router.prototype.home = function() {
      return $('body').html(application.homeView.render().el);
    };

    return Router;

  })(Backbone.Router);
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  

  
});
window.require.register("models/action_model", function(exports, require, module) {
  var ActionModel,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = ActionModel = (function(_super) {

    __extends(ActionModel, _super);

    function ActionModel() {
      return ActionModel.__super__.constructor.apply(this, arguments);
    }

    ActionModel.prototype.initialize = function() {
      var _this = this;
      this.backgroundPage = chrome.extension.getBackgroundPage();
      console.log(this.backgroundPage);
      this.backgroundPage.getData();
      return this.backgroundPage.addEventListener("dataReady", function(e) {
        return _this.updateData(e.detail);
      });
    };

    ActionModel.prototype.updateData = function(data) {
      console.log("got data from background", data);
      this.user = this.backgroundPage.data.user;
      return this.set("name", this.user.name);
    };

    return ActionModel;

  })(Backbone.Model);
  
});
window.require.register("models/collection", function(exports, require, module) {
  var Collection,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    return Collection;

  })(Backbone.Collection);
  
});
window.require.register("models/model", function(exports, require, module) {
  var Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Backbone.Model);
  
});
window.require.register("popup", function(exports, require, module) {
  var Popup,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  console.log("loading from extension");

  module.exports = Popup = (function(_super) {

    __extends(Popup, _super);

    function Popup() {
      return Popup.__super__.constructor.apply(this, arguments);
    }

    Popup.prototype.initialize = function() {
      return chrome.tabs.getSelected(null, function(tab) {
        var port;
        port = chrome.tabs.connect(tab.id);
        port.postMessage({
          "hello": "world"
        });
        return port.onMessage.addListener(function(response) {
          console.error(JSON.stringify(response));
          return jQuery('#home-view').html("<img src='" + response.poster + "' />");
        });
      });
    };

    return Popup;

  })(View);
  
});
window.require.register("test", function(exports, require, module) {
  var TestObject, testObject;

  Parse.initialize("BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh");

  TestObject = Parse.Object.extend("TestObject");

  testObject = new TestObject;

  testObject.save({
    foo: "bar"
  }, {
    success: function(object) {
      return console.log("[Parse] : Sent test payload.");
    }
  });
  
});
window.require.register("views/action_view", function(exports, require, module) {
  var ActionView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  template = require('./templates/action_template');

  module.exports = ActionView = (function(_super) {

    __extends(ActionView, _super);

    function ActionView() {
      return ActionView.__super__.constructor.apply(this, arguments);
    }

    ActionView.prototype.id = 'action-view';

    ActionView.prototype.template = template;

    ActionView.prototype.initialize = function(options) {
      this.options = options != null ? options : {};
      console.log('action sub view loaded', this.options);
      this.listenTo(this.model, "change", this.render);
      return this.render();
    };

    ActionView.prototype.getRenderData = function() {
      return this.model.attributes;
    };

    ActionView.prototype.afterRender = function() {
      if (this.model.get('name')) {
        this.$('#loading').hide();
        return this.$('#content').show();
      }
    };

    return ActionView;

  })(View);
  
});
window.require.register("views/home_view", function(exports, require, module) {
  var ActionModel, ActionView, HomeView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('./view');

  ActionView = require('./action_view');

  ActionModel = require('../models/action_model');

  template = require('./templates/home');

  module.exports = HomeView = (function(_super) {

    __extends(HomeView, _super);

    function HomeView() {
      return HomeView.__super__.constructor.apply(this, arguments);
    }

    HomeView.prototype.id = 'home-view';

    HomeView.prototype.template = template;

    HomeView.prototype.afterRender = function() {
      this.backgroundPage = chrome.extension.getBackgroundPage();
      if (this.backgroundPage.localStorage.getItem("accessToken")) {
        console.log("We have access to facebook");
        this.$('#action-sub-view').css('display', 'block');
        return this.$('#action-sub-view').append(new ActionView({
          model: new ActionModel()
        }).el);
      } else {
        console.log("we need to connect to facebook");
        return this.$('#facebook-connect').css('display', 'block');
      }
    };

    return HomeView;

  })(View);
  
});
window.require.register("views/templates/action_template", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<div id="loading"><p>Loading...</p></div><div id="content"><p>welcome ' + escape((interp = name) == null ? '' : interp) + '</p></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
  attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
  var buf = [];
  with (locals || {}) {
  var interp;
  buf.push('<h1>Home View persistant header</h1><div id="facebook-connect"><h3>You must connect to Facebook to use Trailer Rater<p><a target="_blank" href="https://www.facebook.com/dialog/oauth?client_id=160913750763734&amp;response_type=token&amp;scope=email&amp;redirect_uri=http://www.facebook.com/connect/login_success.html">Connect to Facebook</a></p></h3></div><div id="action-sub-view"></div>');
  }
  return buf.join("");
  };
});
window.require.register("views/view", function(exports, require, module) {
  var View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('lib/view_helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      this.render = __bind(this.render, this);
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.template = function() {};

    View.prototype.getRenderData = function() {};

    View.prototype.render = function() {
      console.debug("Rendering " + this.constructor.name);
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    };

    View.prototype.afterRender = function() {};

    return View;

  })(Backbone.View);
  
});
