# 🧪 Module 00: Playground

Playground is **an experimental module** where the basic features of GitHub Actions were tested in action.

Those tests were designed to provide **hands-on experience with workflow configurations**, such as: basic syntax, keywords, or environment.

## 🎯 Goal

The main goal was to get familiar with **the `.yml` configuration files** that are handling the automation processes using Virtual Machines (VM). It was also essential to learn **the most basic keywords** that allow executing commands on a remote machine, and explore **how the workflow instructions allow manipulation of the VM environment**.

## 🔗 Table of content
| Workflow  | Name | Key learnings |
| - | - | - |
| [playground-01.yml](../.github/workflows/playground-01.yml) | Display properties of every context | `env` property <br> `${{ }}` syntax <br> `toJson()` method |
| [playground-02.yml](../.github/workflows/playground-02.yml) | Extract repository name from github context | `$GITHUB_ENV` file |

## 📝 Notes 
- **Every step is handled by a different shell**. Creating an environment variable via `export VAR=val` does not allow to use it in subsequent steps because **the `export` command creates variables that are available only for the subprocesses of the shell** in which they were created. 
