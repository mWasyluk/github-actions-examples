# 🧪 Module 01: Docker Build And Push

## 🎯 Goal
Automate the process of building and publishing a simple static HTML file using GitHub Actions and Docker. After every change in the repository, updated and tested Docker Image should be pushed to DockerHub.

## 🔑 Key learnings
* `secrets` context
* `on.push.paths[-ignore]` property
* `job.step.uses` property
* `actions/checkout@v4` action
* `success()` method

## 📦 File structure
<pre>
📁 .github/workflows/
    📄 <a href="../.github/workflows/01-docker-build-and-push.yml">01-docker-build-and-push.yml</a>
📁 01-docker-build-and-push/    
    📄 <a href="Dockerfile">Dockerfile</a>
    📄 <a href="index.html">index.html</a>
</pre>

## 📝 Notes
- `if` property allows to declare condition that induces whether the step should be executed, but **every consecutive step will ignore the result of that condition**. If the condition in the current step is not met, the step will be ignored (skipped) and the workflow will proceed to the next step.
- Overwriting the Virtual Machine (VM) environment via `echo "VAR=val" >> $GITHUB_ENV` command **does not allow to use the variable in the same step, use the `VAR=val` command insted** or declare the variable usage in the next step.
- **Each job is executed on a different instance of VM** so creating Docker Images allows to use them only in the job where they were created.
- The `env` property does not allow to create variables based on the previously declared environment variables, but it is possible to use `${{}}` syntax in this purpose as it is replaced with the corresponding context variable **before the workflow interpretation**.
