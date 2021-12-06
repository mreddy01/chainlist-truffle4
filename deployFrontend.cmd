robocopy src docs /e
robocopy build\chainlist.json docs
git add .
git commit -m "adding frontend files to githib pages"
git push