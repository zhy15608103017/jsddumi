const fs = require('fs');
const path = require('path');

// 根据标记提取md文档内容
function extractSectionsFromMd(mdContent, startMarker, endMarker) {
    const sections = [];
    let insideSection = false;
    let currentSection = '';

    const lines = mdContent.split('\n');
    for (const line of lines) {
        if (line.trim() === startMarker) {
            insideSection = true;
            currentSection = '';
        } else if (line.trim() === endMarker) {
            insideSection = false;
            sections.push(currentSection.trim());
        } else if (insideSection) {
            currentSection += line + '\n'; // 保留换行符
        }
    }
    return sections.join('\n');
}


// 读取指定文件夹下的所有 Markdown 文件
function readMarkdownFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
    const markdownFiles = files.filter(file => path.extname(file) === '.md');
    const markdownContents = {};
    markdownFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        if(fileContent && fileContent.includes('<!-- 提取MD -->')) {
            const startMarker = '<!-- 提取MD -->'; // 你的起始标记
            const endMarker = '<!-- end提取MD -->';   // 你的结束标记
            const extractedString = extractSectionsFromMd(fileContent, startMarker, endMarker);
            markdownContents[file.split('.')[0]] = extractedString;
        }
    });
    return markdownContents;
}

// 生成 JavaScript 文件
function generateJavaScriptFile(folderPath, outputFile) {
    const markdownContents = readMarkdownFiles(folderPath);
    const jsContent = `${JSON.stringify(markdownContents, null, 4)}`;
    console.log('jsContent: ', jsContent.length);
    fs.writeFileSync(outputFile, jsContent);
}

// 指定文件夹路径和输出文件路径
const folderPath = 'docs/components';
const outputFile = './markdownContents.json';

// 生成 JavaScript 文件
generateJavaScriptFile(folderPath, outputFile);