# NotificationEngine front

An example of a front-end that uses the NotificationEngine

## Prerequisites

In order to be able to develop this app and/or to deploy it somewhere, you first have to install several components:

- NodeJS, the documentation on how to install it is [here](http://nodejs.org/)
- [Ruby](http://www.ruby-lang.org/en/downloads/)
- [Compass](http://compass-style.org/install/) (once Ruby is installed)
- [Git](http://git-scm.com/downloads)

Once NodeJS is installed, please execute the following line in a terminal:

- ```npm install -g grunt```
- ```npm install -g bower```

These commands install globally node modules that can be accessed anywhere in your system. On Unix machines, you might have to have admin rights to execute those lines.

## Working with the sources

Clone the repository on your file system and open a command line interface in the generated folder.

Execute the following commands:

- ```npm install```
- ```bower install```

The file named ```app/config.json``` is the configuration file to set the URL of the NotificationEngine. You might have to change it.

If you want to develop something new or change some things in this project, you may run ```grunt server``` to see the project working.
This command starts a small web server that refreshes the page each time a change is made in the source code under ```app``` folder.
The server has to be running too in order to see some data in the admin console.

If you want to build files, which means concataining, minifying and uglifying sources, run ```grunt build``` or simply ```grunt```.
The sources generated are under ```dist``` folder.

On the NotificationEngine, we added the ability to add the admin console sources in order to be able to run the project without have to create an other server instance.
What you have to do is to copy the ```dist``` content in the folder ```console-admin``` in ```src/main/webapp/WEB-INF``` of the NotificationEngine project.
Then you just have to configure correctly the NotificationEngine's URL, to package the war and to deploy it on the Glassfish server.