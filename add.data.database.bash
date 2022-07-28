# PLS STARTS DOCKER AND EXPRESS SERVERS BEFORE THIS
#
mysql -h 127.0.0.1 -P 3306 -u root -p db_test < sql/user.sql
echo ok

# [
#    '{{repeat(10, 10)}}',
#   {
#     email: "{{company()}}@mail.be",
#     password: "test",
#     city: "{{city()}}",
#     name: "{{firstName()}}",
#     lastName: "{{surname()}}",
#     role: '{{random("Back-end", "Front-end", "Full-stack", "Designer", "Manager")}}',
#     tel: "{{phone()}}"
#   }
# ]