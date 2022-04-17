from locust import HttpUser, task, between


class QuickstartUser(HttpUser):
    wait_time = between(3, 3)
    count = 0

    @task
    def test_database_reads(self):
        self.client.get("/api/cart/v1/", headers={"Cookie": "auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwMjMzNzI5LCJleHAiOjE3MzY2MzM3Mjl9.jRnZm18_NANXL7N8aD2LxARN_sT6d69PSeqMMVTPTBM"})

