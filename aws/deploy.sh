#!/usr/bin/env bash
ID=$(aws sts get-caller-identity --query "Account" | tr -d \")
REGION='us-east-1'
VPC=$(aws ec2 describe-vpcs --region ${REGION} --filters Name=isDefault,Values=true --query 'Vpcs[*].VpcId' --output text)


#aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin "${ID}.dkr.ecr.${REGION}.amazonaws.com"
#
#aws ecr create-repository --repository-name merchant/auth --region ${REGION}
#aws ecr create-repository --repository-name merchant/catalog --region ${REGION}
#aws ecr create-repository --repository-name merchant/orders --region ${REGION}
#aws ecr create-repository --repository-name merchant/shopping-cart --region ${REGION}
#aws ecr create-repository --repository-name merchant/reviews --region ${REGION}
#aws ecr create-repository --repository-name merchant/visiting --region ${REGION}
#aws ecr create-repository --repository-name merchant/payment --region ${REGION}
#aws ecr create-repository --repository-name merchant/nginx --region ${REGION}
#
#cd ../catalog && make docker-build
#cd ../orders && make docker-build
#cd ../payment && make docker-build
#cd ../reviews && make docker-build
#cd ../shopping-cart && make docker-build
#cd ../visiting && make docker-build
#cd ../nginx && make docker-build
#cd ../auth && make docker-build
#
#docker tag merchant/catalog "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/catalog:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/catalog:latest"
#
#docker tag merchant/orders "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/orders:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/orders:latest"
#
#docker tag merchant/payment "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/payment:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/payment:latest"
#
#docker tag merchant/reviews "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/reviews:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/reviews:latest"
#
#docker tag merchant/shopping-cart "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart:latest"
#
#docker tag merchant/visiting "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/visiting:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/visiting:latest"
#
#docker tag merchant/nginx "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/nginx:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/nginx:latest"
#
#docker tag merchant/auth "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/auth:latest"
#docker push "${ID}.dkr.ecr.${REGION}.amazonaws.com/merchant/auth:latest"

AuthSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/auth)
CatalogSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/catalog)
NginxSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/nginx)
OrderSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/orders)
PaymentSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/payment)
ReviewsSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/reviews)
ShopSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart)
VisitSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/visiting)



aws cloudformation deploy --region "${REGION}" --template-file ./template.yml --stack-name merchant4 --capabilities CAPABILITY_NAMED_IAM --parameter-overrides AccountId="${ID}" --parameter-overrides Region="${REGION}" --parameter-overrides VPC="${VPC}" AuthSHA="${AuthSHA}" CatalogSHA="${CatalogSHA}" NginxSHA="${NginxSHA}" OrderSHA="${OrderSHA}" PaymentSHA="${PaymentSHA}" ReviewsSHA="${ReviewsSHA}" ShopSHA=${ShopSHA} VisitSHA=${VisitSHA}


