# Tourism Review

Tourism Review 是一個使用 Node.js + Express + MySQL/ClearDB 建立的後端專案，使用 Github 自動化部署於 Heroku。

  ![index](https://github.com/Rubylago/tourism-information/blob/main/tourism-information_index.jpg?raw=true)  
  
<p align="center">
  <a href="https://desolate-falls-97924.herokuapp.com/"> 
  Start your journey</a>
</p>

## Table of contents
- [專案說明](#專案說明)
- [Demo](#Demo)
- [測試帳號](#測試帳號)
- [使用技術](#使用技術)
- [About](#About)
- [Features](#Features)
- [Run the server locally](#Run-the-server-locally)

## 專案說明

本網站以 [全國休閒農業區旅遊資訊](https://data.gov.tw/dataset/6406) 作為資料根據，建置台灣在地休閒農場討論網站，內容包含：

  1. 首頁: 最新消息、最新上架景點、最新留言綜覽
  2. 所有景點與單一景點資訊
  3. 帳號系統：個人帳號之建置與個人資料修改、Facebook 第三方認證登入
  4. 留言系統：使用者可以於單一景點下方留言
  5. 收藏系統：使用者可以按愛心收藏喜歡的景點
  6. 追蹤系統：使用者可以追蹤其他使用者
  7. 後台管理系統：管理員 CRUD

## Demo

**[Live Demo](https://desolate-falls-97924.herokuapp.com/)**  

### 測試帳號

|role|  email   | password  |
|---- |  ----  | ----  |
|user|user1@example.com|12345678|
|admin|admin@example.com|admin|

## 使用技術

- Node.js, Express, MySQL
- 支援 Facebook Login
- 網站使用 Github 自動化部署於 Heroku
- 整合 imgur API，實作上傳圖片功能
- 採用 bcrypt 處理使用者密碼
- 結合 Bootstrap & Handlebars 完成前端版面設置

## About

Tourism Review is a backend project built with Node.js + Express + MySQL/ClearDB, deployed on Heroku.  

It's an online tourism information of national leisure agricultural areas platform that can help you explore attractions. You can leave a comment or bookmark your favorite attractions, follow top travel influencers and design your perfect vacation by choosing from the best attractions.

## Features

### Visitor

As a visitor, you can...

1. Browse and search attractions.
2. Check out the detail of attractions and leave a comment.
3. Bookmark your favorite attractions.
4. Follow top travel influencers.
5. Below is a user account you can use

<div style="margin-left: 40px; text-align: center;">

|role|  email   | password  |
|---- |  ----  | ----  |
|user|user1@example.com|12345678|
</div>

### Admin

As a admin, you can ...

1. Create, edit, delete attractions at attractions management page.
2. You can also delete comments bellow the attraction page as well.
3. Below is a admin account you can use

<div style="margin-left: 40px; text-align: center;">

|role|  email   | password  |
|---- |  ----  | ----  |
|admin|admin@example.com|admin|
</div>

## Run the server locally

The following instruction will walk you through the installation and settings needed to run this project on your local device.

### Environment SetUp

- [npm](https://www.npmjs.com/get-npm)
- [Node.js v14.16.0](https://nodejs.org/en/download/)
- [MySQL v8.0.15](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### Setup Application

#### **1. Clone this repository to your local machine**

```bash
git clone https://github.com/Rubylago/tourism-information.git
```

#### **2. Setup Database**

> Create database via MySQL Workbench

```
drop database if exists tourism;
create database tourism;
```

#### **3. Install backend packages via npm**

```bash
npm install
```

#### **4. Sign up for the following services**

- [Facebook for Developers](https://developers.facebook.com/)：create a new App with Facebook Login feature, an App ID and Secret Key will be generated automatically.

#### **5. set up your own .env environment variables**

> .env.example file containing all environment variables defined in .env

#### **6. Run migration, Add Seeder**

```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

#### **7. Activate server**

```bash
npm run start
```

#### **8. Find the message for successful activation**

```bash
> app running http://localhost:3000
```

## data sources
opendata: [Tourism Information of National Leisure Agricultural Areas](https://data.gov.tw/dataset/6406)
