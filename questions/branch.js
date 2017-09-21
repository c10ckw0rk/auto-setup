require('dotenv').config({ path: `${__dirname}/.env` });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../lib/utils');
const git = require('../lib/git');

const { JIRA_KEY: jiraKey } = process.env;

const questions = [
    {
        name: 'ticket',
        type: 'input',
        message: 'Ticket Number',
        default: `${jiraKey}-XXX`,
        validate: function (value) {
            if (value.length || value !== `${jiraKey}-XXX`) {
                return true;
            } else {
                return 'Enter the ticket number';
            }
        }
    },
    {
        name: 'type',
        type: 'list',
        default: 1,
        message: 'What type of ticket are you making?',
        choices: ['Story', 'Bug']
    },
    {
        name: 'desc',
        type: 'input',
        default: '',
        message: 'Whats the description?'
    }
];

module.exports = function () {
    inquirer.prompt(questions).then(responses => {
        const branchPrefix = responses.type === 'Bug' ? 'fix' : 'feature';
        const branchName = `${branchPrefix}/${jiraKey}-${responses.ticket}_${utils.branchName(responses.desc)}`;

        console.log(chalk.yellow('Creating branch...'));

        git.create(branchName, () => {
            console.log(chalk.green(`Branch ${branchName} created successfully`));
        })
    });
};
