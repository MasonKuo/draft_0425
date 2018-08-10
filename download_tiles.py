#!/usr/bin/python

import urllib.request
# import requests
import os, sys
from gmap_utils import *

import time
import random

def download_tiles(zoom, lat_start, lat_stop, lon_start, lon_stop, satellite=True):

    #start_x, start_y = latlon2xy(zoom, lat_start, lon_start)
    #stop_x, stop_y = latlon2xy(zoom, lat_stop, lon_stop)
    start_x, start_y = latlng2tilenum(zoom, lat_start, lon_start)
    stop_x, stop_y = latlng2tilenum(zoom, lat_stop, lon_stop)

    print ("x range", start_x, stop_x)
    print ("y range", start_y, stop_y)

    user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
    headers = { 'User-Agent' : user_agent }
    proxies = { "http": "http://gwx341939:L3<G6+NN@proxycn2.huawei.com:8080/", "https": "http://gwx341939:L3%3CG6%2BNN@proxycn2.huawei.com:8080/", }

    for x in range(start_x, stop_x):
        for y in range(start_y, stop_y):

            url = None
            filename = None

            if satellite:
                url = "http://khm1.google.com/kh?v=87&hl=en&x=%d&y=%d&z=%d" % (x, y, zoom)
                filename = "%d_%d_%d_s.jpg" % (zoom, x, y)
            else:
                url = "https://api.mapbox.com/styles/v1/guoxiaoting/cjgbxa75h587r2rrpsf9oreg0/tiles/256/%d/%d/%d?access_token=pk.eyJ1IjoiZ3VveGlhb3RpbmciLCJhIjoiY2pnYnc1ejVkOHN5MjJxcG9ld2d6bWJiNCJ9.RCmKiVSj9U2Yb7AwJ7EbEA" % (zoom, x, y)
                filename = "./googlemap/%d/%d/%d.png" % (zoom, x, y)
                zoomdir = "./googlemap/%d" % (zoom)
                xdir = "./googlemap/%d/%d" % (zoom, x)

            if not os.path.exists(zoomdir):
                os.makedirs(zoomdir)
            if not os.path.exists(xdir):
                os.makedirs(xdir)

            if not os.path.exists(filename):
                bytes = None

                #try:
                proxy_support = urllib.request.ProxyHandler({'https': 'http://gwx341939:L3%3CG6%2BNN@proxycn2.huawei.com:8080'})
                opener = urllib.request.build_opener(proxy_support)
                urllib.request.install_opener(opener)
                req = urllib.request.Request(url, data=None, headers=headers)
                # req.set_proxy('proxycn2.huawei.com:8080', 'https')
                response = urllib.request.urlopen(req)

                #response = requests.get(url, proxies=proxies, verify='false')

                bytes = response.read()
                #except Exception:
                    #print ("失败")
                    #sys.exit(1)

                if bytes.startswith(b"<html>"):
                    print ("-- forbidden", filename)
                    sys.exit(1)

                print ("-- saving", filename)

                f = open(filename,'wb')
                f.write(bytes)
                f.close()

                # time.sleep(1 + random.random())

def latlng2tilenum(zoom, lat_deg, lng_deg):
    """
    convert latitude, longitude and zoom into tile in x and y axis
    referencing http://www.cnblogs.com/Tangf/archive/2012/04/07/2435545.html

    Keyword arguments:
    lat_deg -- latitude in degree
    lng_deg -- longitude in degree
    zoom    -- map scale (0-18)

    Return two parameters as tile numbers in x axis and y axis
    """
    n = math.pow(2, int(zoom))
    xtile = ((lng_deg + 180) / 360) * n
    lat_rad = lat_deg / 180 * math.pi
    ytile = (1 - (math.log(math.tan(lat_rad) + 1 / math.cos(lat_rad)) / math.pi)) / 2 * n
    return math.floor(xtile), math.floor(ytile)

if __name__ == "__main__":

    zoom = [7,8,9,10,11,12,13,14,15,16,17,18]
    #jinanurl
    #lat_start, lon_start = 38.0662712168,114.6545341003
    #lat_stop, lon_stop = 34.5889387674,119.1919063757
    lat_start, lon_start = 37.73257427,116.01988970
    lat_stop, lon_stop = 35.83082923,117.94113090
    #kuwaiturl
    # lat_start, lon_start = 29.437915, 47.479706
    # lat_stop, lon_stop = 28.879721, 48.24852
    for i in range(len(zoom)):
        download_tiles(zoom[i], lat_start, lat_stop, lon_start, lon_stop, satellite=False)
