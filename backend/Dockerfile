# Используем легкий образ Python
FROM python:3.12-slim

# Установка системных зависимостей для сборки mysqlclient
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код
COPY . .

# Собираем статику Django (нужно для админки)
RUN python manage.py collectstatic --noinput

# Запускаем через Gunicorn (промышленный сервер для Django)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "store.wsgi:application"]