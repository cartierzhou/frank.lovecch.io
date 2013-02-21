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
- How much money did I spend on... coffee?
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
Text here.

<div class="snippet">
   <pre class="terminal">
check_deposits() {

  VALUE="ACH Deposit"

  amount=`cherry_pick "11" $VALUE`
  amount=${amount// /_}

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

other_deposits() {

  VALUE="Other Deposit"

  amount=`cherry_pick "11" $VALUE`
  amount=${amount// /_}

  # Metrics.

  transactions=$(count "$amount")
  echo "Total $VALUE transactions: $transactions"

  total=$(sum "$amount")
  echo "Total $VALUEs: $ $total"

}

cash_deposits() {

  VALUE="Deposit"

  amount=`cherry_pick "11" $VALUE`
  amount=${amount// /_}

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

<h2>[jeep]</h2>
My dearest automobile has been around the block once or twice.

GO CHRYSLER JEEP S
QUADRATEC ESSENTIA
NAPA STORE 3600006
AUTOZONE #879

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

<h2>[budgeting]</h2>
It took me _twenty-seven_ years, but I am finally making it a habit to budget logically. Before my analysis, I tried a tool called [BudgetSimple](http://budgetsimple.com) to build a chart, realized they were using [Highcharts](http://highcharts.com) in the background, then created my own visual.

<div class="snippet" id="budget-before" style="height: 500px;">
</div>

<script>
$(function () {
  var chart;
  $(document).ready(function () {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'budget-before',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Budget (before)'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        percentageDecimals: 1
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#000000',
            connectorColor: '#000000',
          }
        }
      },
      series: [{
        type: 'pie',
        data: [
          ['cabin', 18.0],
          ['rent<br/>electric<br/>parking', 16.0],
          ['groceries', 12.0],
          ['car payment', 9.0],
          ['europe savings', 7.0],
          ['entertainment', 7.0],
          ['phone bill', 6.0],
          ['misc.', 4.0],
          ['student loans', 4.0],
          ['business travel', 4.0],
          ['gas', 4.0],
          ['car insurance', 3.0],
          ['savings', 2.0],
          ['credit card payment', 2.0],
          ['amazon / heroku', 1.0],
          ['other', 1.0]
        ]
      }]
    });
  });
});
</script>

It was obvious from the data I should do X and X.

<div class="snippet" id="budget-after" style="height: 500px;">
</div>

<script>
$(function () {
  var chart;
  $(document).ready(function () {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: 'budget-after',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Budget (after)'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        percentageDecimals: 1
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#000000',
            connectorColor: '#000000',
          }
        }
      },
      series: [{
        type: 'pie',
        data: [
          ['cabin', 18.0],
          ['rent<br/>electric<br/>parking', 16.0],
          ['groceries', 12.0],
          ['car payment', 9.0],
          ['europe savings', 7.0],
          ['entertainment', 7.0],
          ['phone bill', 6.0],
          ['misc.', 4.0],
          ['student loans', 4.0],
          ['business travel', 4.0],
          ['gas', 4.0],
          ['car insurance', 3.0],
          ['savings', 2.0],
          ['credit card payment', 2.0],
          ['amazon / heroku', 1.0],
          ['other', 1.0]
        ]
      }]
    });
  });
});
</script>