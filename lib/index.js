(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("draft-js"), require("draft-js-utils"), require("react"), require("react-dom/server"));
	else if(typeof define === 'function' && define.amd)
		define(["draft-js", "draft-js-utils", "react", "react-dom/server"], factory);
	else if(typeof exports === 'object')
		exports["convert-state-to-html"] = factory(require("draft-js"), require("draft-js-utils"), require("react"), require("react-dom/server"));
	else
		root["convert-state-to-html"] = factory(root["draft-js"], root["draft-js-utils"], root["React"], root["react-dom/server"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = function (contentState, options) {
	  return new HTMLGenerator(contentState, options).call();
	};

	var _draftJs = __webpack_require__(1);

	var _draftJsUtils = __webpack_require__(2);

	var _elements = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var blockElementMap = {
	  'header-one': _elements.h1,
	  'header-two': _elements.h2,
	  'header-three': _elements.h3,
	  'header-four': _elements.h4,
	  'header-five': _elements.h5,
	  'header-six': _elements.h6,
	  'p': _elements.p,
	  'unstyled': _elements.p
	};

	var HTMLGenerator = function () {
	  function HTMLGenerator(contentState, _ref) {
	    var inlineStyleMap = _ref.inlineStyleMap;
	    var blockAttrFn = _ref.blockAttrFn;

	    _classCallCheck(this, HTMLGenerator);

	    this.contentState = contentState;
	    this.inlineStyleMap = inlineStyleMap;
	    this.blockAttrFn = blockAttrFn;
	  }

	  _createClass(HTMLGenerator, [{
	    key: 'call',
	    value: function call() {
	      var _this = this;

	      return this.contentState.getBlocksAsArray().map(function (block) {
	        return _this.parseBlock(block);
	      }).join('');
	    }
	  }, {
	    key: 'parseBlock',
	    value: function parseBlock(block) {
	      var type = block.getType();
	      var text = block.getText();

	      var characterMetadataList = block.getCharacterList();
	      var entityRanges = (0, _draftJsUtils.getEntityRanges)(text, characterMetadataList);

	      var content = this.applyInlineStyles(entityRanges);
	      var attrs = this.blockAttrFn(block);
	      var blockHTML = this.applyBlockElementWrapper(type, content, attrs);

	      return blockHTML;
	    }
	  }, {
	    key: 'applyInlineStyles',
	    value: function applyInlineStyles(entityRanges) {
	      var _this2 = this;

	      return entityRanges.map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);

	        var entityKey = _ref3[0];
	        var styles = _ref3[1];

	        var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
	        var entityType = entity ? entity.getType() : null;
	        return styles.map(function (_ref4) {
	          var _ref5 = _slicedToArray(_ref4, 2);

	          var text = _ref5[0];
	          var style = _ref5[1];

	          var styledElement = _this2.elementWithStyle(text, style);
	          var element = _this2.applyEntity(styledElement, entity);

	          return element;
	        }).join('');
	      }).join('');
	    }
	  }, {
	    key: 'applyEntity',
	    value: function applyEntity(element, entity) {
	      if (entity) {
	        return (0, _elements.a)({ attrs: { href: entity.data.url }, content: element });
	      } else {
	        return element;
	      }
	    }
	  }, {
	    key: 'elementWithStyle',
	    value: function elementWithStyle(text, style) {
	      if (Object.keys(style.toObject()).length > 0) {
	        return (0, _elements.span)({ style: this.getInlineStyles(style), content: text });
	      } else {
	        return text;
	      }
	    }
	  }, {
	    key: 'getInlineStyles',
	    value: function getInlineStyles(style) {
	      var _this3 = this;

	      var styles = {};

	      Object.keys(style.toObject()).forEach(function (k) {
	        styles = _extends({}, styles, _this3.inlineStyleMap[k]);
	      });

	      return styles;
	    }
	  }, {
	    key: 'applyBlockElementWrapper',
	    value: function applyBlockElementWrapper(type, content, attrs) {
	      return blockElementMap[type]({ content: content, attrs: attrs });
	    }
	  }]);

	  return HTMLGenerator;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.a = exports.span = exports.p = exports.h6 = exports.h5 = exports.h4 = exports.h3 = exports.h2 = exports.h1 = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function element(tagName) {
	  var includeStyles = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	  return function (props) {
	    var attributes = _extends({}, props.attrs, {
	      dangerouslySetInnerHTML: { __html: props.content }
	    });

	    if (includeStyles) {
	      Object.assign(attributes, { style: props.style });
	    }

	    return (0, _server.renderToStaticMarkup)(_react2.default.createElement(tagName, attributes));
	  };
	}

	var h1 = element('h1');
	var h2 = element('h2');
	var h3 = element('h3');
	var h4 = element('h4');
	var h5 = element('h5');
	var h6 = element('h6');
	var p = element('p');
	var span = element('span', true);
	var a = element('a');

	exports.h1 = h1;
	exports.h2 = h2;
	exports.h3 = h3;
	exports.h4 = h4;
	exports.h5 = h5;
	exports.h6 = h6;
	exports.p = p;
	exports.span = span;
	exports.a = a;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;