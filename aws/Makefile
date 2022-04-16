
REGION='ca-central-1'

create-private-repos:
	aws ecr create-repository --repository-name merchant/catalog

deploy:
	aws cloudformation deploy --region 'us-east-1' --template-file possible_good.yml --stack-name testy --capabilities CAPABILITY_NAMED_IAM

convert:
	AWS_SECRET_ACCESS_KEY='DSbuAAh9lfYmglZku/5LSglQgCbX7QMuwjcwdAaN' AWS_ACCESS_KEY_ID='AKIARRVFVRZBVAWSTMDY' docker --context myecscontext compose -f docker-compose-aws.yml convert > baseline.yml

