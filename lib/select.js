"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uuid = require("uuid");

var _uuid2 = _interopRequireDefault(_uuid);

var _antd = require("antd");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option;

var LazyLoadSearchSelect = function LazyLoadSearchSelect(props) {
  var onChange = props.onChange,
      onSearch = props.onSearch,
      onPopupScroll = props.onPopupScroll,
      data = props.data,
      total = props.total,
      loading = props.loading,
      mode = props.mode,
      value = props.value,
      maxTagCount = props.maxTagCount,
      maxTagTextLength = props.maxTagTextLength,
      labelInValue = props.labelInValue,
      optionLabelProp = props.optionLabelProp;

  var onOwnScroll = function onOwnScroll(e) {
    e.persist();
    if (e.target) {
      var target = e.target;
      // const top = target.scrollHeight

      console.log("vdvd", data.length, total);

      if (target.scrollTop + target.offsetHeight === target.scrollHeight && data.length < total) {
        onPopupScroll();
      }
    }
  };
  var debounceFnScroll = (0, _react.useCallback)((0, _lodash.debounce)(onOwnScroll, 1000), [total, data, loading]);
  var debounceFnSearch = (0, _react.useCallback)((0, _lodash.debounce)(onSearch, 1000), [loading]);
  return _react2.default.createElement(
    _antd.Select,
    {
      showSearch: true,
      filterOption: false,
      allowClear: true,
      showArrow: true,
      value: value,
      loading: loading,
      mode: mode,
      maxTagCount: maxTagCount,
      maxTagTextLength: maxTagTextLength,
      optionLabelProp: optionLabelProp,
      labelInValue: labelInValue,
      maxlength: "17",
      defaultActiveFirstOption: false,
      onChange: onChange,
      onSearch: debounceFnSearch,
      onPopupScroll: function onPopupScroll(e) {
        e.persist();
        debounceFnScroll(e);
      }
    },
    data && data.map(function (item) {
      item.showLabel = // eslint-disable-line
      item.name.length > 1 ? item.name.slice(0, 1) + "..." : item.name;
      return _react2.default.createElement(
        Option,
        {
          key: _uuid2.default.v4(),
          value: item.code,
          showlabel: item.showLabel
        },
        _react2.default.createElement(
          _antd.Tooltip,
          { title: item.name },
          item.name
        )
      );
    })
  );
};

exports.default = LazyLoadSearchSelect;