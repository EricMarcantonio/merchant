.PHONY: install start docker-local docker-run
PORT=3001

install:
	npm install
	npm install nodemon

start:
	HOST='localhost' PORT='3306' USER='user' PASSWORD='password' DB='MERCHANT' EXPRESS_PORT=${PORT} CORS_ORIGIN='http://127.0.0.1:8080' nodemon

docker-local:
	docker build -f orders.Dockerfile -t merchant/orders:latest .

docker-run:
	docker run -e HOST='host.docker.internal' -e PORT='3306'  -e USER='user' -e PASSWORD='password' -e DB='MERCHANT' -e EXPRESS_PORT=${PORT} -e CORS_ORIGIN='http://127.0.0.1:8080' --expose ${PORT} merchant/orders:latest