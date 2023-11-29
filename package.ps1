# Copy files to dist folder
Copy-Item -Path ./html/ -Destination ./dist/ -Recurse -Force
Copy-Item -Path ./icons/ -Destination ./dist/ -Recurse -Force
Copy-Item -Path ./manifest.json -Destination ./dist/ -Force

# Compress files to xpi
New-Item -Path ./output/ -Type Directory -Force
Compress-Archive -Path ./dist/ -DestinationPath ./output/autorole.zip -Update
Move-Item -Path ./output/autorole.zip -Destination ./output/autorole.xpi -Force

# Create source code zip
Compress-Archive -Path ./src/, ./html/, ./icons/, ./manifest.json, ./package.json, ./webpack.config.ts, ./readme.md -DestinationPath ./output/autorole_src.zip -Update
