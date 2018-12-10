import scrapy
import json


class ProductListSpider(scrapy.Spider):
    name = 'product_list_spider'
    start_urls = ['https://www.lazada.vn/may-tinh-all-in-one/?page=1']

    def __init__(self, from_page=1, to_page=100, base_url='https://www.lazada.vn/may-tinh-all-in-one/?'):
        self.products = []
        self.from_page = from_page
        self.current_page = from_page
        self.to_page = to_page
        self.base_url = base_url
        self.start_urls = [base_url + "page=%s" % from_page]

    def parse(self, response):
        # print "response: ", response.text
        scripts = response.xpath("//script/text()").extract()
        page_size = self.to_page
        for script in scripts:
            if script.startswith("window.pageData"):
                data = script.split("window.pageData=")[1]
                data = json.loads(data, encoding='utf-8')
                page_size = data.get("mainInfo", {}).get("pageSize", self.to_page)
                list_items = data.get("mods", {}).get("listItems")
                for item in list_items:
                    product = {
                        "itemId": item.get("itemId"),
                        "nid": item.get("nid"),
                        "name": item.get("name"),
                        "price": item.get("price"),
                        "priceShow": item.get("priceShow"),
                        "productUrl": item.get("productUrl"),
                        "sku": item.get("sku"),
                        "skus": item.get("skus"),
                        "skuId": item.get("skuId"),
                        "categories": item.get("categories"),
                        "brandId": item.get("brandId")
                    }
                    yield {"product": product}
                break

        if self.current_page < self.to_page and self.current_page < page_size:
            self.current_page += 1
            next_page = self.base_url + "page=%s" % self.current_page
            yield response.follow(next_page, self.parse)


# scrapy crawl product_list_spider
# fe5f9a347a3da5990dccebd4fad31f6e
