# 🧪 Module 03: Deploy via SSH

Learn how to **deploy a built Docker image on a remote server** via SSH with the help of the `appleboy/ssh-action@v1` action.

## 📋 Table of Contents
- [🔑 Key Learnings](#-key-learnings)
- [🚀 Workflow Description](#-workflow-description)
- [📦 Project Structure](#-project-structure)
- [📝 Notes](#-notes)

## 🔑 Key learnings
- executing commands on a remote server via `appleboy/ssh-action@v1`
- setting multi-line text as an environment variable
- using `gh` to trigger a workflow run

## 🚀 Workflow Description
The Module 03 workflow automates the creation of a Docker image and its deployment on a remote server via SSH. The image is based on the `nginx:stable-alpine` image and contains a simple HTML file that is later served by the web server. To achieve the goal, the workflow executes the following steps:
1. **download the module files** from the GitHub repository
2. **build a Docker image and pushe** it to DockerHub
3. prepare a script that **creates the required environment variables** on the remote server and **executes Docker commands** (listed in the [deploy.sh](deploy.sh)) to: stop the running container (needed for future updates), pull the latest image from DockerHub, and run the container
4. connect to the remote server via SSH and **execute the prepared script**

## 📦 Project Structure
<pre>
📁 .github/workflows/
  📄 <a href="../.github/workflows/03-deploy-via-ssh.yml">03-deploy-via-ssh.yml</a>
📁 03-deploy-via-ssh/    
  📄 <a href="deploy.sh">deploy.sh</a>
  📄 <a href="Dockerfile">Dockerfile</a>
  📄 <a href="index.html">index.html</a>
</pre>

## 📝 Notes
- `appleboy/ssh-action@v1` **executes the `script` inputs parameter on the remote server *as is*** so passing there a file path or an environment variable which are only present on the runner causes the `not found` error.

- Setting **multiple lines of text as an environment variable requires multiple `echo` calls with a delimiter** that opens at the first line and closes at the last one. The following snippets show two valid approaches to do so: 
  ```yaml
  run: |
    {
      echo "SCRIPT<<EOF"
      echo "export CONTAINER_NAME=${{ env.CONTAINER_NAME }}"
      echo "export IMAGE_NAME=${{ env.IMAGE_NAME }}"
      echo "export CONTAINER_PORT=${{ env.CONTAINER_PORT }}"
      cat ${{ env.MODULE_DIR }}/deploy.sh
      echo "EOF"
    } >> "$GITHUB_ENV"
  ```
  or:
  ```yaml
  run: |
    echo "SCRIPT<<EOF" >> "$GITHUB_ENV"
    echo "export CONTAINER_NAME=${{ env.CONTAINER_NAME }}"  >> "$GITHUB_ENV"
    echo "export IMAGE_NAME=${{ env.IMAGE_NAME }}" >> "$GITHUB_ENV"
    echo "export CONTAINER_PORT=${{ env.CONTAINER_PORT }}" >> "$GITHUB_ENV"
    cat ${{ env.MODULE_DIR }}/deploy.sh >> "$GITHUB_ENV"
    echo "EOF" >> "$GITHUB_ENV"
  ```
  > **This syntax is specific to GitHub Actions**. A shell command setting an environment variable should rather look like the following:
  ```shell
  export SCRIPT=$(cat <<EOF
  export "CONTAINER_NAME=$CONTAINER_NAME"
  ...
  EOF)
  ```
  > The `eval` tool can execute the commands stored in the `SCRIPT` variable (using `$(echo $SCRIPT)` would ignore whitespace, including new lines).

- Only workflows that are committed to the `main` branch can be run manually with the `workflow_dispatch` trigger. To **run a workflow from any other branch use** `gh workflow run <workflow-name> -ref <branch-name>` with optional `-f <input-name>=<input-value>`.

- Double quotes and single quotes have a different effect in shell. **The double ones allow to interpolate every shell-style expression, but the single ones treat the enclosed value as a literal string**, e.g.:
  ```shell
  export VALUE=value
  echo "VAR=$VALUE"
  ```
  outputs `VAR=value`, but
  ```shell
  echo 'VAR=$VALUE'
  ```
  outputs `VAR=$VALUE`.

- In shell, command substitution (deprecated `` ` ``, or preferred `$()`) allows to **execute a command, capture its output and pass to the command** in which it was used, e.g.:
  ```shell
  echo "Current date is $(date +%F)"
  ```
  outputs `Current date is 2025-07-26`
