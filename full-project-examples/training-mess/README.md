```bash
npx express-generator --view=ejs playground
git init !$
cd !$
echo '
[remote "origin"]
	url = git@gitlab.com:franckf/quick_scripts.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master' >> .git/config
git push
npm install
npm install nodemon standard
npm install pm2 -g
cp .gitignore .
cp .jsbeautifyrc .
cp bootstrap.min.css public/stylesheets/
cp bootstrap.min.js public/javascripts/
cp jquery-3.4.1.min.js public/javascripts/
cp error.ejs /views/
cp index.ejs /views/
cp footer.ejs /views/
cp header.ejs /views/
```
## pm2

```bash
# To list all running applications:
pm2 list

# Managing apps is straightforward:
pm2 stop     <app_name|namespace|id|'all'|json_conf>
pm2 restart  <app_name|namespace|id|'all'|json_conf>
pm2 delete   <app_name|namespace|id|'all'|json_conf>

# To have more details on a specific application:
pm2 describe 0

# To monitor logs, custom metrics, application information:
pm2 monit

# To consult logs just type the command:
pm2 logs
pm2 logs APP-NAME       # Display APP-NAME logs 
pm2 logs --json         # JSON output 
pm2 logs --format       # Formated output 
pm2 flush               # Flush all logs 
pm2 reloadLogs          # Reload all logs 

# Generate Startup Script 
pm2 startup
```