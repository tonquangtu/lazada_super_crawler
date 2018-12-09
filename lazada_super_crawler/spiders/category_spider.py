import scrapy
import json


class CategorySpider(scrapy.Spider):
    name = 'category_spider'
    start_urls = ['https://www.lazada.vn/pages/i/vn/act/lp-categories']

    def parse(self, response):
        sub_cate1_part1 = response.xpath("//li[@class='sub-item-remove-arrow']/a//@href").extract()
        sub_cate1_part2 = response.xpath("//li[@class='lzd-site-menu-sub-item']/a//@href").extract()
        sub_cate1 = sub_cate1_part1 + sub_cate1_part2
        print sub_cate1
        for item in sub_cate1:
            print item
            if item and len(item) > 0:
                categ_url = {"category_1_url": item}
                yield {'category': categ_url}
