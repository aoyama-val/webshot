# PhantomJSを使ってWebページのスクリーンショットを作るLambda関数


## デプロイ

予めLambdaで`webshot`という名前の関数を作成。
メモリは256MB以上、タイムアウトは20秒以上を推奨。
S3へのアップロード権限のあるroleをつけておくこと。

そして下記を実行すると、カレントディレクトリをzipで固めてデプロイする。

```
./update_lambda_function
```

## 実行例（aws cliを使う方法）

パラメータ：

```
url    スクリーンショットを取るURL
bucket 保存先S3バケット名
key    保存先S3のパス
sw     ウィンドウの幅
sh     ウィンドウの高さ
```

```
aws lambda invoke --function-name webshot --payload '{"url": "http://www.yahoo.co.jp", "bucket": "files-skybrain.ekispert.jp", "key": "test2.png"}' /dev/stdout
```

## fontconfigをビルドした方法

Amazon Linux 2016.09 にて：

```
yum install -y gperf freetype-devel libxml2-devel python27-lxml libtool automake

git clone http://anongit.freedesktop.org/git/fontconfig -b 2.12.1
cd fontconfig
./autogen.sh --sysconfdir=/tmp/skybrain_fontconfig/etc --prefix=/tmp/skybrain_fontconfig/usr --mandir=/tmp/skybrain_fontconfig/usr/share/man --enable-libxml2
make && make install
```


## 参考

[AWS LambdaでPhantomJS日本語フォント対応 | RCO Ad-Tech Lab Blog](https://www.rco.recruit.co.jp/career/engineer/blog/34/)
