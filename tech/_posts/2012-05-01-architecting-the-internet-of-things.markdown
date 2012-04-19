---
layout: snippet
short: Cloud Architecture
title: Architecting the Internet Of Things - The 2lemetry + CassandraIO Architecture
quote: Bleeding-edge requires superglue, not bandaids
---

Over the past couple years as a developer for the cloud, I've read many great posts from Netflix, Instagram, etc, on "startup" architecture -- typically, these insights spur great ideas, so I thought it was about time a small startup shared how we architected the only cloud-hosted Apache Cassandra platform, and built our core big-data platform on top-of, and in coordiance with, the same principals. While the cloud and our startup culture do have some drawbacks (I mean, a new framework every day!?), we built the 2lemetry and CassandraIO platform on AWS to handle continuous evolvement; in the same way you can "fork" a repository, our environments are "forkeable" by using versioned Gists as EC2 user-data scripts, S3 for backups, and keeping our production frameworks to only a handful of products and languages.


Nodejs + CoffeeScript. node-monitor (AWS CLoudWATch and SimpleDB).  Interface for InstnaceAPI.

Play 1.2.4 for Instance APIs, Play 2.0 for highly-available, AKKA frameworks - 2lemetry + CassandraIO APIs
  MQtt for realtime updates of Github master branches (was induced manually, plugin is in my repo).

Datastax Enterprise (Cassandra) for big-data APIs. Ability to fork and do custom actions using 

IAM management for rolling credentials.
SimpleDB for environment constants. InstanceAPIs have access.

OpsCenter 2.0 for multiple ring management (mostly visual).

Github Gists for user-data.
  -- elaborate.
