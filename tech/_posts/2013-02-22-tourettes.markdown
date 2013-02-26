---
layout: post
main: false
status: completed
category: tech
back: tech.html
title: tourettes.
quote: Ear muffs.
---

There is something so deliriously enticing about using the command `say` for devious purposes outside of its developed intentions **\[aiding the visually impaired?\]**. When I first discovered my darling Mac's capability, I believe I input `wanker` immediately; after all, what is more humourous than a bot spouting swares? I'll tell you what: a bot _uncontrollably_ spewing profanity in _ten_ minute intervals ...on a less apt technologist's Mac - say my former roommate's.

<div class="snippet">
   <pre class="terminal">
<div class="terminal-header">tourettes.sh</div>
#!/bin/bash
 
dir=`pwd`
script=$dir/tourettes.sh
echo "Adding script to: $script"
 
# Cron declaration -- */10 * * * * -- every 10
add_cronjob() {
  crontab -l | (cat; echo "*/10 * * * * $script") | crontab
}
 
# Create file - ugly, but Bash is hating on me
echo 'swear() {' >> $script
echo 'array=("shit", "fuck", "ass", "assbag", "asshole", "penis")' >> $script
echo 'exec say ${array[$((RANDOM %= $((${#array[@]}))))]}' >> $script
echo '}' >> $script
echo 'swear' >> $script

chmod a+x tourettes.sh
add_cronjob
    </pre>
</div>

The [little diddy](http://en.wikipedia.org/wiki/Diddy_Kong) is was meant to be installed via the `wget` command, hence the _odd_ scripting at the end. [Download](/scripts/tourettes.sh). Run it. Enjoy it.

<div class="snippet">
   <pre class="terminal">
<div class="terminal-header"><i>terminal</i></div>
wget http://frank.lovecch.io/scripts/tourettes.sh -O - | sh
   </pre>
</div>