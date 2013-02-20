---
layout: post
main: false
status: wip
category: tech
back: tech.html
title: where it all went.
quote: A monetary evaluation of 2012.
---

Last year, I made a good deal of money; `my bank account did not seem to notice`. While preparing to fill out my taxes **\[read - aggregating write-offs\]**, I was curious to see how I managed to spend it all, in order that I may [Do Better](/thoughts/2012-12-25-do-better). Using the nifty little export feature [TCF Bank](http://tcfexpress.com) provides, I was able to download a `.csv` record of all my transactions from `01/01/2012` to `12/31/2012`.

<h2>[history]</h2>

I grew up in a middle-class family with _two_ working parents. I went to work at _fifteen_, taking only a paid year off **\[glorious unemployment\]**. Technically, I have been part of the workforce now for _12_ years, and all of which `I lived paycheck to paycheck`. Well, mostly. What I mean by this is that my ambitions 

My parents, with their Chicago ..., called it being `Nigger Rich`. 

<h2>[questions to my answers]</h2>

I do not have _normal_ aspirations; I'm a tinkerer with extravagant projects and a finite supply of money. I dislike borders - especially monetary ones. _I have the worst credit score in history_. 

- How much money did I withdraw from ATMs? **\[do I remember what I spent it on?\]**
- How much money did I spend on the cabin?
- How much money did I spend on the Jeep?
- How much money did I spend on gas? 
- How much money did I spend on food?
- What did I purchase that could be expensed?
- What shows up as a PayPal transaction, and what were they?
- How many overdrafts were there?
- How much did I spend on cell phone services?
- What was my average weekly spending?
- How much did I spend on dining?
- How much did I spend on booze?
- How much did I spend on travel?
- How much did I spend at local businesses compared with online realtors?
- How much did I spend on take-out? **\[I don't eat fast food\]**

<h2>[culling]</h2>

<div class="snippet">
   <pre>
#!/bin/bash

# ,Posted Date,Description,Amount,Currency,Transaction Reference Number,FI Transaction Reference,Payee,Transaction Code,Server ID,Sic Code,Type,Credit/Debit,Origination Date,Available Date,Original Amount,Original Currency,

# helpers

count() {
  
  let num=0
  
  for item in $1; do
    let num=num+1
  done

  local num=$num
  echo "$num"

}

sum() {

  let total=0
  
  for item in $1; do
    #change=`sed -e 's/.*START//' -e 's/END.*//'`
    rounded=`echo $item | cut -f1 -d"."`
    let total=total+$rounded
  done

  #echo $total
  
  local total=$total
  echo "$total"

}

# atm withdrawals where,when,amount

VALUE="ATM Withdrawal"

atm_withdrawal() {
  
  val=$2
  pos=$1

  grep ${val} moneyz.csv | cut -d, -f${pos}

}

where=`atm_withdrawal "3" $VALUE`
when=`atm_withdrawal "2" $VALUE`
amount=`atm_withdrawal "4" $VALUE`

where=${where// /_}
when=${when// /_}

# transaction total
transactions=$(count "$amount")
echo "Total ATM Withdrawal transactions: $transactions"

# how much went
total=$(sum "$amount")
echo "Total ATM Withdrawals: $ $total"
 </pre>
</div>

After removing `six` lines of white space **\[four from the top, and two from the bottom\]**, `three` lines for headers, my only checking account had a total of `1149` transactions to and from it. This _includes_ [PayPal](http://paypal.com), as I rarely have money in there, and most of the time it deducts from this checking account.

<div class="snippet">
   <pre>
cat moneyz.csv | wc -l
1149
  </pre>
</div>

<h2>[atms]</h2>

Lately, I have been withdrawing money from ATMs to limit [miscellaneous](http://todo.com) expenditures. This has helped me keep track of my actual expenditures, as transactions nearly always show up many days later from smaller businesses, and I used to think I had all this money.

1. Download webkit2png

I was conversing with a female about [Pinterest](http://pinterest.com) and how/why she uses it, being that I didn't. Her answer was astoundingly simple: `It's easy to visualize and manage everything I'm interested in and want to remember; books, films, fashion, travel, etc.`. While the [demographic data](http://www.searchenginejournal.com/pinterestingly-enough-interesting-pinterest-stats/45328/) on _Pinterest_ is noticeably female, I think they're onto something - I haven't really visualized my bookmarks since I started storing them in the cloud on the [xmarks](http:)

<h2>[how to]</h2>
I didn't find any [Google Chrome](http://google.com/chrome) applications that existed for analyzing bookmarks, so I did it the old fashioned way: [Bash](http://bash.org). Luckily, the browser had some built-in exporting functions for bookmarks:

<img class="inline" src="http://franklovecchio.s3.amazonaws.com/images/frank.lovecch.io/tech/bookmarks-01.png"/>
<p class="img-caption"></p>

Upon viewing the file, I noticed a tag I hadn't seen before at the very beginning of the document - `<!DOCTYPE NETSCAPE-Bookmark-file-1>` - so I did a little digging. The [Netscape Bookmark File Format](http://www.netstrider.com/tutorials/netscape/1.2/bookmarks/) from _nineteen ninety-six_; wow. 

<div class="snippet">
   <pre>
cat bookmarks_9_25_12.html | grep DT | wc -l
  </pre>
</div>

<div class="snippet">
   <pre>
#!/bin/bash

for line in $(cat mylinks); do
  echo "===== $line ====";  
  resp=`curl "$line" -o /dev/null -sL -w "%{http_code}"`
  echo "RESP: $resp"
  if [ "$resp" == "200" ]; then
    echo "$resp $line" >> good_links
  else
    echo "$resp $line" >> bad_links
  fi
  sleep 5
done;
  </pre>
</div>

The `-o` option sends HTML output to a bitter, cold place and will never see the dark of terminal day again. Via '-w' We format the output of the response in such a way that only the [HTTP Response Code](http://www.x.com) is returned, appending that to either a `good` or `bad` file.

<div class="snippet">
   <pre>
cat bad_links | wc -l
  </pre>
</div>

_One-hundred seventy-eight_ **\[178\]** bad links in total.

<div class="snippet">
   <pre>
cat good_links | wc -l
  </pre>
</div>

_One-thousand seventy-eight_ good **\[1078\]** links in total.

<div class="snippet">
   <pre>
cat bad_links | grep 000 | wc -l 34
cat bad_links | grep 301 | wc -l 2
cat bad_links | grep 400 | wc -l 1
cat bad_links | grep 403 | wc -l 14
cat bad_links | grep 404 | wc -l 117
cat bad_links | grep 406 | wc -l 9
cat bad_links | grep 410 | wc -l 3
cat bad_links | grep 500 | wc -l 3
  </pre>
</div>

paparazzi? 
sed "s/200 //g" good_links > just_good_links

<h2>[flat stats]</h2>
amount?
oldest?
categories?
bookmarks per year?