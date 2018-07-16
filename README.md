gaipa web-app
=============

gaipa-client
------------

### Install

Change into the folder gaipa-client and run:

``
npm install
``

### Start gaipa client

In the gaipa-client folder run:

``
au run --watch
``

open the browser on http://localhost:4300/

### Build Deployment Package

see Readme in dist folder

Structure of the Client and the content in the Backend-API
==========================================================

The content is managed on https://gaipa.org/app
The client can be used on http://app.gaipa.org, it will show all published app content from the backend.

Structure
---------

In the app folder, you can find the following containers:

- /card - Navigation Assistant Cards, a nested card structure
- /solution - a flat list of Solution Articles
- /service - a flat list of services  (!! deprecated, create services inside of Solution provider objects !!)
- /provider - a flat list of Solution Providers (provider object contain service and solution article container)


### Cards

Card are used to guide the user to Solution Articles. They can be nested into each other. When a card is specific enought, that we can point to a solution acticle, we can choose one or more from the Solutions list. They will be listet below the Card content.

### Solution Articles

The Solution Article represent the solution, which can be text and images or embedded videos. Every Solution Article should be assigned to a Solution Category. This Solution Category will be used to list related services below. We will also have Solution Articles provided by Solution Provider. They will be marked as such and will be listed under specific cards as an alternative to our own managed Solution Articles. By now our own Solution Articles are refenreced by explicite relations. The Solution Provider Articles are on the other hand will be collected by a maching category, like the Services are already. This still has to be defined and implemented.

### Solution Services

A Solution Service is assigned to a Solution Category and can be listed under different Solution Articles. A service can contain infos to a external service, like an URL and pictures. Services are living inside a service caontainer Soltution Provider objects. This way Solution Provider can add and manage there Services by them self, after we finshed the registration and user management.

### Solution Provider

A Solution Provider can contain infos of a company/organization and can add multible Services to there service container and also add there own Solution Articles inside there solution container.