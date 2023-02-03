import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const crawlSchema = mongoose.Schema(
  {
    crawl_url: { type: String },
    crawl_rate: { type: String },
    crawl_prime: { type: String },
    crawl_search_key: { type: String },
    crawl_price_min: { type: String },
    crawl_price_max: { type: String },
    crawl_count_rate: { type: String },
    crawl_categories: { type: String },
    crawl_deliver: { type: String },
    crawl_instock: { type: String },
    crawl_resum: { type: String },
    crawl_cron: { type: String },
    crawl_cron_time: { type: String },
    crawl_website: { type: String },
    crawl_local: { type: String },
    crawl_link: { type: String },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Crawl", crawlSchema);
