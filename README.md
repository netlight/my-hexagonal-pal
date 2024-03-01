<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield-alex]][linkedin-url-alex]
[![LinkedIn][linkedin-shield-saadi]][linkedin-url-saadi]
[![LinkedIn][linkedin-shield-arda]][linkedin-url-arda]


<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">My Finance Pal</h3>

  <p align="center">
    Example Typescript Node.js webserivce showcasing best practices in software development
    <br />
    <a href="https://github.com/ungaralex/my-finance-pal-backend"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ungaralex/my-finance-pal-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/ungaralex/my-finance-pal-backend/issues">Request Feature</a>
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

* [![NodeJs][Nodejs]][Node-url]
* [![Express.js][Expressjs]][Express-url]
* [![Typescript][Typescript]][Typescript-url]
* [![MongoDB][MongoDB]][Mongodb-url]
* [![Jest][Jest]][Jest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

In order to be able to start the service locally, follow these required steps.

### Prerequisites

Needed toolings and frameworks you should install before building the project:

* [Node.js](https://nodejs.org/en/download) (if not already installed)

* Update npm

  ```sh
  npm install npm@latest -g
  ```

* Yarn

  ```shell
  npm install yarn -g
  ```

* GitHub CLI (optional but recommended)

  ```shell
  brew install gh
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/ungaralex/my-finance-pal-backend.git
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

### Run Locally

To run/debug the service locally in dev mode, only the following is needed:

1. Start the `mongo` service of the `docker-compose` file

   ```shell
    docker-compose up -d mongo
   ```

2. Start the `my-finance-pal` service.

   ```shell
   yarn dev
   ```

The service now runs on port 3000 and listens to requests

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Google Cloud Platform (GCP) Infrastructure

We use [Cloud Run](https://cloud.google.com/run). It is a serverless platform for deploying containerized applications.
Besides Cloud Run, there are a few other supporting GCP services that we use, such as Cloud Build and Artifact Registry.

This section briefly describes how to setup the infrastructure resources using the `gcloud` CLI. For a production-ready setup,
we strongly recommend not using the CLI, but rather adopting an Infrastructure-as-Code approach, e.g. using [Terraform](https://www.terraform.io/). For the scope of this demo application, the CLI is sufficient.

### Infrastructure Setup Prerequisites

1. Open an account on GCP.
2. Create a new project on GCP.
3. Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install).
4. Authenticate to GCP using: `gcloud auth login`.

### Setup Steps

Start by setting the project ID:

`gcloud config set project <GCP_PROJECT_ID>`

Next, we'll enable a few services:

`gcloud services enable cloudbuild.googleapis.com artifactregistry.googleapis.com run.googleapis.com`

* `cloudbuild.googleapis.com` -> [Cloud Build](https://cloud.google.com/build), used to build the container images
* `artifactregistry.googleapis.com` -> [Artifact Registry](https://cloud.google.com/artifact-registry), used to store the container images
* `run.googleapis.com` -> [Cloud Run](https://cloud.google.com/run), used to deploy the container images

Once that is done, we'll create an artifact repository to store the container images:

`gcloud artifacts repositories create --location <GCP_REGION> cloud-run-builds --repository-format docker`

Don't forget to replace the `<GCP_REGION>` placeholder with a region of your choice, e.g. europe-west1.

Now, we create a service account for GitHub Actions to use:

`gcloud iam service-accounts create gh-actions`

We'll use this service account in the next section to authenticate to GCP from GitHub Actions. Let's now grant a few
permissions to the service account:

```shell
gcloud projects add-iam-policy-binding <GCP_PROJECT_ID> \
  --member=serviceAccount:gh-actions@<GCP_PROJECT_ID>.iam.gserviceaccount.com \
  --role=roles/cloudbuild.builds.editor

gcloud projects add-iam-policy-binding <GCP_PROJECT_ID> \
  --member=serviceAccount:gh-actions@<GCP_PROJECT_ID>.iam.gserviceaccount.com \
  --role=roles/cloudbuild.builds.viewer

gcloud projects add-iam-policy-binding <GCP_PROJECT_ID> \
  --member=serviceAccount:gh-actions@<GCP_PROJECT_ID>.iam.gserviceaccount.com \
  --role=roles/storage.admin

gcloud iam service-accounts add-iam-policy-binding \
  <GCP_PROJECT_NUMBER>-compute@developer.gserviceaccount.com \
  --member="serviceAccount:gh-actions@<GCP_PROJECT_ID>.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

As a rule of thumb, try to always keep the permissions as granular as possible and follow the least-privilege principle.

> Note: `<GCP_PROJECT_NUMBER>-compute@developer.gserviceaccount.com` refers to the Compute Engine default service account.
> You can find the project number in the GCP console, or by running `gcloud projects describe <GCP_PROJECT_ID> --format='value(projectNumber)'`.

## CI/CD Pipelines Using GitHub Actions

[GitHub Actions](https://github.com/features/actions) is a reasonably good CI/CD platform. We use it to build and deploy
this demo application to GCP. The [.github/workflows](.github/workflows) directory contains the definitions for the CI and CD pipelines.

### Authenticating to GCP using a Service Account Key

We use the [auth](https://github.com/google-github-actions/auth/tree/v1/) action to authenticate to GCP using a service account key.
The service account key is a long-lived credential, thus it's not ideal from a security perspective.
For a production-ready setup, we strongly recommend using [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) instead.

Generate the service account key using the following command:

`gcloud iam service-accounts keys create gh-actions-key.json --iam-account gh-actions@<GCP_PROJECT_ID>.iam.gserviceaccount.com`

### Populating Secrets in GitHub

The GCP service account key needs to be stored as a secret in the GitHub repo. Alongside, we store a few other GCP-related
configuration values, such as project ID and region. Secrets can be accessed in the GitHub Actions workflows.

We advise using [gh](https://cli.github.com/) to create the secrets:

```shell
gh secret set GCP_PROJECT_ID --body '<GCP_PROJECT_ID>'
gh secret set GCP_REGION --body '<GCP_REGION>' # e.g. europe-west1
gh secret set GCP_SA_KEY --body $(cat <GPC_SERVICE_ACCOUNT_KEY.json> | base64)
```

The CI and CD workflows reference these secrets and will now be able to authenticate to GCP.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/netlight/my-finance-pal-backend.svg?style=for-the-badge
[contributors-url]: https://github.com/netlight/my-finance-pal-backend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/netlight/my-finance-pal-backend.svg?style=for-the-badge
[forks-url]: https://github.com/netlight/my-finance-pal-backend/network/members
[stars-shield]: https://img.shields.io/github/stars/ungaralex/my-finance-pal-backend.svg?style=for-the-badge
[stars-url]: https://github.com/netlight/my-finance-pal-backend/stargazers
[issues-shield]: https://img.shields.io/github/issues/ungaralex/my-finance-pal-backend.svg?style=for-the-badge
[issues-url]: https://github.com/netlight/my-finance-pal-backend/issues
[linkedin-shield-alex]: https://img.shields.io/badge/-Alexander%20Ungar-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-shield-saadi]: https://img.shields.io/badge/-Saadi%20Myftija-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-shield-arda]: https://img.shields.io/badge/-Arda%20Özdere-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-alex]: https://www.linkedin.com/in/alexander-ungar
[linkedin-url-saadi]: https://www.linkedin.com/in/saadimyftija
[linkedin-url-arda]: https://www.linkedin.com/in/arda-%C3%B6zdere-85058a91

[Expressjs]: https://img.shields.io/badge/Express-grey?style=for-the-badge&logo=express&logoColor=red
[Express-url]: https://expressjs.com/
[Nodejs]: https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=nodedotjs&logoColor=green
[Node-url]: https://nodejs.org/en
[Typescript]: https://img.shields.io/badge/Typescript-white?style=for-the-badge&logo=typescript&logoColor=blue
[Typescript-url]: https://www.typescriptlang.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-purple?style=for-the-badge&logo=mongodb&logoColor=green
[Mongodb-url]: https://www.mongodb.com/
[Jest]: https://img.shields.io/badge/Jest-orange?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
