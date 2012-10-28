#!/usr/bin/env python

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display

import os
import time
import logging

class Drivers:
    
    def ie(self):
        return webdriver.Ie()
        
    def firefox(self):
        return webdriver.Firefox()
        
    def chrome(self):
        chromedriver = './chromedriver'
        os.environ['webdriver.chrome.driver'] = chromedriver
        return webdriver.Chrome(chromedriver)
    
class Site:
    
    def get(self):
        web.get("http://frank.lovecch.io")
    
    def title (self):
        try:
            print("Title: " + web.title)
            assert "LOVECCH.IO" in web.title
        except:
            print("Title != LOVECCH.IO")
            
    def links (self):
        linkstr = ""
        links = web.find_elements_by_xpath("//a")
        for link in links:
            logger.info("Link: " + link)
        try:
            print("Iterate through front-page links")
        except:
            print("Front page-links broked.")
        
#elem = web.find_element_by_id("username")
#elem.send_keys("johnsept14@2lemetry.com")


logging.basicConfig(level=logging.INFO)    
    
display = Display(visible=0, size=(800, 600))
display.start()   

drivers = Drivers()
web = drivers.chrome()
            
site = Site()
site.get()
site.title()
site.links()

web.quit()
display.stop()