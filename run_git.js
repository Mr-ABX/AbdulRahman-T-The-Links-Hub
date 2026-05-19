const { execSync } = require('child_process');
console.log(execSync('git log -p -n 3 src/App.tsx').toString());
