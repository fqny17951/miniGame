%~d0
cd %~dp0
"C:\Program Files (x86)\Git\cmd\git.exe" init
"C:\Program Files (x86)\Git\cmd\git.exe" add README.md
"C:\Program Files (x86)\Git\cmd\git.exe" commit -m "first commit"
"C:\Program Files (x86)\Git\cmd\git.exe" remote add origin https://github.com/fqny17951/miniGame.git
"C:\Program Files (x86)\Git\cmd\git.exe" push -u origin master