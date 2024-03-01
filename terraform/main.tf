# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.

###-----------------------------------------------------------------------------
### configure terraform
###-----------------------------------------------------------------------------

terraform {
  required_version = ">= 0.13"

  required_providers {
    google = {
      version = "~> 4.36"
      source  = "hashicorp/google"
    }

    mongodbatlas = {
      version = "~> 1.4.5"
      source  = "mongodb/mongodbatlas"
    }
  }
}

###-----------------------------------------------------------------------------
### shared config
###-----------------------------------------------------------------------------

resource "random_string" "mongodb_password" {
  length  = 32
  special = false
  upper   = true
}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

locals {
  project_id = "${var.project_name}-${random_string.suffix.result}"
}
