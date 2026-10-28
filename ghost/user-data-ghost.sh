#!/usr/bin/env bash
set -euxo pipefail

DOMAIN="__GHOST_DOMAIN__"
MYSQL_PASSWORD="$(openssl rand -base64 24 | tr -d '=+/' | cut -c1-24)"

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get upgrade -y
apt-get install -y nginx mysql-server curl ca-certificates gnupg

systemctl enable nginx
systemctl start nginx

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install ghost-cli@latest -g

id -u ghostuser >/dev/null 2>&1 || adduser --disabled-password --gecos "" ghostuser
usermod -aG sudo ghostuser
echo "ghostuser ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/ghostuser
chmod 440 /etc/sudoers.d/ghostuser

mkdir -p /var/www/ghost
chown ghostuser:ghostuser /var/www/ghost
chmod 775 /var/www/ghost

mysql <<SQL
CREATE DATABASE IF NOT EXISTS ghost_production;
CREATE USER IF NOT EXISTS 'ghost'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
GRANT ALL PRIVILEGES ON ghost_production.* TO 'ghost'@'localhost';
FLUSH PRIVILEGES;
SQL

cat >/root/ghost-mysql.txt <<EOF
Ghost MySQL database: ghost_production
Ghost MySQL user: ghost
Ghost MySQL password: ${MYSQL_PASSWORD}
EOF
chmod 600 /root/ghost-mysql.txt

sudo -iu ghostuser bash <<EOF
set -euxo pipefail
cd /var/www/ghost
ghost install \
  --url "http://${DOMAIN}" \
  --db mysql \
  --dbhost localhost \
  --dbuser ghost \
  --dbpass "${MYSQL_PASSWORD}" \
  --dbname ghost_production \
  --process systemd \
  --no-prompt \
  --no-setup-ssl
EOF

systemctl reload nginx
