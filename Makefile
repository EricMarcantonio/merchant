.PHONY: docker-compose

docker-compose:
	docker compose up -d

docker-build:
	docker compose build --no-cache