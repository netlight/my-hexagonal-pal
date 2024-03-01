# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.

provider "mongodbatlas" {
  public_key  = var.atlas_pub_key
  private_key = var.atlas_priv_key
}

resource "mongodbatlas_project" "demo" {
  name   = local.project_id
  org_id = var.atlas_org_id
}

resource "mongodbatlas_project_ip_access_list" "acl" {
  project_id = mongodbatlas_project.demo.id
  cidr_block = "0.0.0.0/0"
}

resource "mongodbatlas_cluster" "cluster" {
  project_id = mongodbatlas_project.demo.id
  name       = local.project_id

  provider_name               = "TENANT"
  backing_provider_name       = "GCP"
  provider_region_name        = var.atlas_cluster_region
  provider_instance_size_name = var.atlas_cluster_tier
}

resource "mongodbatlas_database_user" "user" {
  project_id         = mongodbatlas_project.demo.id
  auth_database_name = "admin"

  username = var.db_user
  password = random_string.mongodb_password.result

  roles {
    role_name     = "readWrite"
    database_name = var.db_name
  }
}

locals {
  atlas_uri = replace(
    mongodbatlas_cluster.cluster.srv_address,
    "://",
    "://${var.db_user}:${mongodbatlas_database_user.user.password}@"
  )
}
