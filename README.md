# mmjuth
Playground for adding authentication to Node.js site

##OAuth
* OAuth is open authentication with tokens, sorta.
* We will be using Passport node.js package.

##App Setup
1. Install express-generator if you don't have it in global.
2. Generate Express app with express social.
3. Replace Jade with Ejs and. install ejs
4. Start app with DEBUG=social:* npm start

##Passport middleware
* Install it
* Install express-session
* Setup Passport in app.js
* Setup Google passport strategy passport-google-oauth

###Google Strategy
* Goto Google Developer Console at:
	* https://console.developers.google.com/
	* create client ID
	* setup redirect url (http://localhost:3000/auth/google/callback)
* setup Google API
	* Google+ API
	* Contacts API
	
###Auth Routs
* Create auth route
* Create views

###Bower
* Create .bowerrc file in root, with directory "public/lib"
* Install bootstrap and fontawesome with bower
	* bower install bootstrap fontawesome
	
##Refactor
* Move passport code from app.js into own module, and plug app into it
* Refactor Google Strategy
* Create user object

##Adding a new Startegy
* Install Strategy npm package passport-startegy_name
* Make a new xxx.startegy.js module in /config/strategies/, exporting it as a function
* Require xxx.startegy.js from passport.js (in /config)
* Add routes to auth.js in /routes
	* router.route('/startegy-name/callback')
	* router.route('/startegy-name')
* Add links to .ejs page


##Twitter
* Install passport-twitter
* Go to https://dev.twitter.com/
* Tools / Manage your apps
* Code Twitter strategy like Google

##Facebook
* Install passport-facebook
* Make facebook.strategy
* Add routes to auth.js
* Goto https://developers.facebook.com/
* Make new AppID on FB dev site
* Add domain (http://localhost:3000) to Valid OAuth redirect URIs, on FB dev site
* Insert FB app params into facebook.strategy.js file
* Call facebook.strategy.js from passport.js
* Add facebook li to index.ejs

##GitHub
* Install passport-github
* Goto https://github.com/settings/applications/new
* Do steps in "Adding a new Startegy"

##LinkedIn
* Install passport-linkedin
* Goto https://developer.linkedin.com/


	