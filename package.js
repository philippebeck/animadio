Package.describe({
  name: 'philippebeck:animadio',
  version: '0.1.9',
  summary: 'Animadio CSS Framework - Grid & Flexbox Layouts - Reusable & Customizable Elements - Perform Complex Animations - Controls by Radio Buttons - No JavaScript needed or used',
  git: 'https://github.com/animadio/animadio.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.addFiles([
    'dist/animadio.css'
  ], 'client');
});
