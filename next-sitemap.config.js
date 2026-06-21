/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://bmpetcare.in",
  generateRobotsTxt: true,

  exclude: [
    "/admin",
    "/admin/*",
    "/admin/login",
    "/admin/users",
    "/admin/settings",
    "/admin/bookings",
    "/admin/enquiries",
    "/admin/pages",
  ],
};