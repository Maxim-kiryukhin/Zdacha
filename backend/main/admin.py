from django.contrib import admin
from main import models
# Register your models here.

admin.site.register(models.MyUser)
# admin.site.register(models.Token)
admin.site.register(models.Category)
admin.site.register(models.Good)
admin.site.register(models.Cart)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
