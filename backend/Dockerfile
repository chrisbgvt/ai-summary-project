# ---------- Composer dependencies (prod only) ----------
FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --prefer-dist \
    --no-interaction \
    --no-scripts

COPY . .

RUN composer dump-autoload --optimize


# ---------- Shared base: system deps + Python, no app code yet ----------
FROM php:8.3-fpm AS base

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    python3 \
    python3-pip \
    python3-venv \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    && docker-php-ext-install \
        pdo \
        pdo_mysql \
        zip \
        dom \
        xml \
        mbstring \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Entrypoint runs migrations needs to live in `base` so both dev and prod inherit it
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]


# ---------- DEV target ----------
# Only rebuild this when composer.json, requirements.txt, or system deps change.
FROM base AS dev

COPY composer.json composer.lock ./
RUN composer install --no-interaction --no-scripts

COPY scripts/requirements.txt ./requirements.txt
RUN if [ -f requirements.txt ]; then \
        pip3 install --no-cache-dir --break-system-packages -r requirements.txt; \
    fi

# Model pre-download
ENV HF_HOME=/opt/hf-cache
RUN mkdir -p /opt/hf-cache && \
    python3 -c "\
from transformers import pipeline; \
pipeline('summarization', model='sshleifer/distilbart-cnn-12-6', device=-1)"

EXPOSE 9000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]


# ---------- PROD target ----------
FROM base AS prod

COPY --from=vendor /app/scripts/requirements.txt ./requirements.txt
RUN if [ -f requirements.txt ]; then \
        pip3 install --no-cache-dir --break-system-packages -r requirements.txt; \
    fi

# Model pre-download
ENV HF_HOME=/opt/hf-cache
ENV TRANSFORMERS_OFFLINE=1
ENV HF_HUB_OFFLINE=1
RUN mkdir -p /opt/hf-cache && \
    HF_HUB_OFFLINE=0 TRANSFORMERS_OFFLINE=0 python3 -c "\
from transformers import pipeline; \
pipeline('summarization', model='sshleifer/distilbart-cnn-12-6', device=-1)"

COPY --from=vendor /app /var/www/html

RUN chown -R www-data:www-data /var/www/html /opt/hf-cache

EXPOSE 9000
CMD ["php-fpm"]