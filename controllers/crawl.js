import axios from "axios";
const cheerio = require("cheerio");

export const crawl = (req, res) => {
  const { url, rate, price_range, count_rate } = req.body;
  var config = {
    method: "get",
    url: url,
  };

  axios(config)
    .then(function (response) {
      const $ = cheerio.load(response.data);
      //   Thong tin san pham
      let list = $(
        ".sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20"
      );
      let list_SKU = [];
      $(list).each((index, el) => {
        let condition = true;
        let SKU = $(el).attr("data-asin");
        let content = $(el).find(
          ".a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small"
        );
        let price = content
          .find(
            ".a-size-base.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal:first-child .a-offscreen"
          )
          .html();
        let count_star = content
          .find(
            ".a-section.a-spacing-none.a-spacing-top-micro .a-row.a-size-small .a-size-base"
          )
          .html();
        let star = content
          .find(
            ".a-section.a-spacing-none.a-spacing-top-micro .a-row.a-size-small > span > span:first-child"
          )
          .text();
        if (price) {
          let price_float = parseFloat(price.replace("$", ""));
          if (
            parseFloat(price_range[0]) <= price_float &&
            price_float <= parseFloat(price_range[1])
          ) {
            console.log(
              parseFloat(price_range[0]),
              price_float,
              parseFloat(price_range[1])
            );
          } else {
            console.log(1);
            condition = false;
          }
        } else {
          condition = false;
        }
        if (star) {
          star = star.replace(" out of 5 stars", "");
          let star_float = parseFloat(star);
          if (parseFloat(rate) <= star_float) {
          } else {
            console.log(2);
            condition = false;
          }
        } else {
          condition = false;
        }
        if (count_star) {
          let start_int = parseInt(count_star.replace(",", ""));
          if (parseInt(count_rate) <= start_int) {
          } else {
            condition = false;
          }
        } else {
          condition = false;
        }

        if (condition) {
          list_SKU.push(SKU);
        }
      });
      const list_item = [];
      list_SKU.forEach((item) => {
        axios({
          method: "get",
          url: "https://www.amazon.com/dp/" + item,
        })
          .then(function (response) {
            const $ = cheerio.load(response.data);
            //   Thong tin san pham
            let product = $("#centerCol");
            let title = $(product).find("#productTitle").text().trim();
            let price =
              $(product).find(".a-price-whole").text() +
              $(product).find(".a-price-fraction").text();
            let brand = $(".po-brand .po-break-word").text();
            let color = $(".po-color .po-break-word").text();
            let compatible_devices = $(
              ".po-compatible_devices .po-break-word"
            ).text();
            let form_factor = $(".po-form_factor .po-break-word").text();
            let shell_type = $(".po-shell_type .po-break-word").text();
            let description = [];
            $("#feature-bullets ul li").each((index, el) => {
              description[index] = $(el).find(".a-list-item").text().trim();
            });
            //  Anh san pham
            let image = $("#altImages ul .item");
            let list_img = [];
            $(image).each((index, item) => {
              list_img[index] = $(item)
                .find("img")
                .attr("src")
                .replace(",50_.", "_.");
            });
            // So luong sp
            let stock = $("#rightCol")
              .find("#availabilityInsideBuyBox_feature_div .a-size-medium")
              .text()
              .trim();
            if (stock == "In Stock.") {
            }
            let data = {
              title: title,
              price: price,
              brand: brand,
              color: color,
              compatible_devices: compatible_devices,
              form_factor: form_factor,
              shell_type: shell_type,
              description: description,
              list_img: list_img,
            };
            list_item.push(data);
            console.log(data);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
      console.log('run 2');
      return res.status(200).json(list_item);
    })
    .catch(function (error) {
      console.log(error);
    });

  return;
};

const getDataOfProduct = (item) => {
    axios({
        method: "get",
        url: "https://www.amazon.com/dp/" + item,
      })
        .then(function (response) {
          const $ = cheerio.load(response.data);
          //   Thong tin san pham
          let product = $("#centerCol");
          let title = $(product).find("#productTitle").text().trim();
          let price =
            $(product).find(".a-price-whole").text() +
            $(product).find(".a-price-fraction").text();
          let brand = $(".po-brand .po-break-word").text();
          let color = $(".po-color .po-break-word").text();
          let compatible_devices = $(
            ".po-compatible_devices .po-break-word"
          ).text();
          let form_factor = $(".po-form_factor .po-break-word").text();
          let shell_type = $(".po-shell_type .po-break-word").text();
          let description = [];
          $("#feature-bullets ul li").each((index, el) => {
            description[index] = $(el).find(".a-list-item").text().trim();
          });
          //  Anh san pham
          let image = $("#altImages ul .item");
          let list_img = [];
          $(image).each((index, item) => {
            list_img[index] = $(item)
              .find("img")
              .attr("src")
              .replace(",50_.", "_.");
          });
          // So luong sp
          let stock = $("#rightCol")
            .find("#availabilityInsideBuyBox_feature_div .a-size-medium")
            .text()
            .trim();
          if (stock == "In Stock.") {
          }
          let data = {
            title: title,
            price: price,
            brand: brand,
            color: color,
            compatible_devices: compatible_devices,
            form_factor: form_factor,
            shell_type: shell_type,
            description: description,
            list_img: list_img,
          };
          
          console.log(data);
        })
        .catch(function (error) {
          console.log(error);
        });

};
