module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  eleventyConfig.addFilter("readableDate", (iso) => {
    if (!iso) return null;
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  });

  eleventyConfig.addFilter("isUpcoming", (iso) => {
    if (!iso) return false;
    const today = new Date().toISOString().slice(0, 10);
    return iso >= today;
  });

  // posts without a recovered date sort after every dated post
  const byDateDesc = (a, b) => {
    const da = a.data.date || "0000-00-00";
    const db = b.data.date || "0000-00-00";
    return db.localeCompare(da);
  };

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByTag("post").sort(byDateDesc));

  eleventyConfig.addCollection("events", (api) =>
    api.getFilteredByTag("event").sort(byDateDesc));

  eleventyConfig.addCollection("upcomingEvents", (api) => {
    const today = new Date().toISOString().slice(0, 10);
    return api.getFilteredByTag("event")
      .filter((e) => e.data.date && e.data.date >= today)
      .sort((a, b) => a.data.date.localeCompare(b.data.date));
  });

  eleventyConfig.addCollection("recentEvents", (api) => {
    const eventPages = api.getFilteredByTag("event");
    const eventPosts = api.getFilteredByTag("post").filter((post) =>
      post.data.categories && post.data.categories.includes("Events"));
    return eventPages.concat(eventPosts).sort(byDateDesc);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
  };
};
