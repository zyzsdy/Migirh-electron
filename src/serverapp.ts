import * as path from 'path';
import * as fs from 'fs';
import { spawn, ChildProcess } from 'child_process';
import sleep from './utils/sleep';

export default async function startApp(): Promise<[number, ChildProcess, LocalToken]> {
    const processCwd = process.cwd();

    const nodepath = path.join(processCwd, "resources/libs/node/migirh-node.exe");

    console.log("nodepath: " + nodepath);

    const cwd = path.join(processCwd, "resources/libs/migirh-core");

    console.log("cwd: " + cwd);

    let child = spawn(nodepath, ["dist/main.js"], {
        cwd: cwd
    });

    let localToken = await getLocalToken(processCwd);

    return [46015, child, localToken];
}

export interface LocalToken {
    token: string;
    sk: string;
}

async function getLocalToken(processCwd: string) {
    const localTokenPath = path.join(processCwd, "resources/libs/migirh-core/.migirh/localAdminToken.json");
    for (let i = 0; i < 50; i++) {
        console.log(`Try to get the local token, ${i + 1}th time.`);
        await sleep(500);

        if (fs.existsSync(localTokenPath)) {
            let tokenStr = fs.readFileSync(localTokenPath, 'utf-8');
            let token = JSON.parse(tokenStr) as LocalToken;
            return token;
        }
    }

    console.log("The local token could not be got. Startup failed.");
}