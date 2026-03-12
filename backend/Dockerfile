# Используем легкий образ Python
FROM python:3.12-slim

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
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "myproject.wsgi:application"]