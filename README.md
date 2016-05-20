# waste-not
[![Stories in Ready](https://badge.waffle.io/waste-not/waste-not.svg?label=ready&title=Ready)](http://waffle.io/waste-not/waste-not)

Waste Not is a new technology platform that makes it simple for retail outlets to inventory items that they plan on throwing out and enables social and community organizations to claim these items for redistribution.

Through this platform, Waste Not aims to bridge the gap between consumer waste and hunger, changing the way surpluses are handled, while making sure that it gets into the hands of people who actually need it.

_Waste Not is the winner of [AngelHack Seattle 2016](http://angelhack.com/)_

![Landing Page](https://i.imgsafe.org/66616d7.png "Waste Not")

### Getting Started
- Ensure you have [Node](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.org/) installed
- Clone this repo
  ```
  $ git clone https://github.com/waste-not/waste-not.git
  $ cd waste-not
  ```

- Install dependencies and create dev build
  ```
  $ npm install
  $ gulp build
  ```

- Run local server and database
  ```
  $ mkdir db
  $ mongod --dbpath=./db --smallfiles
  $ node server.js
  ```

### Issues? Suggestions? Comments?
Submit an issue on [GitHub](https://github.com/waste-not/waste-not/issues).
