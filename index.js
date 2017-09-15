#!/usr/bin/env node
require('dotenv').config({ path: `${__dirname}/.env` });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const jira = require('./lib/jira');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const utils = require('./lib/utils');
const git = require('./lib/git');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Gadgy', { horizontalLayout: 'default' })
    )
);

const questions = [
    {
        name: 'assignee',
        type: 'input',
        message: 'Who is the assignee?',
        default: process.env.USERNAME,
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Enter the name of the assignee';
            }
        }
    }, {
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
    }, {
        name: 'type',
        type: 'list',
        default: 1,
        message: 'What type of ticket are you making?',
        choices: ['Story', 'Bug']
    }, {
        name: 'desc',
        type: 'input',
        default: '',
        message: 'Whats the description?'
    }
];

inquirer.prompt(questions).then(answers => {
    jira.create(answers)
        .then(response => {

            const branchPrefix = answers.type === 'Bug' ? 'fix' : 'feature';
            const branchName = `${branchPrefix}/${response.key}_${utils.branchName(answers.summary)}`;

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
