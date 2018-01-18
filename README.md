# Code forensics

Template to run several tasks defined in [code-forensics project](https://github.com/smontanari/code-forensics)

### Instructions
- yarn install
- Open gulpfile.js and edit "rootPath" to point to your code (relative path is needed)
- Type gulp all in your console
- Type "gulp webserver" in another terminal and open browser to check results

  
### Setup
You can edit gulpfile.js to improve certain reports
#### Teams
- git shortlog -s | cut -c8-
- Setup your teams with the data above
- Or use Git .mailmap to map authors