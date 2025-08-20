# 🧪 Module 04: Cache Dependencies

Learn how to **persist and reuse cache for building Docker images** via `actions/cache@v4` to improve the build time.

**Application developed in this module is served on [https://todos.mwasyluk.pl](https://todos.mwasyluk.pl).**

### 🎊 Results
Due to the cache improvement applied to the workflow, the image build time changed in the following manner:
1. First `docker build`: **1m 21s**
2. `docker build` after frontend files change: **47s**
3. `docker build` without further changes: **29s**

As you can see from the results, the time of building images has been reduced drastically - **almost 3 times** in case where build layers did not change comparing to the first run.

## 📋 Table of Contents
- [🔑 Key Learnings](#-key-learnings)
- [🚀 Workflow Description](#-workflow-description)
- [📦 Project Structure](#-project-structure)
- [📝 Notes](#-notes)

## 🔑 Key Learnings
- persisting files with `actions/cache@v4`
- using the `--cache-to` and `--cache-from` options for `docker build`
- using a custom docker builder with `docker buildx build`
- implementing bash script conditions, loops, and arrays

## 🚀 Workflow Description
The Module 04 workflow **automates building Docker images and improves that process by reusing cache between independent workflow runs**. The improvement allows to build and test images much faster than in the regular approach. Additionaly, the workflow deploys the built images on a remote server via SSH. To achieve the goals, the workflow executes the following steps:
1. **download the module files** from the GitHub repository
2. **prepare cache configuration** for persisting and retrieving cache files
3. **set up custom builder** via `docker/setup-buildx-action@v3`
4. **run the script that builds Docker images** using the prepared cache 
5. **push the images** to a remote repository (DockerHub)
6. **prepare the deployment script** along with the required env variables 
7. **execute the script on a remote server** via `appleboy/ssh-action@1`

## 📦 Project Structure
<pre>
📁 .github/workflows/
  📄 <a href="../.github/workflows/04-cache-dependencies.yml">04-cache-dependencies.yml</a> - workflow config
📁 04-cache-dependencies/    
  📁 backend/
    📁 src/main/
      📁 java/.../githubactionsexamples/
        📁 <a href="backend/src/main/java/pl/mwasyluk/githubactionsexamples/todo/">todo</a> - todo business logic
        📄 <a href="backend/src/main/java/pl/mwasyluk/githubactionsexamples/Main.java">Main.java</a> - Spring entrypoint and healthcheck endpoint config
      📁 resources/
        📄 <a href="backend/src/main/resources/application.yml">application.yml</a> - Spring config
  📁 frontend/
    📁 <a href="frontend/src/">src/</a> - frontend source files
    📄 <a href="frontend/package.json">package.json</a> - frontend config
  📁 docker/
    📄 <a href="docker/backend.Dockerfile">backend.Dockerfile</a> - backend image build instruction
    📄 <a href="docker/frontend.Dockerfile">frontend.Dockerfile</a> - frontend image build instruction
    📄 <a href="docker/build.sh">build.sh</a> - images building script
    📄 <a href="docker/run.sh">run.sh</a> - containers running script
  📁 nginx/
    📄 <a href="nginx/default.conf">default.conf</a> - nginx config
</pre>

## 📝 Notes
- **CORS configuration is not necessary when frontend requests to a server are proxied by Nginx via `proxy_pass`**. In this scenario, the request origin is the same as the server host (with Nginx on both sides).
- Using `docker build` command will use the `docker` builder by default which does not support exporting any cache from the built layers. **Using `docker/setup-buildx-action@v3`** (without additional inputs) **creates a new builder** but it will be **effective only when using the `docker buildx build` command**.
- The `restore-keys` input in `actions/cache@v4` allows **to restore the latest cache with the given key prefix** in case when the exact hit to the `key` input could not be found. It allows **to reuse parts of the cache that could be still valid**, e.g. unchanged layers of a docker image built in the previous run.

