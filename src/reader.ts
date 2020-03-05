import { gbk2utf8 } from './code'
import zlib from 'zlib'
import fs from 'fs'

import { IGetMrpInfoOption, IMrpFile, IMrpInfo } from './type'

//从buffer中读取字符串
function stringFromBuffer(buffer: Buffer, from: number, to: number) {
	let res = Buffer.alloc(to - from)
	buffer.copy(res, 0, from)
	try {
		return gbk2utf8(res).toString().trim()
	} catch (err) {
		try {
			return gbk2utf8(res, 'gb2312').toString().trim()
		} catch (err) {
			return res.toString().trim()
		}
	}
}

/**
 * 从给定的文件内容中解析mrp信息
 * @param content 文件内容
 */
export function getMrpInfo<G extends boolean = false>(content: Buffer, option?: IGetMrpInfoOption<G>): IMrpInfo<G> | null {
	const { gunzip: _gunzip = false, stringConv = 'utf8' } = option || {}
	//读取文件类型
	const type = stringFromBuffer(content, 0, 4)
	if (type !== 'MRPG') return null
	//读取文件开始位置
	const dataFrom = content.readUInt32LE(4)
	//读取文件总字节数
	const bytes = content.readUInt32LE(8)
	//读取文件列表开始位置
	const fileListFrom = content.readUInt32LE(12)
	//读取文件内部名
	const internalName = stringFromBuffer(content, 16, 28)
	//读取显示名
	const showName = stringFromBuffer(content, 28, 52)
	//读取串号
	// const imei = stringFromBuffer(content, 52, 68)
	//读取编号
	let number = content.readInt32BE(192)
	if (number < 0) number = content.readInt32LE(68)
	//读取版本
	let version = content.readInt32BE(196)
	if (version < 0) version = content.readInt32LE(196)
	//读取作者
	const author = stringFromBuffer(content, 88, 128)
	//读取介绍
	const description = stringFromBuffer(content, 128, 192)
	//读取文件列表
	const files: Array<IMrpFile<G>> = []
	let readFrom = fileListFrom		//从这个地方读取文件列表
	while (true) {
		//检测是否读取完成
		if (readFrom >= content.length) break
		//已经读取到数据区域了
		if (readFrom >= dataFrom + 8) break
		//读取文件名称长度(两个字节)
		const nameLen = content.readUInt32LE(readFrom)
		readFrom += 4		//两个字节的长度+0x0000，共4字节
		//读取文件名
		const filename = stringFromBuffer(content, readFrom, readFrom + nameLen - 1)		//文件名的长度会比上面的长度小1，因为文件名后面有00
		readFrom += nameLen
		//读取文件开始位置
		const filePos = content.readUInt32LE(readFrom)		//占用4个字节
		readFrom += 4
		//读取文件长度
		const fileLen = content.readUInt32LE(readFrom)		//占用4个字节，后面是4个空字节
		readFrom += 8
		//读取文件内容
		const data = Buffer.alloc(fileLen)
		content.copy(data, 0, filePos, filePos + fileLen)
		//进行gzip解压
		//保存文件
		files.push({
			filename, position: filePos, size: fileLen,
			data,
			//进行zip解压
			dataGziped: _gunzip ? zlib.gunzipSync(data) : undefined as any
		})
	}
	//OK返回文件信息
	return {
		type,
		version,
		// imei, 
		author, description, showName, internalName,
		number, bytes, fileListFrom, dataFrom,
		files,
	}
}

/**
 * 从给定的路径获取mrp文件信息
 * @param filename 文件路径
 */
export function getMrpInfoFromFile<G extends boolean = false>(filename: string, option?: IGetMrpInfoOption<G>): IMrpInfo<G> | null {
	return getMrpInfo(fs.readFileSync(filename), option)
}
