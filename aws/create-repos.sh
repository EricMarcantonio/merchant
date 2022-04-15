#!/usr/bin/env bash
aws ecr create-repository --repository-name merchant/auth
aws ecr create-repository --repository-name merchant/catalog
aws ecr create-repository --repository-name merchant/orders
aws ecr create-repository --repository-name merchant/shopping-cart
aws ecr create-repository --repository-name merchant/reviews
aws ecr create-repository --repository-name merchant/visiting
aws ecr create-repository --repository-name merchant/payment
aws ecr create-repository --repository-name merchant/nginx