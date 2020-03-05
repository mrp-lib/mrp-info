
export interface IGetMrpInfoOption<G extends boolean> {
	/**
	 * 字符串编码转换，默认是utf8，如果要保持gbk则传入gbk
	 * 
	 * 因为mrp文件中的名称是gbk编码，为了在js中显示，需要进行一下转码
	 */
	stringConv?: string
	/**
	 * 是否进行数据的gzip解压，默认false
	 * 
	 * 解压后的数据将在dataGuzip中
	 */
	gunzip?: G
}

/** mrp文件内部的文件信息 */
export interface IMrpFile<G extends boolean> {
	/** 文件名 */
	filename: string
	/** 文件在mrp文件中的位置 */
	position: number
	/** 文件长度 */
	size: number
	/** 数据内容 */
	data: Buffer
	/** 进行gzip解压之后的文件 */
	dataGziped: G extends true ? Buffer : undefined
}

/** mrp文件信息 */
export interface IMrpInfo<G extends boolean> {
	/** 文件类型，MRPG */
	type: string
	/** 版本 */
	version: number
	// /** 应用的串号 */
	// imei: string
	/** 应用的作者 */
	author: string
	/** 应用说明 */
	description: string
	/** 显示名称 */
	showName: string
	/** 内部名 */
	internalName: string
	/** 编号 */
	number: number
	/** 字节数 */
	bytes: number
	/** 文件列表位置 */
	fileListFrom: number
	/** 数据开始位置（实际应该+8才是） */
	dataFrom: number
	/** 文件列表 */
	files: Array<IMrpFile<G>>
}