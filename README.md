# Drupal-8-Theme-Gulp-Bootstrap3-Sass-Browser-Sync
A base Drupal 8 Theme using Drush CLI, Boostrap 3 SASS, Gulp for automation and BrowserSync


###Prerequisites

- [Drush CLI](http://docs.drush.org/en/master/install/) must be installed locally or globally for automating cache refresh with Gulp.

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