# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.

provider "google" {}

resource "google_project" "prj" {
  project_id      = local.project_id
  name            = local.project_id
  billing_account = var.google_billing_account

  lifecycle {
    # ignoring org_id changes allows the project to be created in whatever org
    # the user is part of by default, without having to explicitly include the
    # org id in the terraform config. is this a problem waiting to happen? only
    # time will tell.
    ignore_changes = [org_id]
  }
}

resource "google_project_service" "svc" {
  project = google_project.prj.name
  service = "${each.value}.googleapis.com"

  for_each = toset([
    "run",
  ])
}

resource "google_cloud_run_service" "app" {
  project = google_project.prj.name

  name     = "demo"
  location = var.google_cloud_region

  template {
    spec {
      containers {
        image = var.app_image

        env {
          name  = "ATLAS_URI"
          value = local.atlas_uri
        }
      }
    }
  }

  lifecycle {
    # this stops terraform from trying to revert to the sample app after you've
    # pushed new changes through CI
    ignore_changes = [template[0].spec[0].containers[0].image]
  }

  depends_on = [google_project_service.svc["run"]]
}

resource "google_cloud_run_service_iam_binding" "app" {
  location = google_cloud_run_service.app.location
  project  = google_cloud_run_service.app.project
  service  = google_cloud_run_service.app.name

  role    = "roles/run.invoker"
  members = ["allUsers"]
}
