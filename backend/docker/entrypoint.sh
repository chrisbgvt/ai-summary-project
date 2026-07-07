#!/bin/sh

set -e

echo "Waiting for database connection..."

until php -r "
try {
    new PDO(
        'mysql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT'),
        getenv('DB_USERNAME'),
        getenv('DB_PASSWORD')
    );
} catch (Exception \$e) {
    exit(1);
}
" > /dev/null 2>&1; do
    echo "Database is unavailable - sleeping"
    sleep 3
done

echo "Database is up - starting application"

exec "$@"