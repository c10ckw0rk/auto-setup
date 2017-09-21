require('dotenv').config({ path: `${__dirname}/.env` });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const stash = require('../lib/stash');
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../lib/utils');
const git = require('../lib/git');

const { JIRA_KEY: jiraKey } = process.env;
const choices = process.env.STASH_REVIEWERS.split(',');

const questions = [
    {
        name: 'assignee',
        type: 'input',
        message: 'Branch Name?',
        default: `feature/${jiraKey}-XXX_foo_bar`,
        validate: function (value) {
            if (value.length || value !== `feature/${jiraKey}-XXX_foo_bar`) {
                return true;
            } else {
                return 'Whats the branch name?';
            }
        }
    },
    {
        name: 'wip',
        type: 'list',
        default: '',
        message: 'Have you received sign off by the Designer, another Developer and QA? (WIP)?',
        choices: ['Yes', 'No']
    },
    {
        name: 'Reviewers',
        type: 'checkbox',
        default: 1,
        message: `Who are the reviewers? If you answered no to WIP question you don't have to schedule any reviewers`,
        choices
    },
    {
        name: 'title',
        type: 'input',
        default: '',
        message: 'Whats the title?'
    },
    {
        name: 'body',
        type: 'input',
        default: '',
        message: 'Whats the body copy?'
    },
    {
        name: 'componentViewer',
        type: 'input',
        default: '',
        message: 'Path to component viewer'
    },
    {
        name: 'siteLink',
        type: 'input',
        default: '',
        message: 'Link to component in website'
    }
];

module.exports = function () {
    inquirer.prompt(questions).then(responses => {
        stash.create(responses).then(() => {

        }).catch(() => {

        })
    });
};
