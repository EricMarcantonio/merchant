#!/usr/bin/env bash
ID=$(aws sts get-caller-identity --query "Account" | tr -d \")
REGION='ca-central-1'
AWS_SECRET_ACCESS_KEY='DSbuAAh9lfYmglZku/5LSglQgCbX7QMuwjcwdAaN'
AWS_ACCESS_KEY_ID='AKIARRVFVRZBVAWSTMDY'
aws ecr get-login-password --region 'ca-central-1' | docker login --username AWS --password-stdin "${ID}.dkr.ecr.${REGION}.amazonaws.com"


AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} docker --context myecscontext compose -f docker-compose-aws.yml  up


