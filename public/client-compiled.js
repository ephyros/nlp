"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecogForm = function (_React$Component) {
  _inherits(RecogForm, _React$Component);

  function RecogForm(props) {
    _classCallCheck(this, RecogForm);

    var _this = _possibleConstructorReturn(this, (RecogForm.__proto__ || Object.getPrototypeOf(RecogForm)).call(this, props));

    _this.state = {
      action: '0',
      text: " Dear Dr. Ronald, " + "I look forward to meeting you on Thursday, May 23, to further discuss the business incubation programme that was designed by the World Bank. Thursday evening is a good time for me." + " Two of my associates, Jay Abraham and Robert Kiyosaki, are planning to meet with you in Liverpool as well. We are very excited to be a part of this project, especially being in the same team with you. " + " Cheers, Kara Brandan. ",
      result: ""
    };

    _this.handleTextChange = _this.handleTextChange.bind(_this);
    _this.handleActionChange = _this.handleActionChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(RecogForm, [{
    key: "handleTextChange",
    value: function handleTextChange(event) {
      this.setState({ text: event.target.value });
    }
  }, {
    key: "handleActionChange",
    value: function handleActionChange(event) {
      this.setState({ action: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var compromise = nlp(this.state.text);
      // .nouns().toSingular();
      var result = '';
      switch (this.state.action) {
        case '0':
        {
          result = compromise.dates();
          break;
        }
        case '1':
        {
          result = compromise.people();
          break;
        }
        case '2':
        {
          result = compromise.places();
          break;
        }
      }
      console.log(result);
      var text = result.out('text');
      // .dates(),
      // .sentences().toNegative();
      // .match('#Person');
      // .people(),
      this.setState({ result: text });

      // alert(this.state.result);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "div",
          null,
          React.createElement(
            "fieldset",
            { className: "form-group", onChange: this.handleActionChange },
            React.createElement(
              "p",
              null,
              this.state.result
            ),
            React.createElement(
              "legend",
              null,
              "Action"
            ),
            React.createElement(
              "div",
              { className: "form-check" },
              React.createElement(
                "label",
                { className: "form-check-label" },
                React.createElement("input", { type: "radio", className: "form-check-input", name: "action", id: "optionsRadios1", value: "0", defaultChecked: true }),
                "Find dates"
              )
            ),
            React.createElement(
              "div",
              { className: "form-check" },
              React.createElement(
                "label",
                { className: "form-check-label" },
                React.createElement("input", { type: "radio", className: "form-check-input", name: "action", id: "optionsRadios2", value: "1" }),
                "Find people"
              )
            ),
            React.createElement(
              "div",
              { className: "form-check" },
              React.createElement(
                "label",
                { className: "form-check-label" },
                React.createElement("input", { type: "radio", className: "form-check-input", name: "action", id: "optionsRadios3", value: "2" }),
                "Find places"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("textarea", { className: "form-control", rows: "20", value: this.state.text, onChange: this.handleTextChange })
          ),
          React.createElement("input", { type: "submit", className: "btn btn-primary", value: "Submit" })
        )
      );
    }
  }]);

  return RecogForm;
}(React.Component);

ReactDOM.render(React.createElement(RecogForm, null), document.getElementById('root'));