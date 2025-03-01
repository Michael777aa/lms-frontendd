

# PRODUCTION
# git reset --hard
# git checkout master
# git pull origin master


nmp i yarn -g
yarn global add serve
yarn 
yarn run build 
pm2 start "yarn run start" --name=LMS_FRONTEND