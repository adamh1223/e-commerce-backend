# E-commerce Back End

## Description

Welcome to E-commerce Back End! This application contains an interactive database of categories, products, and tags, that front end developers can make GET, POST, PUT, and DELETE requests to.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Links](#link-to-github-repository)

## Installation

Ensure that you've download the necessary dependencies by giving the command npm i. This project utilizes Dotenv, express, MySQL, and Sequelize. Add a gitignore file, and add node_modules to it. You will need to download Insomnia to test routes on it.

## Usage

To use the application, install your packages using "npm i", and then start the server with the command "node server". Once the server is live, open up Insomnia to test the routes. You can GET, CREATE, DELETE, and UPDATE 3 things: Categories, Products, and Tags.

For product routes, use the base url:

http://localhost:3001/api/products

For category routes, use the base url:

http://localhost:3001/api/categories

For tag routes, use the base url:

http://localhost:3001/api/tags

## Contributing

For future contibutors of this application, feel free to ask questions, request new features, improve documentation, use visual aids, or add new innovative technology to reduce the size of the application.

## Questions

If you have any questions about the project, please contact me via:

- GitHub: [Adamh1223](https://github.com/Adamh1223)
- Email: [adam@hussmedia.io](mailto:adam@hussmedia.io)

## User Story

AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies

## Acceptance Criteria

GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database

## Technologies Used

Built with:

- HTML5
- CSS
- JavaScript
- Node.js
- Express
- Dotenv
- MySQL
- Sequelize
- Insomnia

## Link to GitHub Repository

https://github.com/adamh1223/e-commerce-backend

## Link to video demonstration

### <p align="center">[Back to Top](#e-commerce-back-end)</p>
