---
layout: snippet
short: Apigee Doc Gen
title: Apigee Documentation Generator
quote: Because your code is __so__ self documenting
---

UPDATE:  I broke this because I was including css/js from another box that died (so was the Isidorey link) :)  Luckily, I have everything in S3 — I just need to take the time and put the demo back together, but at least the code is available.

Let’s talk APIGEE for a Colorado-second; it’s an awesome API tool I’ve come to love for numerous reasons — the most obvious being the ease-of-use it brings to deploying new features [and it seems like we do that quite a bit at Isidorey].  One of the things that seemed necessary, at least to cut down on the time I spent documenting [who am I kidding, I pushed as much of that off to the interns as I could :)], was being able to generate all of the API documentation from the XML [wadl] file that APIGEE uses. 

There are still some nuances to hash out, but I’ve updated the generator to use Twitter’s new Bootstrap template [see live demo below].  It’s written in Java and uses the Play Framework to render the ‘DOCUMENTATION’ call.  All of the code is on github!

{% gist 1236844 %}

How it works:

I use a custom XML file that has <description> tags for describing segment and header parameters, and I generate the webpage using the custom file while also generating an APIGEE-supported file by SED-removing the tags into another XML file.  While it looks like APIGEE supports a <doc> tag for header parameter descriptions, I currently see no way to document URL, or segment based parameters, and lots of new frameworks (Codeigniter, Play, etc) are all about this!

Since the Isidorey API is really a grouping of APIs, and APIGEE does not support tags for grouping them, I’ve added in some optional code to make separate drop-down menus out of each one.  Bootstrap still has some CSS issues and does not wrap the menus, so this is probably not a good solution for larger APIs with many calls (I think I can hack it to scroll, though).  

The live demo:

http://ec2-67-202-48-67.compute-1.amazonaws.com:9000/DOCUMENTATION

The Isidorey demo, which pulls the XML file from S3! (you must allow the deps from non-SSL box):

https://api.isidorey.net/v0.9/DOCUMENTATION

The future:

While I’d like to see these features built-in to APIGEE, I’m going to add tabs for responses using the custom tags, e.g. failure and success examples.

The code:  …has disappeared.  