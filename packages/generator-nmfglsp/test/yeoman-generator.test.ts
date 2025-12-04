/******************************************************************************
 * Copyright 2022 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import * as path from 'node:path';
import * as url from 'node:url';
import { describe, test } from 'vitest';
import type * as Generator from 'yeoman-generator';
import { createHelpers } from 'yeoman-test';
import type { Answers, PostAnwers } from '../src/index.js';

const answersForCore: Answers & PostAnwers = {
    extensionName: 'hello-world',
    rawLanguageName: 'Hello World',
    fileExtensions: '.hello',
    includeVSCode: false,
    includeWeb: false,
    openWith: false
};

describe('Check yeoman generator works', () => {
    const packageTestDir = url.fileURLToPath(new URL('.', import.meta.url));
    const moduleRoot = path.join(packageTestDir, '../app');

    const files = (targetRoot: string) => [
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/FinalState.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/IFinalState.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/IStartState.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/IStateMachine.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/IState.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/ITransition.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/StartState.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/State.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/StateIncomingCollection.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/StateOutgoingCollection.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/StateMachine.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Metamodel/Transition.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/FsmLanguage.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/Program.cs',
        targetRoot + '/backend/HelloWorldGLSPServer/StateMachine.nmeta',
        targetRoot + '/backend/HelloWorldGLSPServer/Properties/MetamodelRegistry.cs',
        targetRoot + '/.gitignore',
        targetRoot + '/tsconfig.json',
        targetRoot + '/tsconfig.build.json',
        targetRoot + '/package.json',
        targetRoot + '/packages/hello-world-glsp-client/css/diagram.css',
        targetRoot + '/packages/hello-world-glsp-client/src/diagram-module.ts',
        targetRoot + '/packages/hello-world-glsp-client/src/index.ts',
        targetRoot + '/packages/hello-world-glsp-client/src/menu.ts',
        targetRoot + '/packages/hello-world-glsp-client/src/model.ts',
        targetRoot + '/packages/hello-world-glsp-client/src/views.tsx',
        targetRoot + '/packages/hello-world-glsp-client/.eslintrc.cjs',
        targetRoot + '/packages/hello-world-glsp-client/package.json',
        targetRoot + '/packages/hello-world-glsp-client/README.md',
        targetRoot + '/packages/hello-world-glsp-client/tsconfig.json'
    ];

    test('should produce files for backend and GLSP client', async () => {

        const context = createHelpers({}).run(path.join(moduleRoot));

        // generate in examples
        const targetRoot = path.resolve(packageTestDir, '../../../examples');
        const extensionName = answersForCore.extensionName;

        // remove examples/hello-world (if existing) now and finally (don't delete everything else in examples)
        context.targetDirectory = path.resolve(targetRoot, extensionName);
        context.cleanTestDirectory(true);

        await context
            .withOptions(<Generator.BaseOptions>{
                // we need to explicitly tell the generator it's destinationRoot
                destinationRoot: targetRoot
            })
            .onTargetDirectory(workingDir => {
                // just for double checking
                console.log(`Generating into directory: ${workingDir}`);
            })
            .withAnswers(answersForCore)
            .withArguments('skip-install')
            .then((result) => {
                const projectRoot = targetRoot + '/' + extensionName;

                result.assertFile(files(projectRoot));

                result.assertJsonFileContent(projectRoot + '/package.json', PACKAGE_JSON_EXPECTATION);
            }).finally(() => {
                context.cleanTestDirectory(true);
            });
        context.cleanTestDirectory(true); // clean-up examples/hello-world
    }, 120_000);

    test('should produce files for VS Code and Standalone', async () => {

        const context = createHelpers({}).run(path.join(moduleRoot));

        // generate in examples
        const targetRoot = path.resolve(packageTestDir, '../../../examples');
        const extensionName = 'hello-world';

        // remove examples/hello-world (if existing) now and finally (don't delete everything else in examples)
        context.targetDirectory = path.resolve(targetRoot, extensionName);
        context.cleanTestDirectory(true);

        await context
            .withOptions(<Generator.BaseOptions>{
                // we need to explicitly tell the generator it's destinationRoot
                destinationRoot: targetRoot
            })
            .onTargetDirectory(workingDir => {
                // just for double checking
                console.log(`Generating into directory: ${workingDir}`);
            })
            .withArguments('skip-install')
            .withAnswers( <Answers>{
                ...answersForCore,
                extensionName,
                includeVSCode: true,
                includeWeb: true
            }).then((result) => {
                const projectRoot = targetRoot + '/' + extensionName;

                result.assertFile(files(projectRoot));
                result.assertJsonFileContent(projectRoot + '/package.json', {
                    ...PACKAGE_JSON_EXPECTATION,
                    workspaces: [
                        ...PACKAGE_JSON_EXPECTATION.workspaces,
                        'packages/hello-world-standalone',
                        'packages/hello-world-vscode',
                        'packages/hello-world-vscode-webview'
                    ]
                });
            }).finally(() => {
                context.cleanTestDirectory(true);
            });
    }, 120_000);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PACKAGE_JSON_EXPECTATION: Record<string, any> = {
    name: 'hello-world-workspaces',
    private: true,
    scripts: {
        'test': 'vitest'
    },
    'workspaces': [
        'packages/hello-world-glsp-client'
    ],
    'devDependencies': {
        '@types/node': '~16.18.41',
        '@typescript-eslint/eslint-plugin': '~6.4.1',
        '@typescript-eslint/parser': '~6.4.1',
        'eslint': '~8.56.0',
        'typescript': '^5.5.3'
    }
};
