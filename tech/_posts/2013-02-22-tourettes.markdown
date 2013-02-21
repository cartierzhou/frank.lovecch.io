---
layout: post
main: false
status: wip
category: tech
back: tech.html
title: tourettes.
quote: A monetary evaluation of 2012.
---

<div class="snippet">
   <pre class="terminal">
#!/bin/bash
 
dir=`pwd`
script=$dir/give-tourettes.sh
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
 
chmod a+x $script
add_cronjob
   </pre>
</div>