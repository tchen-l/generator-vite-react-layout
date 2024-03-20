const path = require('path');
const fs = require('fs');
const Generators = require('yeoman-generator');

module.exports = class extends Generators {
  constructor(args, opts, features) {
    super(args, opts, features);
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        validate: (name) => {
          if (!name) {
            return 'Project name cannot be empty';
          }

          if (!/\w+/.test(name)) {
            return 'Project name should only consist of 0~9, a~z, A~Z, _, .';
          }

          if (!this.fs.exists(this.destinationPath(name))) {
            return true;
          }

          if (fs.statSync(this.destinationPath(name)).isDirectory()) {
            return 'Project already exist';
          }

          return true;
        },
      },
    ]).then((answers) => {
      this.answer = { answers };

      return this.answer;
    });
  }

  configuring() {
    this.destinationRoot(path.join(this.destinationRoot(), this.answer.answers.name));
  }

  writting() {
    this.fs.copy(this.templatePath('.husky'), this.destinationPath('.husky'));
    this.fs.copy(this.templatePath('.vscode'), this.destinationPath('.vscode'));
    this.fs.copy(this.templatePath('env/.env'), this.destinationPath('env/.env'));
    this.fs.copy(this.templatePath('env/.env.test'), this.destinationPath('env/.env.test'));
    this.fs.copy(this.templatePath('env/.env.staging'), this.destinationPath('env/.env.staging'));
    this.fs.copy(
      this.templatePath('env/.env.production'),
      this.destinationPath('env/.env.production')
    );
    this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('eslintrc.cjs'), this.destinationPath('.eslintrc.cjs'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('prettierignore'), this.destinationPath('.prettierignore'));
    this.fs.copy(this.templatePath('prettierrc.cjs'), this.destinationPath('.prettierrc.cjs'));
    this.fs.copy(
      this.templatePath('commitlint.config.js'),
      this.destinationPath('commitlint.config.js')
    );
    this.fs.copy(this.templatePath('index.html'), this.destinationPath('index.html'));
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.answer
    );
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(
      this.templatePath('tsconfig.node.json'),
      this.destinationPath('tsconfig.node.json')
    );
    this.fs.copy(this.templatePath('vite.config.ts'), this.destinationPath('vite.config.ts'));
  }

  install() {
    return this.spawnCommand('yarn');
  }

  end() {
    const { answers } = this.answer;

    this.log();
    this.log.ok(`Project ${answers.name} generated!!!`);
  }
};
