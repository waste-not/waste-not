# waste-not

Waste Not aims to bridge the gap between consumer waste and hunger; changing the way surplus is handled and making sure that it gets into the hands of people who actually need it.

Waste Not is a new technology platform that makes it simple for retail outlets to inventory items that they plan on throwing out and enables social and community organizations to claim these items for redistribution.

_Winner of [AngelHack Seattle 2016](http://angelhack.com/)_

![Landing Page](http://s31.postimg.org/3lhdpdbkr/Screen_Shot_2016_04_19_at_4_29_24_PM.png)

### Getting Started
- Ensure you have [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.org/) installed
- Clone this repo
```
cd waste-not
mkdir db
npm install
gulp
mongod --dbpath=./db --smallfiles
node server.js
```
Now the app should be running on ```localhost:3000```

### Issues? Suggestions? Comments?
Submit an issue on [GitHub](https://github.com/waste-not/waste-not/issues).
