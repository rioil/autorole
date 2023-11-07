Compress-Archive -Path ./dist/, ./html/, ./icons/, ./manifest.json -DestinationPath ./autorole.xpi -Update
Compress-Archive -Path ./src/, ./html/, ./icons/, ./manifest.json, ./package.json, ./webpack.config.js, ./readme.md -DestinationPath ./autorole_src.zip -Update
