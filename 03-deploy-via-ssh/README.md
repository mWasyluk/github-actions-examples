# 🧪 Module 03: Deploy via SSH

## 🎯 Goal

## 🔑 Key learnings

## 📦 File structure
<pre>
📁 .github/workflows/
  📄 <a href="../.github/workflows/03-deploy-via-ssh.yml">03-deploy-via-ssh.yml</a>
📁 03-deploy-via-ssh/    
  📄 <a href="deploy.sh">deploy.sh</a>
  📄 <a href="Dockerfile">Dockerfile</a>
  📄 <a href="index.html">index.html</a>
</pre>

## 📝 Notes
- `appleboy/ssh-action@v1` executes `sripts` input on the remote server so passing there a file dir that is present on the runner causes the 'not found' error.
- setting multiple lines as an env var requires syntax different from the regular one as suggested in the GitHub Actions documentation: 
  ```yaml
  steps:
  - name: Set the value in bash
      id: step_one
      run: |
      {
          echo 'JSON_RESPONSE<<EOF'
          curl https://example.com
          echo EOF
      } >> "$GITHUB_ENV"
  ```

