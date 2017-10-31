#!/usr/bin/env bash
#
#  ╦  ╔═╗╔╦╗╔═╗╔═╗╔╦╗ 
#  ║  ╠═╣ ║ ║╣ ╚═╗ ║  
#  ╩═╝╩ ╩ ╩ ╚═╝╚═╝ ╩  
#
# Help util to add / upgrade dependencies to the latest version.

dependencies=(
  "eslint@latest" 
  "babel-eslint@latest" 
  "eslint-config-prettier@latest"
)
airbnbConfig="eslint-config-airbnb"

# Add/Update non airbnb dependencies
yarn add "${dependencies[@]}"

# Add/Update airbnb eslint config and it's peerDependencies
npm info "$airbnbConfig@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add "$airbnbConfig@latest" --dev