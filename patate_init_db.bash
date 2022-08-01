# bash init_db.bash

# STOP THE CONTAINER
# DELETE THE CONTENAIRE
# BUILD NEW CONTAINER WITH IMAGE OF DB CONTAINING 2 BLANK TABLE
# START THE CONTAINER
# START EXPRESS SERVER

docker stop server-db-1
sleep 4
docker rm server-db-1
sleep 4
docker compose up -d
sleep 30
docker start server-db-1
sleep 8
pnpm start:dev
sleep 8
# mysql -h 127.0.0.1 -P 3306 -u root -p db_test
echo Succès