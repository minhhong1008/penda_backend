import Crawl from "../models/crawl";
import axios from "axios";
import { CronJob } from "cron";
import Ebayitem from "../models/ebayitem";
import moment from "moment";
const cheerio = require("cheerio");

// Tạo hàm create
export const create = (req, res) => {
  const crawl = new Crawl(req.body);
  crawl.save((err, crawl) => {
    if (err) {
      return res.status(400).json({
        error: "Thêm crawl không thành công",
      });
    }
    res.json(crawl);
  });
};

// Hàm crawl lấy SKU từ link

export const crawl = (req, res) => {
  //   let config = {
  //     method: "post",
  //     url: "https://yaballe.com/user_login",
  //     headers: {
  //       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  //       Cookie: "_fbp=fb.1.1675399932837.925180993; _gcl_au=1.1.871321395.1675399947; _ga=GA1.2.1488163816.1675399949; _gid=GA1.2.81201770.1675399949; _gat=1",
  //       "Content-type": "application/x-www-form-urlencoded",
  //     },
  //     data: {
  //       email1: "vuoanh2209@gmail.com",
  //       password1: "Lo05091984",
  //     },
  //   };

  let config_checkSKU = {
    method: "get",
    url: "https://yaballe.com/source/amazon.com/B079V8CKDM?is_condition_new=true",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
      Cookie:
        "_fbp=fb.1.1675399932837.925180993; _gcl_au=1.1.871321395.1675399947; _ga=GA1.2.1488163816.1675399949; _gid=GA1.2.81201770.1675399949; session=eyJ1c2VyX2lkIjoiaG9hbmdkdWNhbmh0b215MTE3NjAwQGdtYWlsLmNvbSJ9.Y9yY8g.ov6AEmcbDcYj0KCZrguhu3Ux2Mc",
      "Content-type": "application/x-www-form-urlencoded",
    },
  };

  let fake_post = {
    url: "https://backend.penda.vn/api/ebay/update?id=3T1_80",
    method: "put",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzliZGY5NDJiZTZjNDM4YWNjNTlmMTgiLCJpYXQiOjE2NzUzOTkyODZ9.AuNgX7o-18o6p7bPyQRY1zyYITMU4XnVdPZQrMZ4svA",
    },
    data: {
      ebay_id: "3T1_80",
      ebay_plan:
        "PC,Antidetect,Windows 10,Chrome,Info real,Sim real,Bank real,USB 4G,Quy trình 9",
      ebay_block: "Team 2,Block 19",
      ebay_processing: "New",
      ebay_error: "",
      ebay_type: "VN",
      ebay_sell_status: "Đang thực hiện",
      ebay_owner: "Phòng sản xuất",
      ebay_employee: "Nguyễn Hoài",
      ebay_status: "Live",
      ebay_class: "Lớp 2",
      ebay_image_url: "",
      ebaydate_delivery: "2023-02-03 12:28",
      ebaydate_nextclass: "2023-02-03 12:28",
      ebaydate_start: "2023-02-03 12:28",
      ebaydate_verify: "2023-02-03 12:28",
      ebaydate_seller: "2023-02-03 12:28",
      ebaydate_verifybank: "2023-02-03 12:28",
      ebaydate_draft: "2023-02-03 12:28",
      ebaydate_list1: "2023-02-03 12:28",
      ebaydate_list2: "2023-02-03 12:28",
      ebaydate_list3: "2023-02-03 12:28",
      ebaydate_list4: "2023-02-03 12:28",
      ebaydate_list5: "2023-02-03 12:28",
      ebaydate_moveroom: "2023-02-03 12:28",
      ebaydate_calendarseller: "2023-02-03 12:28",
      ebaydate_calendarlist1: "2023-02-03 12:28",
      ebaydate_calendarlist2: "2023-02-03 12:28",
      ebaydate_calendarlist3: "2023-02-03 12:28",
      ebaydate_calendarlist4: "2023-02-03 12:28",
      ebaydate_calendarlist5: "2023-02-03 12:28",
      ebaydate_error: "2023-02-03 12:28",
      ebaydate_restrict: "2023-02-03 12:28",
      ebaydate_suspended: "2023-02-03 12:28",
      ebaydate_checksus1: "2023-02-03 12:28",
      ebaydate_checksus2: "2023-02-03 12:28",
      ebaydate_checksus3: "2023-02-03 12:28",
      ebaydate_contact1: "2023-02-03 12:28",
      ebaydate_contact2: "2023-02-03 12:28",
      ebaydate_contact3: "2023-02-03 12:28",
      ebaydate_contact4: "2023-02-03 12:28",
      ebaydate_contact5: "2023-02-03 12:28",
      list_view:
        "device_id,proxy_id,info_id,mail_id,sim_id,bank_id,payoneer_id,paypal_id,ebay_id,etsy_id,amazon_id,shopee_id,facebook_id",
    },
  };

  axios(fake_post)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
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

//

export const crawl_SKU_cron = new CronJob(
  "*/10 * * * * 0-6",
  function () {
    // time
    const now_hours = moment().format("HH");
    // query db -> time = time -> chay
    Crawl.find({ crawl_cron_time: now_hours }).exec((err, cron_rule) => {
      // Da co cai crawl thoa man dk
      if(err || !cron_rule){
        return
      }
      let cron = cron_rule[0];
      const {
        crawl_search_key,
        crawl_link,
        crawl_rate,
        crawl_price_min,
        crawl_price_max,
        crawl_count_rate,
      } = cron;
      let arr_crawl_link = crawl_link.split("\n");
      let list_SKU = [];
      if (crawl_search_key == "search_key") {
        arr_crawl_link.forEach((item, index) => {
          let link = "https://www.amazon.com/s?k=" + item;
          var config = {
            method: "get",
            url: link,
          };

          axios(config)
            .then(function (response) {
              const $ = cheerio.load(response.data);
              //   Thong tin san pham
              let list = $(
                ".sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20"
              );

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
                    parseFloat(crawl_price_min) <= price_float &&
                    price_float <= parseFloat(crawl_price_max)
                  ) {
                  } else {
                    condition = false;
                  }
                } else {
                  condition = false;
                }
                if (star) {
                  star = star.replace(" out of 5 stars", "");
                  let star_float = parseFloat(star);
                  if (parseFloat(crawl_rate) <= star_float) {
                  } else {
                    condition = false;
                  }
                } else {
                  condition = false;
                }
                if (count_star) {
                  let start_int = parseInt(count_star.replace(",", ""));
                  if (parseInt(crawl_count_rate) <= start_int) {
                  } else {
                    condition = false;
                  }
                } else {
                  condition = false;
                }

                if (condition) {
                  list_SKU.push(SKU);
                  const ebayItem = new Ebayitem({
                    ebayitem_sku: SKU,
                  });
                  ebayItem.save();
                }
              });

              console.log(list_SKU, config.url);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      } else {
        arr_crawl_link.forEach((item, index) => {
          var config = {
            method: "get",
            url: item,
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
              // "Connection": "Keep-Alive",
              // "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
              Cookie:
                'session-id=133-9546844-2470763; ubid-main=135-9837988-7485109; mbox=session#2d2b5fd5eba54c0f961c6a31c76cb120#1675400473|PC#2d2b5fd5eba54c0f961c6a31c76cb120.38_0#1738643413; AMCV_4A8581745834114C0A495E2B%40AdobeOrg=-2121179033%7CMCIDTS%7C19392%7CvVersion%7C5.3.0%7CMCMID%7C49781039777035094693064396033954679965%7CMCAAMLH-1676003412%7C3%7CMCAAMB-1676003412%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1675405812s%7CNONE%7CMCAID%7CNONE; _mkto_trk=id:365-EFI-026&token:_mch-amazon.com-1675398613230-46599; s_nr=1675398632414-New; s_lv=1675398632415; x-main=9UPCkVr81B3XXoepBoX68NTOl7ooAMkcV6wwa0bdsrsHb5W29i9NldVCpbsQLYe8; at-main=Atza|IwEBICEW7AKjq_AVZNflAK71PHhmnN8meKrh4PtZW6kAQNhD6UUCaiIpyVeU0P-mtsrC4RBXIDMvgyoU9YY3Oq45JtNZATnhrvAABdFqzj9_5ULLcs-IEss_l8LpLFXq0OuYFSflmSFOoZ5wPe9TC9dz3YSV-fFwQU3E_z9WD4mJy1pbiOzzDNkeLnUIwekcDWWY76EIm5MrhuEIzw_sNqO0oP3b; sess-at-main="YaZIpRvT/iqqmK7G+yOR+/vCzkpBVrnX9sFci0mKZDs="; sst-main=Sst1|PQGwRwxpDKm64uBx-SJGWeUyCap3Senvd_KhtuPaExzTYZg-_S4lZWE8XLB8TkCloTwmCG7WNct3P6ipf_wJIjGwnvCKpsjj2P3FKN4Lhdp8VLhhCt29xqjhRNwmHCWngJAvwbzp9SgvjJV-Su05tU3m-hgP-E3EBRk7nOrE9ZX85RwFSQ0jsxvasx_I4MhFDGT3D_PAERM1xCzF6SxHQF_rYiqTzuzcoPM3fZktOYI1vZn0wnpLIh6_yoEg_49rVUiM-HQUINUg2Wa2TescMY5heLdUpfr-_5gg6eJPA1AlREU; lc-main=en_US; session-id-time=2082787201l; i18n-prefs=USD; session-token=0g+mNxFKqCkULnETqiRhCXxwzLMEkYrWw9Ic4yw1I+IdA5oJV8gthbD4ncDxGdG+Bcf4SBzLLDoKXJcVNMHUCtW90ZjcKxK1qaAPB+vy8J85Kp83Ds1uebca5sGMiD7KdIVRK83EX3w0QETooYRP7ABzL58kF5/nxcDSXqKX+D4nOekdIrnC7LPIKSSpYcBtA0ke2dWBkCAhXlfY/jGvVozsJ0TN7bfAzc2znDL6zUMQqyvW2O+o5s7a8jacm3BW; sp-cdn="L5Z9:VN"; csm-hit=tb:G2JFKPZQZDPCFC5YPAY7+s-F9VGMDME3ARCC5TQCWV5|1675413304375&t:1675413304375&adb:adblk_no; i18n-prefs=USD',
            },
            // proxy: {
            //   protocol: "http",
            //   host: "103.177.34.214",
            //   port: 3130,
            // },
          };
          axios(config)
            .then(function (response) {
              const $ = cheerio.load(response.data);
              //   Thong tin san pham
              let list = $(
                ".sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20"
              );

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
                    parseFloat(crawl_price_min) <= price_float &&
                    price_float <= parseFloat(crawl_price_max)
                  ) {
                  } else {
                    condition = false;
                  }
                } else {
                  condition = false;
                }
                if (star) {
                  star = star.replace(" out of 5 stars", "");
                  let star_float = parseFloat(star);
                  if (parseFloat(crawl_rate) <= star_float) {
                  } else {
                    condition = false;
                  }
                } else {
                  condition = false;
                }
                // if (count_star) {
                //   let start_int = parseInt(count_star.replace(",", ""));
                //   if (parseInt(crawl_count_rate) <= start_int) {
                //   } else {
                //     condition = false;
                //   }
                // } else {
                //   condition = false;
                // }

                if (condition) {
                  list_SKU.push(SKU);
                  const ebayItem = new Ebayitem({
                    ebayitem_sku: SKU,
                  });
                  console.log(SKU);
                  ebayItem.save();
                }
              });
              console.log(list_SKU, config.url);
            })
            .catch(function (error) {
              console.log(error);
              return;
            });
        });
      }

      // https://www.amazon.com/s?k=World+Communion+Cups&page=3
      console.log(list_SKU);

      return;
      //
    });
  },
  null,
  false,
  "America/Los_Angeles"
);

// Hàm crawl lấy SKU từ link

export const update_SKU_cron = new CronJob(
  "00 43 01 * * 0-6",
  function () {
    let cookie = "";
    axios({
      method: "get",
      url: "https://www.amazon.com/gp/delivery/ajax/address-change.html?locationType=LOCATION_INPUT&zipCode=90006&storeContext=hi&deviceType=web&pageType=Detail&actionSource=glow&almBrandId=undefined",
      headers: {
        Connection: "Keep-Alive",
        "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
      },
      proxy: {
        protocol: "http",
        host: "45.119.82.101",
        port: 3333,
      },
    })
      .then((res) => {
        cookie = res.response.headers["set-cookie"].join("; ");
      })
      .catch((err) => {
        cookie = err.response.headers["set-cookie"].join("; ");
      });

    setTimeout(() => {
      console.log(cookie);
      Ebayitem.find({ ebayitem_title: null }).limit(20).exec((err, ebay_item) => {
        ebay_item.forEach((data_item) => {
          axios({
            method: "get",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
              Cookie: cookie + "; i18n-prefs=USD",
            },
            url: "https://www.amazon.com/dp/" + data_item.ebayitem_sku,
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
                ebayitem_title: title,
                ebayitem_price: price,
                ebayitem_brand: brand,
                ebayitem_color: color,
                ebayitem_compatible_devices: compatible_devices,
                ebayitem_form_factor: form_factor,
                ebayitem_shell_type: shell_type,
                ebayitem_description: JSON.stringify(description),
                ebayitem_list_img: JSON.stringify(list_img),
              };
              if (data.ebayitem_price !== null && data.ebayitem_title) {
                Ebayitem.findOneAndUpdate(
                  { ebayitem_sku: data_item.ebayitem_sku },
                  { $set: data },
                  { useFindAndModify: false },
                  (err, ebay_item) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    console.log("save to db", ebay_item.ebayitem_sku);
                  }
                );
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      });
    }, 10000);
  },
  null,
  false,
  "America/Los_Angeles"
);

export const crawl123123 = (req, res) => {
  const {
    crawl_search_key,
    crawl_link,
    crawl_rate,
    crawl_price_min,
    crawl_price_max,
    crawl_count_rate,
  } = req.body;

  let arr_crawl_link = crawl_link.split("\n");
  console.log(arr_crawl_link.length);
  if (arr_crawl_link.length == 1) {
    console.log("Không có dữ liệu");
    return;
  }

  if (crawl_search_key == "search_key") {
    arr_crawl_link.forEach((item, index) => {
      let link = "https://www.amazon.com/s?k=" + item;
      var config = {
        method: "get",
        url: link,
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
            let price_liblary = [
              {
                selector: "#twister-plus-price-data-price",
                value: "value",
              },
              {
                selector: "#apex_desktop span",
                value: "",
              },
              {
                selector: "#corePrice_desktop",
                value: "",
              },
            ];
            let price1;
            price_liblary.forEach((item) => {
              if (item.value !== "") {
                price1 = content.find(item.selector).attr(item.value);
              } else {
                price1 = content.find(item.selector).text();
              }
              if (price1 !== null) {
                return false;
              }
            });
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
                parseFloat(crawl_price_min) <= price_float &&
                price_float <= parseFloat(crawl_price_max)
              ) {
              } else {
                condition = false;
              }
            } else {
              condition = false;
            }
            if (star) {
              star = star.replace(" out of 5 stars", "");
              let star_float = parseFloat(star);
              if (parseFloat(crawl_rate) <= star_float) {
              } else {
                condition = false;
              }
            } else {
              condition = false;
            }
            if (count_star) {
              let start_int = parseInt(count_star.replace(",", ""));
              if (parseInt(crawl_count_rate) <= start_int) {
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

          console.log(list_SKU, config.url);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  } else {
    arr_crawl_link.forEach((item, index) => {
      var config = {
        method: "get",
        url: item,
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
                parseFloat(crawl_price_min) <= price_float &&
                price_float <= parseFloat(crawl_price_max)
              ) {
              } else {
                condition = false;
              }
            } else {
              condition = false;
            }
            if (star) {
              star = star.replace(" out of 5 stars", "");
              let star_float = parseFloat(star);
              if (parseFloat(crawl_rate) <= star_float) {
              } else {
                condition = false;
              }
            } else {
              condition = false;
            }
            if (count_star) {
              let start_int = parseInt(count_star.replace(",", ""));
              if (parseInt(crawl_count_rate) <= start_int) {
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
          console.log(list_SKU, config.url);
        })
        .catch(function (error) {
          console.log("error");
          return;
        });
    });
  }

  // https://www.amazon.com/s?k=World+Communion+Cups&page=3

  return;
};
