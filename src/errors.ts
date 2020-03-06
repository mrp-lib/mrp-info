
/**
 * 不是mrp，则抛出此错误
 */
export class NotMrpError extends Error {
	constructor(msg?: string) {
		super(msg || 'The file you parsing is not a mrp file')
	}
}

/**
 * 如果无法解压缩，则抛出此错误
 */
export class GunzipError extends Error {
	constructor(msg?: string) {
		super(msg || `The file you parsing maybe destroied (cannot ungzip)`)
	}
}

/**
 * 如果读取文件信息失败，则抛出此错误
 */
export class ReadInfoError extends Error {
	constructor(msg?: string) {
		super(msg || `The file you parsing maybe destroied (cannot read information)`)
	}
}

/**
 * 如果解码相关字符串时出错，则抛出此错误
 */
export class Utf8DecodeError extends Error {
	constructor(msg?: string) {
		super(msg || `The file you parsing maybe destroied (cannot decode to utf8)`)
	}
}