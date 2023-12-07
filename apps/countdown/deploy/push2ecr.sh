echo "docker login to aws erc"
ECRREPO=376953470933.dkr.ecr.us-east-1.amazonaws.com
IMAGE=shopify-app/countdown

if [ -z "$ENV" ] ; then
  echo "ERROR: ENV not configured"
  exit 2
fi

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECRREPO

docker build --build-arg=SHOPIFY_API_KEY=${SHOPIFY_API_KEY} -t$IMAGE:$ENV .

docker tag $IMAGE:$ENV $ECRREPO/$IMAGE:$ENV
docker push $ECRREPO/$IMAGE:$ENV

