require('dotenv').config({ path: `${__dirname}/.env` });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ticket = require('./questions/jira-ticket');
const branch = require('./questions/branch');
const pullRequest = require('./questions/pull-request');

clear();
console.log(
    chalk.yellow(
        figlet.textSync('Massive Pal', { horizontalLayout: 'default' })
    )
);

inquirer.prompt([{
    name: 'type',
    type: 'list',
    default: 0,
    message: 'What would you like to do today?',
    choices: [
        'Ticket',
        'Pull Request',
        'Branch'
    ]
}]).then(responses => {

    clear();

    console.log(chalk.green(`- ${responses.type}`));

    const options = {
        Ticket: ticket,
        'Pull Request': pullRequest,
        Branch: branch
    }[responses.type];

    options();

});
