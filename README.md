# chat-space
本アプリはTECH CAMPで作成したチャットアプリである。
[![Image from Gyazo](https://i.gyazo.com/9c8a1284156847f64ed82c271352ea77.gif)](https://gyazo.com/9c8a1284156847f64ed82c271352ea77)

## App URL
http://3.115.186.159/

## ゲスト用アカウント
|email|password|
|---|---|
|guest@gmail.com|11111111|

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