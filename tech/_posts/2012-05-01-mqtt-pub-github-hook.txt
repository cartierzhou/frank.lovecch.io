---
layout: snippet
short: MqttPub Github Hook
title: MqttPub - A Github hook for mass application management by 2lemetry
quote: Fuck PSSH
---

Mass-management of AWS EC2 instances can get messy, especially when you're dealing with a variety of Git applications across multiple types of instances in different "environments", e.g. differentiating "production", "demo", and "sandbox". In practice, I was using PSSH along with a script to manually invoke application updates on instances every time I pushed to branch X (master/demo/sandbox) -- this became cumbersome, especially in development, as I was constantly terminating and spinning-up new instances.  

For Cassandra.io, 2lemetry's hosted Apache Cassandra offering, I developed an Instance API (built on the Play! Framework) to interact remotely/securely with Cassandra Nodes and push metrics to CloudWatch (almost exactly what Netflix was doing with Priam, but with less old-school Java techniques and more Play!-ish finesse). 

Since the majority of our platform is centered around pub-sub protocols on a device level (embedded), MQTT is a major player.  I already had an MQtt integration in the InstanceAPI for our logging engine, so it just made sense to create a Github hook which would publish a message when a commit was pushed to branch X on a topic of "github/<githubUsername>/<githubRepoName>".  The InstanceAPI subscribes on the topic I listed in the last sentence, and depending on the applications running on the instance, either executes a command to kill/start the app (based on an Ubuntu upstart job), or ignores the message entirely.  The InstanceAPI knows what applications are running on it based on the config options passed to it when the instance is launched with user-data (basically, a bash script that runs on launch).

The MqttPub Github hook uses the ruby-gem `mqtt`; it _currently_ supports only v3.0 of the MQtt specification, so there isn't any authentication (sigh).  Somebody please work your bits-and-bytes magic on this repo to get it working with v3.1 of the spec!  As for specifying options, you only really have to specify two parameters to get the plugin working if you're using standard MQtt settings (port 1883) -- `broker` and `topic`. 

Let's walk through a full-fledged example using the mqtt.io web client, m2m.io public broker, and the small version of the InstanceAPI I open-sourced on Github: