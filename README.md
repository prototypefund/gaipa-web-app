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
The client can be used on http://app.gaipa.org

Structure
---------

In the app folder, you can find the follwing containers:

- /cards - Navigation Assistant Cards, a nested card structure
- /solution - a flat list of Solution Articles
- /service - a flat list of services
- /provider - a flat list of Solution Providers

### Cards

Card are used to guide the user to Solution Articles. They can be nested into each other. When a card is specific enought, that we can point to a solution acticle, we can choose one from the Solutions list. It will be listet below the Card content.

### Solution Articles

Th Solution Article represent the solution, which can be text and images or embedded videos. every Solution Article should be assigned to a Solution Category. This Solution Category will b eused to list related services below.

### Solution Services

A Solution Service is assigned to a Solution Category and can be listed under different Solution Articles. A service can contain infos to a external service, like an URL and pictures.

### Solution Provider

A Solution Provider can contain infos of a company/organization and can reference to multible Solution Services they provide.