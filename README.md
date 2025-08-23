# 🚀 GitHub Actions Examples

### Practical examples of CI/CD processes using GitHub Actions and Docker.

Each directory within this repository contains **an independent example of a particular GitHub Actions feature use case** - from building simple applications to complex development processes including tests, publishing and deployment.

Some module workflows are designed to create and/or push Docker images containing sample projects to DockerHub. Each of them **can be found under a different image tag** corresponding to the module name. 

🐳 See [all tags on DockerHub](https://hub.docker.com/r/mwas0122/github-actions-examples/tags).

⭐ See the app developed in Module 04 on **[https://todos.mwasyluk.pl](https://todos.mwasyluk.pl)**.

## 📦 Repository structure
📁 <a href=".github/workflows/">.github/workflows/</a> -> configurs workflows for every module \
📁 <a href="00-playground/">00-playground</a> -> tests basic functionalities \
📁 <a href="01-docker-build-and-push/">01-docker-build-and-push</a> -> 
builds, tests and publishes a Docker image \
📁 <a href="02-multi-job-artifacts/">02-multi-job-artifacts</a> -> shares Java application and Docker image (artifacts) between worflow jobs \
📁 <a href="03-deploy-via-ssh/">03-deploy-via-ssh</a> -> builds a Docker image and deploys it on a remote server via SSH \
📁 ⭐<a href="04-cache-dependencies/">04-cache-dependencies</a>⭐ -> stores docker cache between runs and reuses it to build images

## 🧰 Technologies
- **Git & GitHub Actions**
- **Docker & DockerHub**
- **Shell**
- **Nginx**
- **HTML**
- **JavaScript**
- **React**
- **Maven**
- **Java**
- **Spring & Spring Boot**
