#!/usr/bin/env bash
ID=$(aws sts get-caller-identity --query "Account" | tr -d \")
REGION='ca-central-1'

aws ecr get-login-password --region 'ca-central-1' | docker login --username AWS --password-stdin "${ID}.dkr.ecr.${REGION}.amazonaws.com"

cd ../catalog && make docker-build
cd ../orders && make docker-build
cd ../payment && make docker-build
cd ../reviews && make docker-build
cd ../shopping-cart && make docker-build
cd ../visiting && make docker-build
cd ../nginx && make docker-build
cd ../auth && make docker-build

docker tag merchant/catalog "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/catalog:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/catalog:latest"

docker tag merchant/orders "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/orders:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/orders:latest"

docker tag merchant/payment "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/payment:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/payment:latest"

docker tag merchant/reviews "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/reviews:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/reviews:latest"

docker tag merchant/shopping-cart "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart:latest"

docker tag merchant/visiting "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/visiting:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/visiting:latest"

docker tag merchant/nginx "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/nginx:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/nginx:latest"

docker tag merchant/auth "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/auth:latest"
docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/auth:latest"
