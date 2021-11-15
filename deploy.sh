BRANCH=$1;
if [[ -z $BRANCH ]]; then # branch was not provided
	BRANCH="origin/master"
fi

echo "Will deploy '$BRANCH'"
read -p "If you want to do that, press enter to continue"

git fetch origin
git reset --hard
git checkout $BRANCH
yarn install
yarn --cwd frontend/ install
ln -s ~/code/.env-frontend frontend/.env.local
yarn --cwd frontend/ build


yarn --cwd backend/ install
ln -s ~/code/.env-backend backend/.env.local

yarn --cwd backend/ build

