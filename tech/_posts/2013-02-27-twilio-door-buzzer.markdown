---
layout: post
main: false
status: completed
category: tech
back: tech.html
title: twilio door buzzer.
quote: Buzz - your girlfriend - woof.
---

I moved into an apartent building which requires two separate keys to enter the confines of my humble studio. I _wanted_ to make my girlfriend copies **\[so I didn't have to walk downstairs to open the door for her\]**, but _unfortunately_ the outermost lock required special blanks which [Home Depot](http://homedepot.com) failed to reproduce. 

Expectedly, there is a buzzer system installed at the main entrance. A guest looks up the tenant, the system dials their phone number, and if the tenant wants to let the guest in, all they have to do is press _nine_ and hangup! Because I already get enough automated phone calls to the celly, I knew [Twilio](http://twilio.com) was the right fit.

<h2>[nothing is easy]</h2>
Originally, I used _this_ site to host the XML file Twilio makes an HTTP `GET` request for directions when the call comes in, but I ran into an [unexpected issue](http://stackoverflow.com/questions/15125373/herokus-jekyll-1033-url-character-limit) **\[this is a static, Heroku-hosted site, so I can't account for POST easily\]**. I turned to [twimlbin](http://twimlbin.com) for the XML hosting, and if it weren't for missing documentation stating the HTTP request had to be a `POST` instead of a `GET`, the process would have been seamless.

For generating the DTMF tone of _nine_ I send back to system, I used [dialabc](http://www.dialabc.com). Ok, that was easy.

It took _three_ lines to open the door without a key. Don't tell my neighbors. [Boom, headshot](http://knowyourmeme.com/memes/boom-headshot).

<div class="snippet">
   <pre class="prettyprint linenums languague-xml">
&lt;Response&gt;
   &lt;Play&gt;http://www.dialabc.com/i/cache/dtmfgen/wavpcm8.300/9.wav&lt;/Play&gt;
&lt;/Response&gt;
   </pre>
</div>