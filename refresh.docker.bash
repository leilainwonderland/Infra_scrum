# bash ./refresh.docker.bash

# STOP THE CONTAINER
# DELETE THE CONTENAIRE
# BUILD NEW CONTAINER WITH IMAGE OF DB CONTAINING 2 BLANK TABLE
# START THE CONTAINER
# START EXPRESS SERVER

docker stop server-db-1
sleep 2
docker rm server-db-1
sleep 2
docker compose up -d
sleep 10
docker start server-db-1
sleep 2
echo Succès
pnpm start:dev