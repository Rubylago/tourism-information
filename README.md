# Tourism Review
Tourism Review is a backend project built with Node.js + Express + MySQL/ClearDB, deployed on Heroku.
<p align="center">
  <a href="https://imgur.com/D2UVYQv"><img src="https://i.imgur.com/D2UVYQv.jpg?1" title="source: imgur.com" />Start your journey</a>
</p>


## Table of contents

- [About](#About)
- [Features](#Features)
- [Run the server locally](#Run-the-server-locally)

## About

Tourism Review is an online tourism information of national leisure agricultural areas platform that can help you explore attractions. You can leave a comment or bookmark your favorite attractions, follow top travel influencers and design your perfect vacation by choosing from the best attractions.

### Third-party libraries that are used in this project

- Using [bcrypt](https://www.npmjs.com/package/bcrypt) to hash password with a salt
- Using [body-parser](https://www.npmjs.com/package/body-parser) to extract the information from incoming requests such as sign-up form at frontend
- Using [express](https://expressjs.com) as web applications framework for Node.js
- Using [method-override](https://www.npmjs.com/package/method-override) to support DELETE and PUT requests
- Using [dayjs](https://www.npmjs.com/package/dayjs) to customize date and time format in confirmation email
- Using [passport-facebook](http://www.passportjs.org/packages/passport-facebook/) with Facebook Strategy to authenticate users with their Facebook account, and give access to user's profile info for signing up

## Features

### Visitor

As a visitor, you can...

1. Browse and search attractions.
2. Check out the detail of attractions and leave a comment.
3. Bookmark your favorite attractions.
4. Follow top travel influencers.
5. Below is a user account you can use

<div style="margin-left: 40px; text-align: center;">

|  email   | password  |
|  ----  | ----  |
| user1@example.com  | 12345678 |

</div>

### Admin
As a admin, you can ...

1. Create, edit, delete attractions at attractions management page.
2. You can also delete comments bellow the attraction page as well.

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
git clone https://github.com/r05323045/mealfinder.git
```

#### **2. Setup Database**

> Create database via MySQL Workbench

```bash
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

```
> app running http://localhost:3000
```