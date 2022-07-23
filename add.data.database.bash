# PLS STARTS DOCKER AND EXPRESS SERVERS BEFORE THIS
#
mysql -h 127.0.0.1 -P 3306 -u root -p db_test < sql/user.sql
# mysql -h 127.0.0.1 -P 3306 -u root -p db_test < sql/projects.sql
echo ok