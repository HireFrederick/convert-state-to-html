(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("draft-js"), require("draft-js-utils"), require("react"), require("react-dom/server"));
	else if(typeof define === 'function' && define.amd)
		define(["draft-js", "draft-js-utils", "react", "react-dom/server"], factory);
	else if(typeof exports === 'object')
		exports["convert-state-to-html"] = factory(require("draft-js"), require("draft-js-utils"), require("react"), require("react-dom/server"));
	else
		root["convert-state-to-html"] = factory(root["draft-js"], root["draft-js-utils"], root["React"], root["react-dom/server"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
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

	var _index = __webpack_require__(3);

	var elements = _interopRequireWildcard(_index);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var blockElementMap = {
	  'header-one': elements.h1,
	  'header-two': elements.h2,
	  'header-three': elements.h3,
	  'header-four': elements.h4,
	  'header-five': elements.h5,
	  'header-six': elements.h6,
	  'p': elements.p,
	  'unstyled': elements.p
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
	        return elements.a({ attrs: { href: entity.data.url }, content: element });
	      } else {
	        return element;
	      }
	    }
	  }, {
	    key: 'elementWithStyle',
	    value: function elementWithStyle(text, style) {
	      if (Object.keys(style.toObject()).length > 0) {
	        return elements.span({ style: this.getInlineStyles(style), content: text });
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

	var _h = __webpack_require__(4);

	var _h2 = _interopRequireDefault(_h);

	var _h3 = __webpack_require__(7);

	var _h4 = _interopRequireDefault(_h3);

	var _h5 = __webpack_require__(8);

	var _h6 = _interopRequireDefault(_h5);

	var _h7 = __webpack_require__(9);

	var _h8 = _interopRequireDefault(_h7);

	var _h9 = __webpack_require__(10);

	var _h10 = _interopRequireDefault(_h9);

	var _h11 = __webpack_require__(11);

	var _h12 = _interopRequireDefault(_h11);

	var _p = __webpack_require__(12);

	var _p2 = _interopRequireDefault(_p);

	var _span = __webpack_require__(13);

	var _span2 = _interopRequireDefault(_span);

	var _a = __webpack_require__(14);

	var _a2 = _interopRequireDefault(_a);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.h1 = _h2.default;
	exports.h2 = _h4.default;
	exports.h3 = _h6.default;
	exports.h4 = _h8.default;
	exports.h5 = _h10.default;
	exports.h6 = _h12.default;
	exports.p = _p2.default;
	exports.span = _span2.default;
	exports.a = _a2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h1;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h1(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h1', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h2;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h2(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h2', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h2;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h2(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h3', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h2;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h2(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h4', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h5;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h5(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h5', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = h6;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function h6(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('h6', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = p;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function p(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('p', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = span;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function span(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('span', { style: props.style, dangerouslySetInnerHTML: { __html: props.content } }));
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = a;

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function a(props) {
	  return (0, _server.renderToStaticMarkup)(_react2.default.createElement('a', _extends({}, props.attrs, {
	    dangerouslySetInnerHTML: { __html: props.content } })));
	}

/***/ }
/******/ ])
});
;