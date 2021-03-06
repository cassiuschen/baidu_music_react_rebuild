var Advertisement, App, Header, MainContent, NavBar, NavLink, UI;

window.UI = {};

Advertisement = React.createClass({
  closeAd: function(e) {
    $('.ad').fadeOut(280);
    return this.props.onAdClosed();
  },
  render: function() {
    return React.createElement("div", {
      "className": "ad"
    }, React.createElement("a", {
      "className": "close_btn",
      "onClick": this.closeAd
    }), React.createElement("a", {
      "className": "content",
      "href": this.props.url
    }, React.createElement("img", {
      "src": this.props.imgUrl
    })));
  }
});

NavBar = React.createClass({
  render: function() {
    return React.createElement("nav", {
      "className": "navbar"
    }, React.createElement("div", {
      "className": "logo"
    }, React.createElement("i", {
      "className": "full-width"
    })), React.createElement("div", {
      "className": "rightMenu"
    }, React.createElement(NavLink, {
      "type": "user"
    }), React.createElement(NavLink, {
      "type": "search"
    }), React.createElement(NavLink, {
      "type": "menu"
    }), React.createElement(NavLink, {
      "type": "app"
    }, "客户端")));
  }
});

NavLink = React.createClass({
  render: function() {
    return React.createElement("a", {
      "className": this.props.type + " item",
      "href": this.props.url
    }, this.props.children);
  }
});

Header = React.createClass({
  handleAdClosing: function() {
    return this.props.adChangeStatus();
  },
  render: function() {
    return React.createElement("header", {
      "className": "top"
    }, React.createElement(Advertisement, {
      "url": "/assets/images/ad.png",
      "imgUrl": "/assets/images/ad.png",
      "onAdClosed": this.handleAdClosing
    }), React.createElement(NavBar, null));
  }
});

MainContent = React.createClass({
  getInitialState: function() {
    return {
      adShowing: this.props.adShowing
    };
  },
  reactForAdvertisement: function() {
    if (this.props.adShowing) {
      return 134;
    } else {
      return 0;
    }
  },
  render: function() {
    return React.createElement("div", {
      "className": "main",
      "style": {
        marginTop: (this.reactForAdvertisement()) + "px"
      }
    });
  }
});

App = React.createClass({
  getInitialState: function() {
    return {
      adShowing: true
    };
  },
  handleAdChangeStatus: function() {
    console.log("ad is closing!");
    return this.setState({
      adShowing: false
    });
  },
  render: function() {
    return React.createElement("div", {
      "className": "ReactContent"
    }, React.createElement(Header, {
      "adChangeStatus": this.handleAdChangeStatus
    }), React.createElement(MainContent, {
      "adShowing": this.state.adShowing
    }));
  }
});

UI = {
  init: function() {
    return ReactDOM.render(React.createElement(App, null), document.getElementsByTagName("body")[0]);
  }
};

$(function() {
  return UI.init();
});
