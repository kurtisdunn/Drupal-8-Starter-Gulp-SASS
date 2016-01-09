# Drupal-8-Theme-Gulp-Bootstrap3-Sass-Browser-Sync
A starter theme for Drupal 8 using Drush CLI, Boostrap 3 SASS, Gulp + BrowserSync for automation.


###Prerequisites

- [Drupal 8](https://www.drupal.org/drupal-8.0.2-release-notes)
- [NodeJS](https://nodejs.org/en/download/)
- [Drush CLI](http://docs.drush.org/en/master/install/) must be installed locally or globally for automating cache refresh with Gulp. it is recommended that Drupal 8 sites are built using Composer, with Drush listed as a dependency.

```sh
# Download latest stable release using the code below or browse to github.com/drush-ops/drush/releases.
wget http://files.drush.org/drush.phar
# Or use our upcoming release: wget http://files.drush.org/drush-unstable.phar  

# Test your install.
php drush.phar core-status

# Rename to `drush` instead of `php drush.phar`. Destination can be anywhere on $PATH. 
chmod +x drush.phar
sudo mv drush.phar /usr/local/bin/drush

# Enrich the bash startup file with completion and aliases.
drush init

```

### Usage

```sh

# clone a copy
git clone https://github.com/kurtisdunn/Drupal-8-Theme-Bootstrap-3-SASS.git
cd Drupal-8-Theme-Bootstrap-3-SASS

# get it going:
npm install
bower install

# run it
gulp

```