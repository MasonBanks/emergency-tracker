# Safe + Sound

 *Safe + Sound* is a app for mobile devices that allows fire marshalls to monitor the safety of personnel in an emergency evacuation scenario.

 *Safe + Sound* is built with React-Native in the Expo XDE, and is served by Firebase Realtime Database.

### Demo
 
 You can view a demo video of the *Safe + Sound* app in action [here](www.YOUTUBELINK.com)

 <a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" 
alt="Safe + Sound demo" width="240" height="180" border="10" /></a>

The iOS version is deployed as an Expo publication [here](https://exp.host/@novik71/teamsafeandsound). You can run the app on any iPhone with the Expo app installed.

 Use the following login details to test app functionality by account type:

| Account type | Email | Password |
|--------------|-------|----------|
| Admin  | guest@admin.com | password |
| User   | guest@user.com  | password |


---

## Up and Running

Follow these instructions to get the project development environment up and running on your local machine.

## Prerequisites

You will need to have the latest version of Node installed.

Node installation instructions for Mac can be found [here](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew).

Instructions for Ubuntu can be found [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04).

It is recommended to also install the latest version of [VS Code](https://code.visualstudio.com).

You will also need to install Expo's local development tool Expo CLI. Follow the instructions [here](https://docs.expo.io/versions/latest/introduction/installation) to install and set up.

## Firebase Setup

You'll need to set up a new Firebase Realtime Database [here](https://console.firebase.google.com) - it's quick to get started if you have a Google account, just follow these steps:

1. Click `Add project`
2. Choose a name (any will do) and leave all other settings default. Click "Create"
3. Click on the `Develop` button on the left-hand sidebar, and `Database` on the drop-down
4. Scroll down and in the *Realtime Database* section, click `Create database`
5. Select `Start in Test Mode` and click `Enable`
6. You must add a child node to the database (an empty database will just self-delete): 
   - Hover over where it says "null" next to your database name, and click the '+' that appears.
   * Type `default` into both the 'Name' and the 'Value' boxes and click `Add`.
7. Finally, click on the `Authentication` button on the left-hand sidebar of the console and then:
   * Click `Set up sign-in method`
   * Click `Email/Password` then click onle the top switch labeled `Enable`
   * Click `Save`

That's the database set up. Now click on the cog symbol next to `Project Overview` at the top-left of the console and click `Project Settings` in the drop-down to get to the database information you will need later, to set up the firebase-config file.


## Installation and Setup

1. Create a copy of the repository on your local machine:

```http
$ git clone https://github.com/MasonBanks/emergency-tracker.git
```
or if you have an SSH key set up for github:

```http
$ git clone git@github.com:MasonBanks/emergency-tracker.git
```
The project directory is the *safe-and-sound* folder, located inside the repository root folder:
```
/safe-and-sound-project
```
Make sure you ```cd``` into it before you run any node scripts.

Then, to install all the required node modules in one go, go to the repo's root directory and run the following command in your terminal install them locally.

```http
$ npm install
```
$ npm install will download all the dependencies listed in package.json. Alternatively each module can be installed individually using the command:
```http
$ npm install <node_module> 
```

## Database config

To connect your Firebase database:

1. ```cd``` to the project root directory(*emergency-tracker*) and open the following file in your code editor: 
```
./safe-and-sound-project/config/firebase-config.example.js
```
2. Replace the example values in the ```config``` object with the project ID, URL, Storage bucket URL and API key of your Firebase Realtime Database.

3. Rename the file ```firebase-config.js```

Your app should now connect to your database.


## Database seeding

To seed the database with an example userbase, go to the project run the following in terminal:
```http
npm run seed:demo
```
This will create and authenticate a randomly-generated list of user accounts.


## Development Mode

Now you are ready to launch the app in development mode. In the project directory,  run:
```https
$ npm start
```

If you are working on a mac, this launches the app (in debugging mode) within the Expo client on an iOS simulator. You can scan the QR code generated to run the app on a physical iPhone.

If you are using Linux you can connect an Android phone in USB debugging mode to test.

The simulator will auto-reload if you make edits.<br>

 Use the following login details to test app functionality by account type:

| Account type | Email | Password |
|--------------|-------|----------|
| Admin  | guest@admin.com | password |
| User   | guest@user.com  | password |



### Deployment

If you wish to launch your own production demo of the app, you will need to create and log in to an Expo account, and then run

```https
$ expo publish
```
