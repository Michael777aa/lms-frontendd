#!/bin/bash

# PRODUCTION DEPLOYMENT SCRIPT

# Reset any local changes
git reset --hard

# Switch to master branch
git checkout master

# Pull the latest changes
git pull origin master

# Install Yarn globally if not installed
npm install -g yarn

# Install dependencies
yarn install

# Build the project
yarn run build

# Stop & delete previous PM2 process (if exists)
pm2 stop LMS_FRONTEND || true
pm2 delete LMS_FRONTEND || true

# Start the application with PM2
pm2 start "yarn run start" --name=LMS_FRONTEND

# Save PM2 process list
pm2 save

# Show logs
pm2 logs LMS_FRONTEND
