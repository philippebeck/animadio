Package.describe({
  name: "animadio:animadio",
  version: "0.1.22",
  summary: "Animadio CSS Framework - Grid & Flexbox Layouts - Reusable & Customizable Elements",
  git: "https://github.com/animadio/animadio.git",
  documentation: "README.md"
});

Package.onUse(function(api) {
  api.versionsFrom("METEOR@1.0");
  api.addFiles([
    "dist/animadio.css"
  ], "client");
});
