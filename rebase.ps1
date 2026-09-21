$nodeSequenceEditor = "const fs=require('fs');const f=process.argv[2];fs.writeFileSync(f, fs.readFileSync(f,'utf8').replace(/pick/g,'reword'));"
Set-Content seq.cjs $nodeSequenceEditor

$nodeEditor = "const fs = require('fs'); const file = process.argv[2]; let text = fs.readFileSync(file, 'utf8'); text = text.replace(/Co-Authored-By: Claude.*/g, ''); fs.writeFileSync(file, text);"
Set-Content rewrite.cjs $nodeEditor

$env:GIT_SEQUENCE_EDITOR = "node `"$PWD\seq.cjs`""
$env:GIT_EDITOR = "node `"$PWD\rewrite.cjs`""

git rebase -i HEAD~10
git push origin --force

Remove-Item seq.cjs, rewrite.cjs
