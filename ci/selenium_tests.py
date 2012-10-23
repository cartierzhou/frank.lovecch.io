#!/usr/bin/env python

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from pyvirtualdisplay import Display

import os
import time
import logging

logging.basicConfig(level=logging.INFO)

chromedriver = './chromedriver'
os.environ['webdriver.chrome.driver'] = chromedriver

display = Display(visible=0, size=(800, 600))
display.start()

#web = webdriver.Firefox()
web = webdriver.Chrome(chromedriver)

# General

web.get("http://frank.lovecch.io")

class Site:
    
    def title (self):
        try:
            print("Title: " + web.title)
            assert "LOVECCH.IO" in web.title
        except:
            print("Title != LOVECCH.IO")
            
    def links (self):
        
    def main (self):
        #elem = web.find_element_by_id("username")
        #elem.send_keys("johnsept14@2lemetry.com")
            
site = Site()
site.title()

web.quit()
display.stop()