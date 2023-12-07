REGISTRY_ID ?= crpfbnl7j4u0rs8okf7v
APPLICATION_NAME ?= blinks-app
SHOPIFY_API_KEY ?= 32bfa54d5584531846e1f46b8f899a30 # dev

# build-arm:
# 	docker build . -t cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME} --build-arg SHOPIFY_API_KEY=${SHOPIFY_API_KEY}

button-tree-build:
	docker build -f button-tree.Dockerfile --platform=linux/amd64 . -t cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME} --build-arg SHOPIFY_API_KEY=${SHOPIFY_API_KEY}

build2:
	docker build -f --platform=linux/amd64 . -t cr.yandex/crpfbnl7j4u0rs8okf7v/blinks-app --build-arg SHOPIFY_API_KEY=32bfa54d5584531846e1f46b8f899a30

button-tree-push:
	docker push cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME}

button-tree-run:
	docker run --net=host --env-file ./web/.env --rm cr.yandex/${REGISTRY_ID}/${APPLICATION_NAME}

