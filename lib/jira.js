const axios = require('axios');
const chalk = require('chalk');
const utils = require('./utils');

module.exports = {
    create({ assignee, summary, desc, type }) {

        console.log(chalk.green('Creating ticket with details'));
        console.log('Name: ', chalk.yellow(assignee));
        console.log('Summary: ', chalk.yellow(summary));
        console.log('Desc: ', chalk.yellow(desc));
        console.log('Type: ', chalk.yellow(type));

        const path = `https://${process.env.USERNAME}:${process.env.PASSWORD}@agile.massiveinteractive.com/rest/api/2/issue/`;
        const data = {
            fields: {
                project: {
                    key: 'AXISWEB17'
                },
                assignee: {
                    name: assignee
                },
                summary: utils.titleCase(summary),
                description: desc,
                issuetype: {
                    name: type
                }
            }
        };

        return new Promise((resolve, reject) => {
            axios.post(path, data)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                    //TODO: return useful error
                    reject(error);
                });
        });
    }
};
