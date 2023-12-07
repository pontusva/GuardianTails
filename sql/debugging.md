# Useful statments for debugging

## Roles

See what role a user have. change the users.user_id to what suit your needs.

SELECT users.username, roles.name \
FROM users \
JOIN user_roles ON users.user_id = user_roles.user_id \
JOIN roles ON user_roles.user_id = roles.role_id \
WHERE users.user_id = 1;
