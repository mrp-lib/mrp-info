var Iconv = require('iconv').Iconv

/**
 * 将gbk转换成utf8
 * @param src 要转换的数据
 */
export function gbk2utf8(src: Buffer | string, coding?: string): Buffer {
	return new Iconv(coding || 'gbk', 'utf8').convert(src)
}