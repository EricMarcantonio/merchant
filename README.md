# MERCHANT

Welcome to Merchant: the scaling ecommerce store.

http://merch-loadb-1r4urevhxv5t-366647718.us-east-1.elb.amazonaws.com

What you need to run:

- Active AWS profile
- Docker
- AWS CLI
- A default VPC

We have included a link to postman tests in the PDF. In case you don't have
it: https://documenter.getpostman.com/view/10967445/Uyr5oKcs

Almost everything is a "one-click" deployment. There is one caveat: you need to manually add the subnet-ids of your VPC in the cloudformation template. I was in the process of automating this as well, but ran out of time.

You also need to seed the DB manually. The DB endpoint is an `output` from the cloudformation deployment. Use MySQL drivers to login with `user`, `password` and the DBName is `MERCHANT`