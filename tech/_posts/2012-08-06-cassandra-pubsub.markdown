---
layout: tech_post
main: false
status: in-progress
category: tech
back: tech.html
title: c* pubsub.
quote: Cassandra as a realtime application.
source: cassandra-pubsub
when: 6 August 2012
---

Let's not going to talk about <a href="">Cassandra</a> as just a datastore, because it does that part increasingly well on large scale. Instead, we're going to talk about Cassandra as an integral part of a realtime, modern application framework.

<h2>Background</h2>
The first iteration of the project really came from developing <a href="">cassandra.io</a>. For those of you unfamiliar with that, visiting the website probably won't do you any good :) Essentially, it's an AWS-hosted Apache Cassandra solution that blossomed from our core <a href="">machine-to-machine business</a>. The idea then was to use an <a href="">MQTT</a> client alongside an <i>Instance API</i> on each Cassandra node; its purpose was to update <a href="">Hector</a> configuration changes and allow it to go back/forth between rings, possibly even double-writing in certain instances. I think that's still a really good use case for the `control` portion of Cassandra PubSub, but I stopped developing this in light of a <a href="">eureka</a> moment.
	
<h2>Inspiration</h2>
I have implemented <a href="">Redis</a> for some <a href="">small</a> projects, and also done <a href="">quite</a> a <a href="">bit</a> of experimenting with its <a href="">PubSub</a> feature. Using their CLI implementation, or even just a standard client, you can subscribe on inserts - this is useful when used with the latter, as application logic can be built on top of specific data. Publish allows you to send messages without storing <b>TODO does it?</b>. 

<h2>Distributed PubSub</h2>
I understood why a <i>PubSub</i> interface didn't exist for Cassandra; a ring can have <i>n</i> nodes, so being able to pub a message or sub on some data would require middleware implemented on top of Thrift <b>TODO would it?</b> in order to see all data being written from <i>n</i> clients. My thought process shifted to <i>just</i> standing up an MQTT client alongside Hector, but then middleware would <i>definitely</i> be required (and all clients in all languages would have to be modified/supported). Which brought me back to the source. 

<h2>PubSub Tech</h2>
I didn't implement a <a href="">Websocket</a> server on each Cassandra node for a reason; my experience with mobile-based Websockets has shown that the <a href="">libraries</a> aren't quite there for non-browser based sessions. I also thought about an endpoint-to-endpoint solution using something like <a href="">ZeroMQ</a>, but managing the publishers/subscribers on the nodes and in the applications seemed overly complicated. For the proof-of-concept, I ended up implementing an MQTT client alongside the Thrift Server. Without configuration, the node connects over port 1883 to a public MQTT server, or <i>broker</i>, <a href="">q.m2m.io</a>. With a valid configured username/password specified in the config file `cassandra.yaml`, the connection becomes secure.

<h2>MQTT</h2>
The decison to use MQTT turned out to be a good one; it handles connection-losses automatically, and there are <a href="">tons</a> of libraries available. I've used it in a <a href="">variety</a> of projects in the past, and even <a href="">Facebook</a> got on the bandwagon for it's <a href="">Messenger</a> application. Since I wanted web and mobile applications to be in-sync with each other, it just made sense. 

<h2>Realtime Applications</h2>
When I saw <a href="">meteor.js</a>, I was impressed with the distributed front-end and syncing of data in realtime...without heavy use on APIs and polling. The only real problem was Mongo and it's ability to scale. The application allows 

<h2>Embedded</h2>
Since the application

<h2>Web</h2>
text

<h2>Mobile</h2>

<h2>ANTLR</h2>
Not knowing anything about this language-processing library...TODO

<h2>Testing</h2>
For testing locally, I've been running a Node.js Broker locally. <b>TODO Java broker locally?</b>