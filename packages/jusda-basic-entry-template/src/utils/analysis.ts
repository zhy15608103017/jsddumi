const XLSX = require('xlsx');  
const fs = require('fs');  
  
const workbook = XLSX.readFile('./assets/basic.xlsx');
console.log("%c Line:5 🍉 workbook", "color:#e41a6a", workbook);

const obtainInstructionalDocument = () => {
	// 创建工作簿
	// const workbook = XLSX.utils.book_new();
	// const arr = [] as any[]

	// const workbook = await XLSX.read(res.data, {
	// 	type: 'buffer'
	// })
}