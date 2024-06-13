import { GlspSocketServerLauncher } from "@eclipse-glsp/vscode-integration";
import * as childProcess from 'child_process';


export class DotnetGlspSocketServerLauncher extends GlspSocketServerLauncher {
    protected override startProcess(): childProcess.ChildProcessWithoutNullStreams {
        if (this.options.executable.endsWith('.exe')) {
            return this.startExeProcess();
        } else if (this.options.executable.endsWith('.dll')) {
            return this.startDotnetProcess();
        } else {
            throw new Error(`Could not launch GLSP Server. Invalid executable path ${this.options.executable}`);
        }
    }

    private startExeProcess(): childProcess.ChildProcessWithoutNullStreams {
        if (!this.options.executable.endsWith('.exe')) {
            throw new Error(`Could not launch Node GLSP server. The given executable is no Exe: ${this.options.executable}`);
        }
        const args = [
            '--urls',
            `http://${this.options.socketConnectionOptions.host ?? '127.0.0.1'}:${this.options.socketConnectionOptions.port}`,
            ...this.options.additionalArgs
        ];

        return childProcess.spawn(this.options.executable, args);
    }

    private startDotnetProcess(): childProcess.ChildProcessWithoutNullStreams {
        if (!this.options.executable.endsWith('.dll')) {
            throw new Error(`Could not launch Node GLSP server. The given executable is no DLL: ${this.options.executable}`);
        }
        const args = [
            this.options.executable,
            '--urls',
            `http://${this.options.socketConnectionOptions.host ?? '127.0.0.1'}:${this.options.socketConnectionOptions.port}`,
            ...this.options.additionalArgs
        ];

        return childProcess.spawn('dotnet', args);
    }

}
