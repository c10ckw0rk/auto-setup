const jira = require('../lib/jira');
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../lib/utils');
const git = require('../lib/git');

const questions = [
    {
        name: 'assignee',
        type: 'input',
        message: 'Whose the assignee?',
        default: 'daniel.peterson',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Enter the name of the assignee';
            }
        }
    },
    {
        name: 'summary',
        type: 'input',
        message: 'Whats the title?',
        default: 'Test Ticket',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Enter the title';
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

module.exports = function() {
    inquirer.prompt(questions).then(responses => {
        jira.create(responses)
            .then(response => {

                const branchPrefix = responses.type === 'Bug' ? 'fix' : 'feature';
                const branchName = `${branchPrefix}/${response.key}_${utils.branchName(responses.summary)}`;

                console.log(chalk.green(`Ticket created ${response.key} successfully`));
                console.log(chalk.yellow('Creating branch...'));

                git.create(branchName, () => {
                    console.log('Branch ' + chalk.yellow(branchName) + ' Created');
                })

            })
            .catch(() => {
                console.log(chalk.red('There was an error creating the ticket'));
            })
    });
};