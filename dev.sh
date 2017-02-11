if [ ! -e node_modules/.bin/live-server ]; then npm install live-server; fi
./node_modules/.bin/live-server --no-browser;
killall watch
