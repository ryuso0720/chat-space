# README
# chat-space
本アプリはTECH CAMPで作成したチャットアプリである。
[![Image from Gyazo](https://i.gyazo.com/9c8a1284156847f64ed82c271352ea77.gif)](https://gyazo.com/9c8a1284156847f64ed82c271352ea77)

## App URL
http://3.115.186.159/

## ゲスト用アカウント
|email|password|
|---|---|
|guest@gmail.com|11111111|

# 使用技術（開発環境）
- Ruby 2.5.1
- Ruby on Rails 5.0.7.2
- Haml
- Sass
- jQuery
- carrierwave

# 本番環境
AWS EC2〜S3導入
<br>
Nginx,Unicorn,Capistrano導入

# 苦労した点
- 投稿時の非同期通信
- 自動更新機能
- チャットグループメンバーのインクリメンタルサーチ

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, add_index: true|
|email|string|false, unique: true|
|password|string|null: false|
### Association
- has_many :users_groups
- has_many :groups, through: users_groups
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
## Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
## Association
- has_many :users_groups
- has_many :users, through: users_groups
- has_many :messages

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
belongs_to :group
belongs_to :user