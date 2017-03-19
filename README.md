# PhantomJSを使ってWebページのスクリーンショットを作るLambda関数

## 実行例（aws cliを使う方法）

パラメータ：

```
url    スクリーンショットを取るURL
bucket 保存先S3バケット名
key    保存先S3のパス
```

```
aws lambda invoke --function-name webshot --payload '{"url": "http://www.yahoo.co.jp", "bucket": "files-skybrain.ekispert.jp", "key": "test2.png"}' /dev/stdout
```

## デプロイ

```
./update_lambda_function
```
