from scrapy.utils.project import get_project_settings

from lazada_super_crawler.spiders.product_list_spider import ProductListSpider


from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging

import threading
import time


# creat asynchronous function with decorator
@defer.inlineCallbacks
def crawl():
    yield runner.crawl(ProductListSpider)
    reactor.stop()


# Because preventing the scrapy run too long time, we will set time to stop
def stop_crawler(hour=4):
    time.sleep(hour * 60 * 60)
    reactor.stop()


if __name__ == '__main__':
    try:
        # Get cunrrent settings in settings.py
        settings = get_project_settings()
        runner = CrawlerRunner(settings)

        # Set time to stop after x hours
        # stop_threading = threading.Thread(target=stop_crawler, args=(4,))
        # stop_threading.start()

        crawl()
        reactor.run()  # the script will block here until the last crawl call is finished
    except Exception as e:
        print e
        pass


#
# 7b22617365727665722d6c617a6164613b32223a223536333937663931303234366161653330323234633631336663343064623031434a695a756541464550695a727462397365444e58673d3d227d
