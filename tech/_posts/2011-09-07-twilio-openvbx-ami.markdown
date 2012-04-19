---
layout: snippet
short: OpenVBX AMI
title: Building a Twilio OpenVBX AMI
quote: EC2 for you
---

A while back, I built an OpenVBX AMI for Isidorey: http://blog.isidorey.com/2011/06/twilio-openvbx-ami-update.html.  I’m just now getting to posting the script that sets up up OpenVBX and its dependencies.  I’d also like to add in some options to install plugins off-the-bat, as well as a Redis backend instead of MySQL :)  

I’m assuming a fresh installation here, and that further down the road you will have content in your /var/www directory with an .htaccess file of your choosing.  I place OpenVBX at /calls because that is the simplest form of integration I could think of (clients don’t care what they’re using, as long as it works!)

{% gist 1215637 %}

There’s really not much to it — this would be run as a user data file on init of an EC2 instance; I forgot how to install Pear silently (somewhere along the way the script changed…sigh).  I’ll dig into that when I have time!