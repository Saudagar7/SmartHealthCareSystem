import React from 'react'

const BRACE_REGEX = /(\{[^}]+\})/g

export const highlightBraceText = (text, keyPrefix = 'hl') => {
  if (!text) {
    return text
  }

  return String(text)
    .split(BRACE_REGEX)
    .filter(Boolean)
    .map((segment, index) => {
      const key = `${keyPrefix}-${index}`
      const isHighlighted = segment.startsWith('{') && segment.endsWith('}')

      if (!isHighlighted) {
        return (
          <React.Fragment key={key}>
            {segment}
          </React.Fragment>
        )
      }

      return (
        <span
          key={key}
          className="bg-yellow-100 text-[#0f2418] px-1 py-0.5 rounded"
        >
          {segment.slice(1, -1)}
        </span>
      )
    })
}
