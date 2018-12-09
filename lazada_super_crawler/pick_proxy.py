import scrapy
import json


class PickProxySpider(scrapy.Spider):
    name = 'pick_proxy'
    start_urls = ['https://www.proxynova.com/proxy-server-list/country-id/',
                  'https://www.proxynova.com/proxy-server-list/country-cn/',
                  'https://www.proxynova.com/proxy-server-list/country-th/',
                  'https://www.proxynova.com/proxy-server-list/country-jp/',
                  'https://www.proxynova.com/proxy-server-list/country-tw/']

    def parse(self, response):
        proxy_xpath = "//table[@id='tbl_proxy_list']/tbody//tr"
        proxies_data = response.xpath(proxy_xpath)

        for i, proxy in enumerate(proxies_data):
            ip = proxy.xpath(".//td[1]/abbr/@title").extract()[0]
            port = proxy.xpath(".//td[2]/a/text()").extract()[0]

            if ip and port:
                ip = ip.strip()
                port = port.strip()

                if len(ip) > 5 and len(port) > 1:
                    yield {"ip_port": "%s:%s" % (ip, port)}

            if i > 10:
                break


# scrapy runspider pick_proxy.py -o new_proxy.json