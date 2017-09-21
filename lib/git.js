const { spawn } = require('child_process');
const repoDir = process.env.REPO_PATH;

function exec(cmd, params, close) {
    return new Promise((resolve, reject) => {
        const spwn = spawn(cmd, params);

        spwn.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        spwn.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        spwn.on('close', () => {
            resolve();
        });
    });
}

module.exports = {
    create(name, done) {
        exec('git', [
            `--git-dir=${repoDir}/.git`,
            `--work-tree=${repoDir}`,
            'checkout', '-b',
            name,
            'master'
        ]).then(() => {
            exec('git', [
                `--git-dir=${repoDir}/.git`,
                `--work-tree=${repoDir}`,
                'push',
                '--set-upstream',
                'origin',
                name
            ]).then(done);
        }).catch(e => {
            console.log(e);
        })
    }
};
