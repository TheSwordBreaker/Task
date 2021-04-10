sudo apt-get update
sudo apt-get upgrade
sudo apt-get install git nginx -y
sudo ufw allow 'Nginx HTTP'

cd ~
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh
 
bash install_nvm.sh
nvm install 12.18.3

git clone https://github.com/TheSwordBreaker/Task.git
cd ~/Task
npm install
export MONGODB_URL = mongodb+srv://user:user@cluster0.ihfuu.mongodb.net/task?retryWrites=true&w=majority
npm startpm2






