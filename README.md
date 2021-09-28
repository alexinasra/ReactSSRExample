#React Graphql i18next server-side render hot module reload base project.
<br/>
Modify mongodb configuration file (/packages/config/mongodb.config.js, then run ```yarn install```.
<br/>
```
yarn install
yarn workspace @react-ssrex/ui build [--watch] #You can rebuild the ui components at any time. but first you have to build it.
yarn workspace @react-ssrex/server dev:start [--disable-auth] [--disable-user] [--disable-admin] [--disable-webapp] #start server in development mode

* main app (@react-ssrex/webapp) at: localhost:3030/
* authentication app (@react-ssrex/auth) at: localhost:3030/auth
* admin dashboard (@react-ssrex/adminconsole) at: localhost:3030/adminconsole
* main user settings (@react-ssrex/userconsole) at: localhost:3030/userconsole
