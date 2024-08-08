export default `


onmessage =async function(evt) {
  importScripts(evt.data.shimMinURL);
  importScripts(evt.data.xlsxFullMinURL);
    const weakMap = {};
    const symHeaders = Symbol('headers');
    const symwidth = Symbol('width');
    const dataIndex = Symbol('dataIndex');
    const valueFormat=evt.data.valueFormat;
    const expandColumns=evt.data.expandColumns;
    let columnWidths=[]
    let headersWidth=[] 
    weakMap[symHeaders]=[]
    weakMap[symwidth]=[]
    weakMap[dataIndex]=[]
    const workbook = XLSX.utils.book_new();
    const proTableConfig=evt.data.proTableConfigObj
    const keys = Object.keys(proTableConfig).sort((a, b) => {
  return proTableConfig[a].order - proTableConfig[b].order;
 });
 let proTablecolumn = keys.filter((i) => {
 return proTableConfig[i]?.show !== false;
});
// proTablecolumn=[...proTablecolumn,...expandColumns]
proTablecolumn.forEach((i)=>{
  evt.data.columns.forEach((e)=>{
      if(i===e.dataIndex||i===e.key){
        weakMap[symHeaders].push(e?.exportColumnName||e?.title||"")
        weakMap[symwidth].push({ wpx: proTableConfig[i]?.width||e?.width||100 })
        weakMap[dataIndex].push(e?.dataIndex||e?.key)
      }
  })
})
    function removeKeysNotInAndsortArray(obj, arr) {
       let row=[]
        let transferArr=[]
        for (let key in obj) {
          let index=arr.indexOf(key)
          if (index===-1) {
            delete obj[key];
          }else {
            transferArr[index]=[key,obj[key]]
          }
        }
        const resultObject = transferArr.reduce((i, [key, value],index) => {
          if(valueFormat?.hasOwnProperty(key)){
            i[index]=valueFormat[key][value]||""
            if (typeof i[index] === 'string') {
              row.push(i[index].length)

            } else {
              row.push(String(i[index]).length)
            }
            return i;
          }
          i[index] = value||"";
          if (typeof i[index] === 'string') {
            row.push(i[index].length)

          } else {
            row.push(String(i[index]).length)
          }
          return i;
        }, []);
        columnWidths.push(row)
        return resultObject
      }
    evt.data.data=evt.data.data.map((i)=>{
         return removeKeysNotInAndsortArray(i, weakMap[dataIndex])
    })
    const headerCellStyle = { fill: { fgColor: { rgb: 'FFFFFFFF' } } }; 
    const worksheet = XLSX.utils.aoa_to_sheet([evt.data.data[0],...evt.data.data]);
    XLSX.utils.sheet_add_aoa(worksheet, [weakMap[symHeaders]] );
    if(evt.data.widthAuto){
      headersWidth=weakMap[symHeaders].map((cell)=>{
        if (typeof cell === 'string') {
          return cell.length;
        } else {
          return String(cell).length;
        }
      })
      columnWidths.unshift(headersWidth)
      // 将每列的最大长度设置为列宽

      const widths = columnWidths.reduce((acc, row) => {
        row.forEach((val, i) => {
          acc[i] = Math.max(acc[i] || 0, val);
        });
        return acc;
      }, {});
      // 设置列宽
      worksheet['!cols'] = Object.keys(widths).map(col => ({
        wch: widths[col] + 15, // +15是为了给内容添加一些额外空间
      }));
      
    }else{
      worksheet['!cols'] =weakMap[symwidth]
    }


    for (const key in worksheet) {
      if (Object.hasOwnProperty.call(worksheet, key)) {
        const element = worksheet[key];
        if (typeof element === "object") {
          const index = Number(key.slice(1)) - 1;

          element.s = {
            alignment: {
              horizontal: "left", // 所有单元格右对齐
              vertical: "center", // 所有单元格垂直居中
            },
            font: {
              name: "宋体",
              sz: 10,
              italic: false,
              underline: false,
            },
            border: {//边框
              bottom: {
                style: 'thin',
                color: '0xFF8d9aad'
              },
              top: {
                style: 'thin',
                color: '0xFF8d9aad'
              },
              left: {
                style: 'thin',
                color: '0xFF8d9aad'
              },
              right: {
                style: 'thin',
                color: '0xFF8d9aad'
              },
            },

            fill: {
              fgColor: { rgb: "FFFFFFFF" },
            },
          };

          // 标题的样式
          if (index === 0) {
            element.s.font.bold = true;
            element.s.alignment.vertical = "center";
            element.s.alignment.horizontal = "center";
            element.s.fill.fgColor = { rgb: evt.data.headerColor};
          }

        }
      }
    }
    XLSX.utils.book_append_sheet(workbook,worksheet);
    postMessage({
        workbook
    });

};
`;
