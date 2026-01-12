# gommette

## How to push a new version

1. Go to https://www.npmjs.com/settings/zoeagorize/tokens/
2. Generate a new token with 2FA disabled
3. Copy the value and add a `.env.local` with `NPM_TOKEN=npm_token_generated`
4. Launch `npm publish` (using npm credentials in dashlane)
5. git push
6. git push --tags
7. On github, create a new release targeting the new tag

## How to install the package in another project

Please refer to the [agorize-core documentation](https://github.com/Agorize/agorize-core/blob/master/README.md) for instructions on how to install it.
