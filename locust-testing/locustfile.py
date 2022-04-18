from locust import HttpUser, task, between


class QuickstartUser(HttpUser):
    wait_time = between(3, 3)
    count = 0

    @task
    def test_database_reads(self):
        self.client.get("/api/catalog/all/", headers={"cookie": "auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwMjQyNzAyLCJleHAiOjE3MzY2NDI3MDJ9.OTM0ulgS0SIb4SIyttEvyhBymlLs4gUf_dRScnVMN7M"})

