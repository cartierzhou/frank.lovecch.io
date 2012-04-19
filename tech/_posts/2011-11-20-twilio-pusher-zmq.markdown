---
layout: snippet
short: Twilio Pusher
title: Twiliop Pusher w/ Websockets and 0MQ
quote: You push it real good-like
---

Recently, while building out a web application for RingDNA, we ran into a couple issues regarding websockets:

1) Amazon EC2 load-balancers do not support websocket scaling (yet).  I knew this, but had never implemented a solution.

2) Twilio applications point to webservice URLs, so developing locally can be tedious if you are building UI from call parameters that get pushed via websockets (and don’t want to fake data, interaction, or tunnel).

Both of these problems were solved via ØMQ, though the former won’t be elaborated on in this post.  Since I already had a basic Play! Framework/Twilio/websocket project for development purposes — twilio-push-play (clever, I know…’twas better than “play-with-twilio”) — it made sense to just build on it.  The application makes outbound calls via the Twilio Client and pushes call parameters to browser/socket; simply enter in the your credentials + phone numbers and you’re placing browser calls!  The application knows the difference between a local environment and a cloud “production” environment, and configures ØMQ connection accordingly (cloud app is publisher, local app is subscriber). There is a script for setting up the EC2 application, and for the local instance you just need to specify the EC2 application url (no http://) in the application.conf file.  The local environment is entirely independent of its production counterpart — we want to be able to use local logic with live data!

While the docs are minimal (I have real work to do, ya know?), setting up ØMQ can be kind of painful regarding classpaths; if you run into an issue with the lib included in the repository, you may have to copy the jzmq dependency you built on each machine into twilio-push-play (or better yet, mavenize it).  The EC2 script I talked about earlier and is based on the EBS Elestic Ubuntu AMI ami-a562a9cc:

{% gist 1499805 %}

If you’re using a Mac, you can follow these instructions to setup ØMQ locally.  I had to build jzmq and copy the jar into my twilio-push-play/libs directory after everything was said and done.

{% gist 1480434 %}

Let’s see how I integrated ØMQ!  Since Play! allows for asynchronous threads to be run on application start; this is where we figure out if the app is running on EC2 or not, and either start the ØMQ subscriber or publisher:

{% gist 1480434 %}


If we’re on EC2, we create a publisher.  I kept state the same way I did for websocket connections:

{% gist 1480433 %}

{% gist 1480446 %}

Because the subscriber is blocking, it needs its own thread:

{% gist 1480447 %}

If we’re not on an EC2 box, we subscribe to the publisher at the endpoint we specified earlier:

{% gist 1480450 %}


When the call parameters get pushed to the subscriber, it executes the same model the webservice URL Twilio does!  