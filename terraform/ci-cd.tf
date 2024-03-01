# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.
resource "google_project_service" "ci_cd" {
  project = google_project.prj.name
  service = "${each.value}.googleapis.com"

  for_each = toset([
    "artifactregistry",
    "cloudbuild",
    "iam",
    "sourcerepo",
    "storage",
  ])
}

### this allows us to inject a 30 second delay between enabling a service and
### trying to use it. a resource that depends on this will not start until the
### timer is up. see google_artifact_registry_repository.repo for an example.

resource "time_sleep" "wait_for_services" {
  create_duration = "30s"
  depends_on      = [google_project_service.ci_cd]
}

### the cloud build default service account needs to have `roles/run.developer`
### to create and update cloud run services. it also needs to be able to act
### as the cloud run service account. see more info in the docs:
###
### https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run#continuous-iam

resource "google_project_iam_member" "build_run_developer" {
  project = google_project.prj.name
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_project.prj.number}@cloudbuild.gserviceaccount.com"

  depends_on = [google_project_service.ci_cd["cloudbuild"]]
}

resource "google_project_iam_member" "build_act_as" {
  project = google_project.prj.name
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_project.prj.number}@cloudbuild.gserviceaccount.com"

  depends_on = [google_project_service.ci_cd["cloudbuild"]]
}

resource "google_artifact_registry_repository" "repo" {
  project  = google_project.prj.name
  location = var.google_cloud_region

  repository_id = "repo"
  format        = "DOCKER"

  depends_on = [
    google_project_service.ci_cd["artifactregistry"],

    # wait for the service enablement to propagate before creating repo
    time_sleep.wait_for_services,
  ]
}

locals {
  image_path = "${var.google_cloud_region}-docker.pkg.dev/${google_project.prj.name}/${google_artifact_registry_repository.repo.name}/demo"
}

resource "google_sourcerepo_repository" "repo" {
  project = google_project.prj.name
  name    = "repo"

  depends_on = [google_project_service.ci_cd["sourcerepo"]]
}

resource "google_cloudbuild_trigger" "demo" {
  project  = google_project.prj.name
  name     = "demo"
  location = var.google_cloud_region

  trigger_template {
    repo_name   = google_sourcerepo_repository.repo.name
    branch_name = "^main$"
  }

  build {
    artifacts {
      images = ["${local.image_path}:$COMMIT_SHA"]
    }

    step {
      name       = "node"
      entrypoint = "npm"
      args       = ["install"]
    }

    step {
      name       = "node"
      entrypoint = "npm"
      args       = ["test"]
    }

    step {
      name = "gcr.io/cloud-builders/docker"
      args = ["build", "-t", "${local.image_path}:$COMMIT_SHA", "."]
    }

    step {
      name = "gcr.io/cloud-builders/docker"
      args = ["push", "${local.image_path}:$COMMIT_SHA"]
    }

    step {
      name = "gcr.io/cloud-builders/gcloud"
      args = [
        "run", "deploy", google_cloud_run_service.app.name,
        "--image", "${local.image_path}:$COMMIT_SHA",
        "--region", var.google_cloud_region
      ]
    }
  }

  depends_on = [
    google_project_service.ci_cd["cloudbuild"],

    # wait for the service enablement to propagate before creating trigger
    time_sleep.wait_for_services,
  ]
}
