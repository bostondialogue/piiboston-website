module.exports = {
  layout: "event.njk",
  permalink: (data) => `/events/${data.page.fileSlug}/index.html`,
};
