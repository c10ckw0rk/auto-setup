const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

module.exports = {
    create({ branchName, title, desc }) {

        console.log(chalk.green('Creating pull request with details'));
        console.log('Branch: ', chalk.yellow(branchName));
        console.log('Title: ', chalk.yellow(title));
        console.log('Desc: ', chalk.yellow(desc));

        const {
            USERNAME: username,
            PASSWORD: password,
            STASH_DOMAIN: stashDomain
        } = process.env;

        const path = `https://${username}:${password}@${stashDomain}/rest/api/1.0/projects/MUI/repos/axis-web/pull-requests`;
        const data = {
            title: title,
            description: desc,
            state: 'OPEN',
            open: true,
            closed: false,
            fromRef: {
                id: `refs/heads/${branchName}`,
                repository: {
                    slug: 'axis-web',
                    name: null,
                    project: {
                        key: 'MUI'
                    }
                }
            },
            toRef: {
                id: 'refs/heads/master',
                repository: {
                    slug: 'axis-web',
                    name: null,
                    project: {
                        key: 'MUI'
                    }
                }
            },
            locked: false,
            reviewers: [
                {
                    user: {
                        name: 'charlie'
                    }
                }
            ]
        };

        return new Promise((resolve, reject) => {
            axios.post(path, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    //TODO: return useful error
                    reject(error);
                });
        });
    }
};
