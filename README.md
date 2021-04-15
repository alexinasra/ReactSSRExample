#React Graphql i18next server-side render hot module reload base project.
<br/>
Modify mongodb configuration file (/packages/config/mongodb.config.js, then run ```yarn install```.
<br/>
```
yarn install
yarn workspace @react-ssrex/ui run  build #You can rebuild the ui components at any time. but first you have to build it.
yarn workspace @react-ssrex/server dev:start #run entire app
yarn workspace @react-ssrex/auth dev:start #run only auth app
yarn workspace @react-ssrex/webapp dev:start #run only webapp app
yarn workspace @react-ssrex/adminconsole dev:start #run only adminconsole app
yarn workspace @react-ssrex/userconsole dev:start #run only userconsole app
```

* main app (@react-ssrex/webapp) at: localhost:3030/
* authentication app (@react-ssrex/auth) at: localhost:3030/auth
* admin dashboard (@react-ssrex/adminconsole) at: localhost:3030/adminconsole
* main user settings (@react-ssrex/userconsole) at: localhost:3030/userconsole
