echo "Building app..."


echo " Deploying backend files files o server..."

scp -r dist/* root@my-server-ip:/usr/applications/sensor-server/

echo "Done!"