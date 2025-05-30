galmojalma

zkzqjQN1LcZG13qY

203.113.165.2/32


mongodb+srv://galmojalma:zkzqjQN1LcZG13qY@cluster0.4udbiht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0




## DOCKER

# BUILD
docker hub: givoka
docker build -t <your-dockerhub-username>/ecommerce-backend:latest .
# bạckend
docker build -t givoka/ecommerce-backend:latest .
# frontend
docker build -t givoka/ecommerce-frontend:latest .


# PUSH
# bạckend
docker push <your-dockerhub-username>/ecommerce-backend:latest
# frontend
docker push <your-dockerhub-username>/ecommerce-frontend:latest