from rest_framework.serializers import Serializer, ModelSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from django.contrib.auth.hashers import make_password, check_password

from main import models
import re

class RegistrationSerializer(ModelSerializer):
    class Meta:
        model = models.MyUser
        exclude = ['role']

    def validate_login(self, value):
        if not re.fullmatch(r'[A-Za-z0-9-]+', value):
            raise ValidationError()
        return value
    
    def validate_password(self, value):
        return make_password(value)
    
class AuthenticationSerializer(Serializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True)

class GoodsSerializer(ModelSerializer):
    class Meta:
        model = models.Good
        fields = '__all__'

class CartSerializer(ModelSerializer):
    class Meta:
        model = models.Cart
        fields = '__all__'
    good = GoodsSerializer()

class PasswordSerialzier(Serializer):
    password = serializers.CharField(required = True)


class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = models.OrderItem
        exclude = ['order']
    good = GoodsSerializer()

class OrderSerializer(ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
    items = OrderItemSerializer(source = 'orderitem_set', many = True)
    