type Options = {
  delimiter?: RegExp | string;
  hump?: boolean;
}

/**
 * 将分割的字符串转为首字母大写的字符串
 * 
 * @param {*} string 字符串
 * @param {*} delimiter 要转换的分割符，默认为正则 `/[_-\s]/`
 * @returns {Array} 返回转换后的字符串.
 * @example
 * 
 * toFirstCaps('the_case_of_this_conversion_string')
 * // => 'TheCaseOfThisConversionString'
 * 
 * toFirstCaps('the-case-of This conversion-string')
 * // => 'TheCaseOfThisConversionString'
 */

function toFirstCaps(
  value: string,
  {
    delimiter = /[_-\s]/,
    hump = false
  }: Options = {}
) {
  const newValue = value.split(delimiter)
  if (newValue?.length <= 0) return value
  if (newValue.length === 1) {
    return hump ? value : firstCaps(newValue[0])
  }

  return newValue.reduce((a, b) => (hump ? a : firstCaps(a)) + firstCaps(b))
}

function firstCaps(word: string) {
  return word ? word.replace(word[0], word[0].toUpperCase()) : ''
}

export default toFirstCaps