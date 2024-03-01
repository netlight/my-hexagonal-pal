# The terraform code in this repo is based on the official tutorial from the following link
# https://cloud.google.com/blog/topics/developers-practitioners/easy-deployment-mean-stack-w-mongodb-atlas-cloud-run-and-hashicorp-terraform
# The rest of the steps can be followed up from there.

output "app_url" {
  value = google_cloud_run_service.app.status[0].url
}

output "repo_url" {
  value = google_sourcerepo_repository.repo.url
}
