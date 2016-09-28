#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

SOURCE_BRANCH="master"

function build {
  npm run lint && npm run test && npm run build
}

function configGit {
  git config user.name "Travis CI"
  git config user.email "$COMMIT_AUTHOR_EMAIL"
}

function setupDeployKeys {
  ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
  ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
  ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
  ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
  openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy.key.enc -out deploy.key -d
  chmod 600 deploy.key
  eval `ssh-agent -s`
  ssh-add deploy.key
}

function deploy {
  wget -O deploy_to_branch.sh https://github.com/X1011/git-directory-deploy/raw/master/deploy.sh && chmod +x deploy_to_branch.sh
  ./deploy_to_branch.sh
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    build
    exit 0
fi

setupDeployKeys
configGit
build
deploy
