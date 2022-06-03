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

# All In On Migrationの容量開放

```
wp-env run cli vi .htaccess
```

.htaccessファイルを開いて下記設定を追記
```
php_value upload_max_filesize 128M
php_value post_max_size 128M
php_value memory_limit 256M
php_value max_execution_time 300
php_value max_input_time 300
```
