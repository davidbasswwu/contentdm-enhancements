CONTENTdm v6.x enhancements
======================

This code includes two features:
* combined search tabs
* non-controlled-vocabulary link removal

#combined search tabs
The combined-search-tabs.css and combined-search-tabs.js files work together to combine the exact, all, and any searches into one page, which looks like ![](http://i.imgur.com/ySErjFo.png)

You can see an example of this by going to http://content.wwu.edu/cdm/search/searchterm/east%20west/order/nosort 

To add these files to your configuration, go to example.com/config, Global Settings, Custom Pages / Widgets, and upload the files as shown here: 
![]( https://dl.dropboxusercontent.com/s/g75o828m9f3cehj/2014-08-29%2010_21_58-CONTENTdm%20Website%20Configuration%20Tool.png?dl=0)


#remove non-cv links
The "non-cv" js file converts non-controlled vocabulary links (found on item-level display pages) to plain text (e.g. it removes the link).  To better understand why we did this, please compare the links at the bottom of http://cdm15963.contentdm.oclc.org/cdm/compoundobject/collection/vstudy/id/441 with the object description of http://content.wwu.edu/cdm/compoundobject/collection/gbscrapbook/id/536/rec/2 as shown in the following screenshot:
![](https://dl.dropboxusercontent.com/s/qqwkbhwasdm3qlr/2014-08-29%20at%201.53%20PM.png?dl=0)
