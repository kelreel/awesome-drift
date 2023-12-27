REGISTRY_HOST ?= gsc
REGISTRY_ID ?= shopify
APPLICATION_NAME ?= countdown-app
SHOPIFY_API_KEY ?= 1b4ac2117f7d8c7d56975e2018b3129b # replace prod/dev

dev-build:
	docker build --platform=linux/amd64 . -t ${REGISTRY_HOST}/${REGISTRY_ID}/${APPLICATION_NAME} --build-arg SHOPIFY_API_KEY=${SHOPIFY_API_KEY}

dev-run:
	docker run --net=host --env-file ./web/.env --rm ${REGISTRY_HOST}/${REGISTRY_ID}/${APPLICATION_NAME}

dev-subscription-webhook:
	npx shopify webhook trigger --topic=APP_SUBSCRIPTIONS_UPDATE --api-version=2023-07 --delivery-method=http --address=http://localhost:54145/api/webhooks


# ----------
ifeq ("${env}","dev")
 SHOPIFY_API_KEY=4d463b2a64e9752c4f0c6f79ab043e6c
endif
ifeq ("${env}","prod")
 SHOPIFY_API_KEY=0fc1b40b3c1e4a9fad5442615c5f8da7
endif

ifeq ("${env}","")
 $(error env should be dev or prod)
endif

# https://shopify.dev/docs/apps/tools/cli/commands
shopify-deploy:
	npx shopify app deploy --client-id=${SHOPIFY_API_KEY}

aws-image-push:
	ENV=${env} SHOPIFY_API_KEY=${SHOPIFY_API_KEY} sh deploy/push2ecr.sh

aws-task-update:
	aws ecs register-task-definition  --cli-input-json file://deploy/ShopifyApp_Countdown_${env}.json

aws-service-restart:
	aws ecs update-service --cluster=shopify-apps --service=Countdown_${env} --force-new-deployment

aws-secret:
	# make aws-secret name=/Deploy/ShopifyApps/dev/POSTGRES_URL value=...
	aws ssm put-parameter --name=$(name) --type=SecureString --overwrite --value=$(value)
