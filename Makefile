.PHONY: docker-compose

docker-compose:
	docker compose up -d

docker-build:
	docker compose build --no-cache

clean:
	docker system prune -a -f

start: docker-build docker-compose