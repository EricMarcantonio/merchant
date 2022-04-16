#!/usr/bin/env bash
aws ecr create-repository --repository-name merchant/auth --region us-east-1
aws ecr create-repository --repository-name merchant/catalog --region us-east-1
aws ecr create-repository --repository-name merchant/orders --region us-east-1
aws ecr create-repository --repository-name merchant/shopping-cart --region us-east-1
aws ecr create-repository --repository-name merchant/reviews --region us-east-1
aws ecr create-repository --repository-name merchant/visiting --region us-east-1
aws ecr create-repository --repository-name merchant/payment --region us-east-1
aws ecr create-repository --repository-name merchant/nginx --region us-east-1