# bash ./refresh.docker.bash

# STOP THE CONTAINER
docker stop server-db-1
# DELETE THE CONTENAIRE
docker rm server-db-1
# BUILD NEW CONTAINER WITH IMAGE OF DB CONTAINING 2 BLANK TABLE
docker compose up -d
# START THE CONTAINER
docker start server-db-1
echo Succès
