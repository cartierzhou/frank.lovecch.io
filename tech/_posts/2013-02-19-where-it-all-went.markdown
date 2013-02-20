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

I grew up in a middle-class family with _two_ working parents. I went to work at _fifteen_, taking only a paid year off **\[glorious unemployment\]**. Technically, I have been part of the workforce now for _12_ years. and `I have lived paycheck to paycheck` for nearly all of them. What I mean by this is that my ambitions and interests are costly - I'm fully aware they will never be completed. I'm a tinkerer with extravagant projects and a _finite_ supply of money. I dislike borders - especially monetary ones, and will frequently spend the money failing to accomplish a project than pay a bill on time. _I have the worst credit score in history_, but this is mostly because of my refusal to pay parking tickets.

I don't think it irresponsible - some parts of the system work, some I work around. 

<h2>[questions to my answers]</h2>

- How much money did I spend on... the [Walden Ranch](/projects.html)?
- How much money did I spend on... the Jeep?
- How much money did I spend on... gas? monthly, weekly
- How much money did I spend on... food? monthly, weekly
- How much money did I spend on... dining out? monthly, weekly
- How much money did I spend on... alcohol? monthly, weekly
- How much money did I spend on... travel? 
- How much money did I spend on... cell phone services?
- How much money did I spend on... overdraft fees?
- How much money did I withdraw from ATMs? 
- How many deposits from checks?
- How many other deposits?
- Do I remember what I spent the cash on?
- Was there a location pattern to where I pulled cash from?
- What did I purchase that could be expensed?
- What shows up as a PayPal transactions, and what were they?
- What was my average weekly spending?
- How much did I spend at local businesses compared with online realtors?
- How much did I spend on take-out? **\[I don't eat fast food\]**

<h2>[culling]</h2>

After looking at the questions, I turned to `BASH` for simple analysis. I realize it would have been easy to do summations on columns with Excel / Google Spreadsheets, but Frankly **\[see what I did, there?\]** it would not have been as much fun.

<div class="snippet">
   <pre class="terminal">
#!/bin/bash

# Search through .csv file for values.
cherry_pick() {
  
  val=$2
  pos=$1

  grep ${val} moneyz.csv | cut -d, -f${pos}

}

# Count all items in array.
count() {
  
  let num=0
  
  for item in $1; do
    let num=num+1
  done

  local num=$num
  echo "$num"

}

# Sum all dollar items in array.
sum() {

  let total=0
  
  for item in $1; do
    #change=`sed -e 's/.*START//' -e 's/END.*//'`
    rounded=`echo $item | cut -f1 -d"."`
    let total=total+$rounded
  done

  local total=$total
  echo "$total"

}
 </pre>
</div>

After removing `six` lines of white space **\[four from the top, and two from the bottom\]**, `three` lines for headers, my only checking account had a total of `1149` transactions to and from it. This _includes_ [PayPal](http://paypal.com), as I rarely have money in there, and most of the time it deducts from this checking account.

<div class="snippet">
   <pre class="terminal">
cat moneyz.csv | wc -l
1149
  </pre>
</div>

<h2>[deposits]</h2>

<div class="snippet">
   <pre class="terminal">
check_deposits() {

  VALUE="ACH Deposit"

  amount=`cherry_pick "11" $VALUE`

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

other_deposits() {

  VALUE="Other Deposit"

  amount=`cherry_pick "11" $VALUE`

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

cash_deposits() {

  VALUE="Deposit"

  amount=`cherry_pick "11" $VALUE`

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

check_deposits
other_deposits
cash_deposits
 </pre>
</div>

<h2>[atms]</h2>

Lately, I have been withdrawing money from ATMs to limit [miscellaneous](http://todo.com) expenditures. This has helped me keep track of my actual expenditures, as transactions nearly always show up many days later from smaller businesses, and I used to think I had all this money.

<div class="snippet">
   <pre class="terminal">
atm_withdrawals() {

  VALUE="ATM Withdrawal"

  where=`cherry_pick "3" $VALUE`
  when=`cherry_pick "2" $VALUE`
  amount=`cherry_pick "4" $VALUE`

  # Remove spaces in quote for proper iteration.
  where=${where// /_}
  when=${when// /_}

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

atm_withdrawals
 </pre>
</div>

The totals are in. I took out quite a bit of cash from ATMS...where?

<div class="snippet">
   <pre class="terminal">
./where_it_went.sh 
Total ATM Withdrawal transactions: 66
Total ATM Withdrawals: $ 9639
 </pre>
</div>


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