<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">My Finance Pal</h3>

  <p align="center">
    Example Typescript Node.js webserivce showcasing best practices in software development
    <br />
    <a href="https://github.com/ungaralex/my-hexagonal-pal"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ungaralex/my-hexagonal-pal/issues">Report Bug</a>
    ·
    <a href="https://github.com/ungaralex/my-hexagonal-pal/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a standalone best practice web application developed for an engineering bootcamp
for a lecture at the Technical University of Munich.

Please bear in mind that also this is not a perfect version of an application as one would
imagine it running in production in a real world scenario. However, we tried to incorporate
as many best practices as possible, but as few as needed to get students, who are
on a beginner level, started. The goal is to have this is a toolbox for developing a state-of-the
art Node.js Typescript business application.

**Don't take everything we do in this application literally. It is important to also always think
for yourself and consider which of the presented techniques and frameworks you actually
need for your use case!**

At the end, we hope that this helps you on your journey on becoming an amazing software
developer and we hope you have fun exploring the universe of backend engineering :)

**Disclaimer: A lot of the standard Node.js/Express code was to some parts inspired, to some
copied over from [PracticaJS](https://github.com/practicajs/practica). Please have a look at their work and
examples as it gives you a great starting point and references when it comes to best practices
with Node.js development. Also have a look at the [Express Typescript Generator](https://www.npmjs.com/package/express-generator-typescript),
which we also used to create the initial setup of our app.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![NodeJs][Nodejs]][Node-url]
- [![Express.js][Expressjs]][Express-url]
- [![Typescript][Typescript]][Typescript-url]
- [![MongoDB][MongoDB]][Mongodb-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

In order to be able to start the service locally, follow these required steps.

### Prerequisites

Needed toolings and frameworks you should install before building the project:

- [Node.js](https://nodejs.org/en/download) (if not already installed)

- Update npm

  ```sh
  npm install npm@latest -g
  ```

- Yarn

  ```shell
  npm install yarn -g
  ```

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (Rancher on Windows can be used)

- GitHub CLI (optional)

  ```shell
  brew install gh
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/netlight/my-hexagonal-pal.git
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

### Run Locally

To run/debug the service locally in dev mode, only the following is needed:

1. Start the `mongo` service of the `docker-compose` file

   ```shell
    docker-compose up -d
   ```

2. Start the `my-finance-pal` service.

   ```shell
   yarn dev
   ```

   The service now runs on port 3000 and listens to requests

3. Use the Swagger Editor for an overview and playground of the Endpoint Collection

   ```
   docker pull swaggerapi/swagger-editor
   docker run -d -p 2000:8080 swaggerapi/swagger-editor
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/netlight/my-hexagonal-pal.svg?style=for-the-badge
[contributors-url]: https://github.com/netlight/my-hexagonal-pal/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/netlight/my-hexagonal-pal.svg?style=for-the-badge
[forks-url]: https://github.com/netlight/my-hexagonal-pal/network/members
[stars-shield]: https://img.shields.io/github/stars/ungaralex/my-hexagonal-pal.svg?style=for-the-badge
[stars-url]: https://github.com/netlight/my-hexagonal-pal/stargazers
[issues-shield]: https://img.shields.io/github/issues/ungaralex/my-hexagonal-pal.svg?style=for-the-badge
[issues-url]: https://github.com/netlight/my-hexagonal-pal/issues
[linkedin-shield-alex]: https://img.shields.io/badge/-Alexander%20Ungar-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-alex]: https://www.linkedin.com/in/alexander-ungar
[Expressjs]: https://img.shields.io/badge/Express-grey?style=for-the-badge&logo=express&logoColor=red
[Express-url]: https://expressjs.com/
[Nodejs]: https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=nodedotjs&logoColor=green
[Node-url]: https://nodejs.org/en
[Typescript]: https://img.shields.io/badge/Typescript-white?style=for-the-badge&logo=typescript&logoColor=blue
[Typescript-url]: https://www.typescriptlang.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-purple?style=for-the-badge&logo=mongodb&logoColor=green
[Mongodb-url]: https://www.mongodb.com/
