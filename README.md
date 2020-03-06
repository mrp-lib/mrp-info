# MRP-INFO

获取斯凯mrp文件的信息和文件内容


## 使用
调用getMrpInfo或getMrpInfoFromFile函数即可得到对应mrp文件的信息和文件内容。

当获取信息失败时会抛出对应的错误，具体可以从`typing/errors.d.ts`中查看。

```typescript
import fs from 'fs'
import { getMrpInfo } from 'mrp-info'

console.log(getMrpInfo(fs.readFileSync('<mrp filepath>')))
```

# 数据解压缩
使用gunzip选项可以将文件进行解压缩，解压缩之后的数据在文件的dataGuzip中。

```typescript
const info = getMrpInfoFromFile('<mrp filepath>', { gunzip: true })
console.log(info.files[0].dataGuzip)
```