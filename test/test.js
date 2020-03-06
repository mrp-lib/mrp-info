const tsNode = require('ts-node')
const path = require('path')
const fs = require('fs')

tsNode.register({
	project: path.join(__dirname, '../tsconfig.json'),
	files: true,
})


function parseFile(file) {
	const { getMrpInfoFromFile } = require('../src/index.ts')
	const info = getMrpInfoFromFile(file, { gunzip: true })
	if (info) {
		console.log(
			`------------------------------------------------------------\n`,
			`fileName:		\x1b[24G ${path.basename(file)}\n`,
			`type:			\x1b[24G ${info.type}\n`,
			`number:		\x1b[24G ${info.number}\n`,
			`author:		\x1b[24G ${info.author}\n`,
			`description:	\x1b[24G ${info.description}\n`,
			`showName:		\x1b[24G ${info.showName}\n`,
			`internalName:	\x1b[24G ${info.internalName}\n`,
			`version:		\x1b[24G ${info.version}\n`,
			`bytes:			\x1b[24G ${info.bytes}\n`,
			`fileListFrom:	\x1b[24G ${info.fileListFrom}\n`,
			`dataFrom:		\x1b[24G ${info.dataFrom}\n`,
			`files:			\x1b[24G ${info.files.length}\n`,
		)
	}
	else {
		console.log(
			`------------------------------------------------------------\n`,
			`fileName: ${path.basename(file)}\n`,
			`info: null`
		)
	}
}

//测试mrp信息
const mrpdir = path.join(__dirname, 'mrps')
//测试全部文件
// fs.readdirSync(mrpdir).filter(file => path.extname(file) == '.mrp').map(file => path.join(mrpdir, file)).forEach(file => parseFile(file))
// console.log(`------------------------------------------------------------`)

parseFile(path.join(mrpdir, '0d8c1db4534f3a8296cd5e8e8346d18d.mrp'))
