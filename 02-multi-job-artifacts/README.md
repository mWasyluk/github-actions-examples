# 🧪 MODULE 02: Multi Job Artifacts
Learn how to **share files (artifacts) between jobs** which are executed on different instances of a Virtual Machine. 

## 📋 Table of Contents
- [🔑 Key Learnings](#-key-learnings)
- [🚀 Workflow Description](#-workflow-description)
- [📦 Project Structure](#-project-structure)
- [📝 Notes](#-notes)

## 🔑 Key Learnings
- Creating artifacts with `actions/upload-artifact@v4`
- Using artifacts with `actions/download-artifact@v4`
- Fetching subset of repo's files with `actions/checkout@v4` and `sparse-checkout`
- Setting up the JDK version with `actions/setup-java@v4`
- Creating a Docker image based on a running container with `docker commit`
- Better understanding of the `env` context

## 🚀 Workflow Description
The Module 02 workflow **automates building and publishing of a Docker image** containing a simple Java application. The application's purpose is to print a certain string value to a console. To achieve that, the workflow executes the following jobs:
1. downloads module files from the repository and, based on them, **builds an executable JAR file** that it then uploads as an artifact
2. downloads the JAR file, **runs the application and tests its output**
3. creates an application container, overwrites its property, and **builds a Docker image** which it then uploads as an artifact
4. downloads the image artifact, loads and **pushes it to DockerHub**.

## 📦 Project Structure
<pre>
📁.github/workflows/
  📄<a href="../.github/workflows/02-multi-job-artifacts.yml">02-multi-job-artifacts.yml</a>
📁02-multi-job-artifacts/    
  📁src/main/java/... 
    📄<a href="src/main/java/pl/mwasyluk/githubactionsexamples/App.java">App.java</a>
  📄 <a href="pom.xml">pom.xml</a>
</pre>

## 📝 Notes
- The `ubuntu-latest` runner contains **4 JDK versions**. The location of each is provided by environment variables: `JAVA_HOME_[8|11|17|21]_X64`. JDK 11 is the default version and its location is assigned to the `JAVA_HOME` variable.

  The simplest way to **override the JDK version** used in the Virtual Machine is to declare the `actions/setup-java@v4` action as follows (both input params are required):
  ```yaml
  env:
    JDK_VERSION: 8
  steps:
    - name: Set up JDK
      uses: actions/setup-java@v4
      with:
        java-version: ${{ env.JDK_VERSION }}
        distribution: 'temurin'
  ```

- In the YAML workflow configuration, **shell-style variable syntax `$VAR` is only handled inside the step's `run` key**, because only this value is handed to shell and processed by it. **Everywhere else (e.g. `steps[*].with` or `env`) the GitHub Actions expression syntax `${{ }}` must be used** to apply environment variable present in the `env` context, e.g. `${{ env.VAR }}`. Variables that are set via `echo "VAR=val" >> $GITHUB_ENV` can also be injected the same way.

- With the `actions/checkout@v4` action it is possible to **fetch specific files or directories from the target repository** (defaults to `${{ github.repository }}` or any other repository set via `with.repository`). To achieve this, all file / directory paths must be listed in the step's `with.sparse-checkout` key (each in a new line with the `|` in the first line) and the `with.sparse-checkout-cone-mode` key must be set to `false` (to avoid fetching neighbor blobs). E.g.:
  ```yaml
  - name: Fetch data
    uses: actions/checkout@v4
    with: 
      sparse-checkout: |
        01-docker-build-and-push/Dockerfile
        02-multi-job-artifacts
      sparse-checkout-cone-mode: false

  - name: Display content
    run: |
      ls 
      echo "====================="
      ls 01-docker-build-and-push
      echo "====================="
      ls 02-multi-job-artifacts
  ```
  Displays: 
  ```shell
  01-docker-build-and-push
  02-multi-job-artifacts
  =====================
  Dockerfile
  =====================
  README.md
  mvn
  pom.xml
  src
  ```
  Skipping the `sparse-checkout-cone-mode: false` line displays:
  ```shell
  01-docker-build-and-push
  02-multi-job-artifacts
  README.md
  =====================
  Dockerfile
  README.md
  index.html
  =====================
  README.md
  mvn
  pom.xml
  src
  ```
- The `actions/upload-artifact@v4` action creates an **isolated space for artifacts in every workflow run**. As long as the workflow does not declare the same name of artifact in different steps, the conflict error will not be thrown and the step's `with.overwrite: true` param has no effect.
- Literal block scalar (`|`) in YAML allows **passing multiple lines as key's value**. To execute **all lines in the step's `run` key as a single command**, it is required to provide additional backslash (`\`) at the end of each line and indent the continuation lines.
