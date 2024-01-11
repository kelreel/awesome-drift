REGISTRY_ID ?= crpfbnl7j4u0rs8okf7v
APPLICATION_NAME ?= blinks-app
SHOPIFY_API_KEY ?= 32bfa54d5584531846e1f46b8f899a30 # dev

# build-arm:
# 	docker build . -t cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME} --build-arg SHOPIFY_API_KEY=${SHOPIFY_API_KEY}

button-tree-build:
	docker build -f button-tree.Dockerfile --platform=linux/amd64 . -t cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME} --build-arg SHOPIFY_API_KEY=${SHOPIFY_API_KEY}

button-tree-push:
	docker push cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME}

# add all env vars to target .env (fot testing)
button-tree-run:
	docker run --net=host --env-file ./apps/button-tree/web/.env --rm cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME}

