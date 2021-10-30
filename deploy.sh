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
yarn --cwd frontend/ build

yarn --cwd backend/ install
yarn --cwd backend/ build

