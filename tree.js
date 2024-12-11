const fs = require('fs');
const path = require('path');

function createDirectoryTree(dir, prefix = '') {
    let output = '';
    const items = fs.readdirSync(dir);
    
    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        // Skip node_modules and .git directories
        if (item === 'node_modules' || item === '.git') {
            return;
        }

        output += `${prefix}${isLast ? '└── ' : '├── '}${item}\n`;
        
        if (stats.isDirectory()) {
            output += createDirectoryTree(
                itemPath, 
                `${prefix}${isLast ? '    ' : '│   '}`
            );
        }
    });
    
    return output;
}

console.log('.');
console.log(createDirectoryTree('.'));