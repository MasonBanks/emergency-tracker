# Safe + Sound

 *Safe + Sound* is a app for mobile devices that allows fire marshalls to monitor the safety of personnel in an emergency evacuation scenario.

 *Safe + Sound* is built with React-Native in the Expo XDE, and the 

### Demo
 
 You can view a demo video of the *Safe + Sound* app in action [here](www.youtube.com).

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


## Installation and Setup

To create a copy of the repository on your local machine, run the following command:

```http
$ git clone https://github.com/MasonBanks/emergency-tracker.git
```
or if you have an SSH key set up for github:

```http
$ git clone git@github.com:MasonBanks/emergency-tracker.git
```

Then, to install all the required node modules in one go, go to the repo's root directory and run the following command in your terminal install them locally.

```http
$ npm install
```
$ npm install will download all the dependencies listed in package.json. Alternatively each module can be installed individually using the command:
```http
$ npm install <node_module> 
```


## Development Mode

In the project directory, you can run:
```https
$ npm start
```

If you are working on a mac, this launches the app (in debugging mode) within the Expo client on an iOS simulator. You can scan the QR code generated to run the app on a physical iPhone.

If you are using Linux you can connect an Android phone in USB debugging mode to test.

The simulator will auto-reload if you make edits.<br>

### Testing

To run the Jest test suite, use the following command:

```https
$ npm test
```

### Deployment

If you wish to launch your own production demo of the app, you will need to create and log in to an Expo account, and then run

```https
$ expo publish
```
