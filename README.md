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


## 参考

[AWS LambdaでPhantomJS日本語フォント対応 | RCO Ad-Tech Lab Blog](https://www.rco.recruit.co.jp/career/engineer/blog/34/)
