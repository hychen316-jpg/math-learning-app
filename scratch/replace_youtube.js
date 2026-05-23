const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'assets', 'js');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 將所有 results?search_query 搜尋連結，替換為台北酷課雲頻道首頁
    const newContent = content.replace(/https:\/\/www\.youtube\.com\/results\?search_query=[^']+/g, 'https://www.youtube.com/@CooC-Cloud');
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
