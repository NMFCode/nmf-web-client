# NMF Package Generator

This [Yeoman](https://yeoman.io) generator is used to create a new [GLSP](https://langium.org/) extension for VS Code, based on [NMF GLSP](https://nmfcode.github.io/glsp/index.html).

## Prerequisites

NMF GLSP requires a .NET SDK to be installed (at least .NET 8). To install it, follow the [instructions](https://github.com/dotnet/core/blob/main/release-notes/9.0/install.md) provided by Microsoft. Then, the generator itself can be installed via NPM. We recommend a systemwide installation.

```bash
npm install generator-nmfglsp --global --save-dev
```

## Using the generator

The code generator scaffolds a new NMF GLSP project. You can start it via the command line as follows:

```bash
yo nmfglsp
```

By default, the code generator is interactive and will ask for a range of details such as the name of your language and the features it should generate. Based on this information, the code generator will generate a new directory with the following artifacts already set up for you:

- An NMF GLSP diagram language for state machines
- A C\# project that creates an GLSP server of your language
- A node project that implements the GLSP client
- A standalone web application that shows how to integrate the diagram into existing websites
- A web application that packages your GLSP client into a web page to be used by a Visual Studio Code extension
- A Visual Studio Code extension that integrates the GLSP server (using the web page from above)
- Visual Studio Code launch configurations such that you can easily debug your VS Code extension

These artifacts are set up such that they integrate with each other. For example, the build directory of the GLSP server is exactly where the VS Code extension is expecting it.

## Launching the new extension

If you let the code generator generate a Visual Studio Code extension, the code generator will also compile the newly generated code and generate a launch configuration file that allows you to launch your new GLSP-based extension directly from the run menu in Visual Studio Code.
