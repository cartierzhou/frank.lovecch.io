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