# wordpress-themedev
boilerplate for wordpress theme development

# Directory Structure
```
├─themes/your-theme		# theme root     
├─ index.php
├─ functions.php
├─ style.css
├─ assets				# compiled files
│  ├─ img
│  ├─ css
│  └─ js
├─ src				# original files
│  ├─ img
│  ├─ css
│  └─ js
├─.gitignore
```

# Recommended
 - npm
 - gulp
 - docker
 - wp-env

# wp-env
```
wp-env start
```

```
wp-env stop
```

## wp-cliを使う

```
wp-env run cli wp 
```

[@wordpress/envハンドブック](https://ja.wordpress.org/team/handbook/block-editor/reference-guides/packages/packages-env/)

# Gulp

start developing with
```
npm start
```

build css js img files
```
gulp build
```
