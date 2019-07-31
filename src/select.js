import React, { useCallback } from "react"
import PropTypes from "prop-types"
import uuid from "uuid"

import { Select, Tooltip } from "antd"
import { debounce } from "lodash"

const { Option } = Select
const LazyLoadSearchSelect = props => {
  const {
    onChange,
    onSearch,
    onPopupScroll,
    data,
    total,
    loading,
    mode,
    value,
    maxTagCount,
    maxTagTextLength,
    labelInValue,
    optionLabelProp,
  } = props
  const onOwnScroll = e => {
    e.persist()
    if (e.target) {
      const { target } = e
      // const top = target.scrollHeight
      console.log("vdvd", data.length, total)

      if (
        target.scrollTop + target.offsetHeight === target.scrollHeight &&
        data.length < total
      ) {
        onPopupScroll()
      }
    }
  }
  const debounceFnScroll = useCallback(debounce(onOwnScroll, 1000), [
    total,
    data,
    loading,
  ])
  const debounceFnSearch = useCallback(debounce(onSearch, 1000), [loading])
  return (
    <Select
      showSearch
      filterOption={false}
      allowClear
      showArrow
      value={value}
      loading={loading}
      mode={mode}
      maxTagCount={maxTagCount}
      maxTagTextLength={maxTagTextLength}
      optionLabelProp={optionLabelProp}
      labelInValue={labelInValue}
      maxlength="17"
      defaultActiveFirstOption={false}
      onChange={onChange}
      onSearch={debounceFnSearch}
      onPopupScroll={e => {
        e.persist()
        debounceFnScroll(e)
      }}
    >
      {data &&
        data.map(item => {
          item.showLabel = // eslint-disable-line
            item.name.length > 1 ? `${item.name.slice(0, 1)}...` : item.name
          return (
            <Option
              key={uuid.v4()}
              value={item.code}
              showlabel={item.showLabel}
            >
              <Tooltip title={item.name}>{item.name}</Tooltip>
            </Option>
          )
        })}
    </Select>
  )
}

export default LazyLoadSearchSelect
