# 🚀 GitHub Actions Examples

### Practical examples of CI/CD processes using GitHub Actions and Docker.

Each directory within this repository contains **an independent example of a particular GitHub Actions feature use case** - from building simple applications to complex development processes including tests, publishing and deployment.

Some module workflows are designed to create and/or push Docker images containing sample projects to DockerHub. Each of them **can be found under a different image tag** corresponding to the module name. 

See [all tags on DockerHub](https://hub.docker.com/r/mwas0122/github-actions-examples/tags).

## 📦 Repository structure
📁 <a href=".github/workflows/">.github/workflows/</a> -> workflow configurations for every module \
📁 <a href="00-playground/">00-playground</a> -> basic functionalities test \
📁 <a href="01-docker-build-and-push/">01-docker-build-and-push</a> -> 
building, testing and publishing a Docker image that contains a simple HTML website served by Nginx web server \
📁 <a href="02-multi-job-artifacts/">02-multi-job-artifacts</a> -> Java application and Docker image shared between worflow jobs as artifacts 

## 🧰 Technologies
- **Git & GitHub Actions**
- **Docker & DockerHub**
- **Shell**
- **Nginx**
- **HTML**
- **Java**
- **Maven**

⏳ More in progress...
