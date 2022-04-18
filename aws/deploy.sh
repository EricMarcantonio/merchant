#!/usr/bin/env bash
ID=$(aws sts get-caller-identity --query "Account" | tr -d \")
REGION='us-east-1'
VPC=$(aws ec2 describe-vpcs --region ${REGION} --filters Name=isDefault,Values=true --query 'Vpcs[*].VpcId' --output text)


AuthSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/auth)
CatalogSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/catalog)
NginxSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/nginx)
OrderSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/orders)
PaymentSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/payment)
ReviewsSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/reviews)
ShopSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/shopping-cart)
VisitSHA=$(docker inspect --format='{{index .RepoDigests 0}}' "${ID}".dkr.ecr.${REGION}.amazonaws.com/merchant/visiting)


echo 'Deploying'
aws cloudformation deploy --region "${REGION}" --template-file "template.yml" --stack-name merchant --capabilities CAPABILITY_NAMED_IAM --parameter-overrides AccountId="${ID}" --parameter-overrides Region="${REGION}" --parameter-overrides VPC="${VPC}" AuthSHA="${AuthSHA}" CatalogSHA="${CatalogSHA}" NginxSHA="${NginxSHA}" OrderSHA="${OrderSHA}" PaymentSHA="${PaymentSHA}" ReviewsSHA="${ReviewsSHA}" ShopSHA=${ShopSHA} VisitSHA=${VisitSHA}


