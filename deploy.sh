#!/bin/bash

# PRODUCTION DEPLOYMENT SCRIPT

# Reset any local changes
git reset --hard

# Switch to master branch
git checkout master

# Pull the latest changes
git pull origin master

# Install Yarn globally if not installed
npm run build


pm2 start "npm run start" --name=frontend


# Show logs
pm2 logs frontend
