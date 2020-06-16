#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const template = require("art-template");

inquirer
  .prompt([
    { type: "input", name: "name", message: "Project name?" },
    { type: "input", name: "content", message: "Project content?" },
  ])
  .then((answers) => {
    const tempDir = path.join(__dirname, "templates");
    const destDir = process.cwd();

    fs.readdir(tempDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const result = template(path.join(tempDir, file), answers);
        fs.writeFileSync(path.join(destDir, file), result);
      });
    });
  });
