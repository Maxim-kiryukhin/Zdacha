from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

# roles = {'client' : 'Клиент', 'admin' : 'Администратор'}
roles = [
    ('client', 'Клиент'),
    ('admin', 'Администратор'),
]

class MyUser(models.Model):
    name = models.CharField(blank=False, null=False, max_length=255)
    surname = models.CharField(blank=False, null=False, max_length=255)
    patronymic = models.CharField(blank=True, max_length=255)
    login = models.CharField(blank=False, null=False, max_length=255)
    email = models.EmailField(blank=False, null=False, unique=True)
    password = models.CharField(blank=False, null=False, max_length=255)
    role = models.CharField(blank=False, null=False, choices=roles, default='client', max_length=255)
    is_banned = models.BooleanField(default=False)

    @property
    def is_authenticated(self):
        return True
    
    def __str__(self):
        return self.email

# Поифг????....
# class Token(models.Model):
#     user = models.ForeignKey('MyUser', blank=False, null=False, on_delete=models.CASCADE)
#     token = models.CharField(blank=False, null=False)

# categories = {'cold' : 'Холодные закуски', 'hot' : 'Горячие закуски', 'main' : 'Основные блюда', 'soup' : 'Супы', 'sweet' : 'Десерты', 'drinks' : 'Напитки', 'bar' : 'Барная карта'}
categories = [
    ('cold', 'Холодные закуски'),
    ('hot', 'Горячие закуски'),
    ('main', 'Основные блюда'),
    ('soup', 'Супы'),
    ('sweet', 'Десерты'),
    ('drinks', 'Напитки'),
    ('bar', 'Барная карта'),
]
class Category(models.Model):
    name = models.CharField(blank=False, null=False, choices=categories, unique=True, max_length=255)

    def __str__(self):
        return self.name

class Good(models.Model):
    name = models.CharField(blank=False, null=False, max_length=255)
    price = models.DecimalField(blank=False, null=False, max_digits=100, decimal_places=2)
    description = models.CharField(blank=False, null=False, max_length=255)
    weight = models.IntegerField(blank=False, null=False)
    ingredients = models.CharField(blank=False, null=False, max_length=255)
    production_date = models.DateTimeField(blank=False, null=False)
    category = models.ForeignKey('Category', blank=False, null=False, on_delete=models.CASCADE)
    amount_avaliable = models.IntegerField(blank=False, null=False, default=0)
    pic = models.ImageField(blank=False, null=False, upload_to='goods')

    def __str__(self):
        return self.name



# КОРЗИНА

# Типо это "корзина". 
# Типо:
# пользователь 1 - 10 яблок
# пользователь 1 - 10 бананов
# пользователь 1 - 10 абрикосов

# Запись в корзинке. У 1 пользователя их будет много.

# Много записей, просто буду выводить все записи с такой же id пользователя 
# как и у полученного токена или что-то типо такого. 
# Когда создаем заказ - все записи в корзине с id пользователя переносим в "заказ" и удаляем
class Cart(models.Model):
    good = models.ForeignKey('Good', on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey('MyUser', blank=False, null=False, on_delete=models.CASCADE)
    amount = models.IntegerField(blank=False, null=False)
    price = models.DecimalField(max_digits=100, decimal_places=2)

    def save(self, *args, **kwargs):
        self.price = self.good.price * self.amount
        return super().save(*args, **kwargs)

# ЗАКАЗЫ
# statuses = {'new' : 'Новый','confirmed' : 'Подтвержден', 'canceled' : 'Отменен','declined' : 'Отказано'}
statuses = [
    ('new', 'Новый'),
    ('confirmed', 'Подтвержден'),
    ('canceled', 'Отменен'),
    ('declined', 'Отказано'),
]
class Order(models.Model):
    name = models.CharField(blank=False, null=False, max_length=255)
    user = models.ForeignKey('MyUser', on_delete=models.CASCADE, blank=False, null=False)
    price = models.DecimalField(max_digits=100, decimal_places=2, default=0.00)
    status = models.CharField(choices=statuses, blank=False, null=False, max_length=255)
    reason_for_cancellation = models.CharField(blank=True, max_length=255)

    def save(self, *args, **kwargs):
        if self.status == 'declined' and self.reason_for_cancellation == '':
            raise ValidationError("Нужно указать причину отмены заказа")
        return super().save(*args, **kwargs)

# Клон корзины, но это уже для готового заказа, привязан к нему.
# Стоимость просто передать из корзинки. Заказали же уже, цена не поменяется
class OrderItem(models.Model):
    good = models.ForeignKey('Good', on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey('MyUser', blank=False, null=False, on_delete=models.CASCADE)
    amount = models.IntegerField(blank=False, null=False)
    price = models.DecimalField(max_digits=100, decimal_places=2)
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    