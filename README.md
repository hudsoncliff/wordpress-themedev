# wordpress-themedev
boilerplate for wordpress theme development

## はじめにやること

* ライブラリのインストール
下記のいずれか  
`npm install`  
`yarn`

* sanitize.cssなどをbuild  
`npx gulp build`  
`/assets`ディレクトリが生成される

## 開発ノウハウ

* 作成時のミドルウェアバージョンは以下

```
$ npm -v
8.1.2
$ node -v
v16.13.1
```

* 画像やjsやcssはsrc配下へ配置すること
* 画像をsrcへ配置したあとは`gulp build`を実行するとassetsに画像が配置される
* ローカル環境で開発をする際には、`yarn start`を実行するとファイル監視状態になる
  * .scssファイルとjsファイルは編集するとコンパイルされたファイルが`assets`に配置される

# File Structure
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
 - npm or yarn
 - gulp
 - docker
 - wp-env
 - composer
 - phpcs

## settings.json設定
```
phpcs.executablePath
phpcbf.executablePath
```

## wp-env
```
wp-env start
```

```
wp-env stop
```

## WorｄPressのブロック開発

下記コマンドでブロック開発監視モードに変わる。
初期は`src/index.js`が監視対象
```
npm run start-build
```

## wp-cliを使う

```
wp-env run cli wp 
```

[@wordpress/envハンドブック](https://ja.wordpress.org/team/handbook/block-editor/reference-guides/packages/packages-env/)

## Gulp

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
