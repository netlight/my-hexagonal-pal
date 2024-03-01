# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.

###-----------------------------------------------------------------------------
### general config
###-----------------------------------------------------------------------------

variable "project_name" {
  type        = string
  description = "the base name to use when creating resources. a randomized suffix will be added."
  default     = "my-finance-pal"
}

###-----------------------------------------------------------------------------
### region config
###-----------------------------------------------------------------------------

variable "google_cloud_region" {
  type        = string
  description = "the Google Cloud region in which to create resources"
  default     = "europe-west-1"
}

variable "atlas_cluster_region" {
  type        = string
  description = "the Atlas region in which to create the database cluster"
  default     = "WESTERN_EUROPE"
}

variable "app_image" {
  type        = string
  description = "the fully-qualified name of your app image"
}

###-----------------------------------------------------------------------------
### Google Cloud
###-----------------------------------------------------------------------------

variable "google_billing_account" {
  type        = string
  description = "the ID of your Google Cloud billing account"
}

###-----------------------------------------------------------------------------
### MongoDB Atlas
###-----------------------------------------------------------------------------

variable "atlas_cluster_tier" {
  type        = string
  description = "the tier of cluster you want to create. see the Atlas docs for details."
  default     = "M0" # M0 is the free tier
}

variable "atlas_org_id" {
  type        = string
  description = "the ID of your MongoDB Atlas organization"
}

variable "atlas_pub_key" {
  type        = string
  description = "public key for MongoDB Atlas"
}

variable "atlas_priv_key" {
  type        = string
  description = "private key for MongoDB Atlas"
}

###-----------------------------------------------------------------------------
### MongoDB database
###-----------------------------------------------------------------------------

variable "db_name" {
  type        = string
  description = "the name of the database to configure"
  default     = "myFinancePal"
}

variable "db_user" {
  type        = string
  description = "the username used to connect to the mongodb cluster"
  default     = "mongo"
}
