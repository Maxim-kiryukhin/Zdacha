from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import AccessToken

from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User

from main import models, serializers

import uuid
import datetime

from django.db.models import F
# Create your views here.

class Registration(APIView):
    def post(self, request):
        serialzier = serializers.RegistrationSerializer(data = request.data)
        if serialzier.is_valid(raise_exception=True):
            models.MyUser.objects.create(**serialzier.validated_data)
            return Response(data={'message' : 'success'}, status=status.HTTP_201_CREATED)
        
class Authorization(APIView):
    def post(self, request):
        serializer = serializers.AuthenticationSerializer(data = request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            admin_user = authenticate(request, username = email.split("@")[0], password = password)
            if admin_user is not None and admin_user.is_staff:
                login(request, admin_user)
                return Response(data={'is_admin' : True}, status=status.HTTP_200_OK)
            if models.MyUser.objects.filter(email = email).exists():
                user = models.MyUser.objects.get(email = email)
                if check_password(password, user.password):
                    return Response(data={'token' : f'{AccessToken.for_user(user)}'}, status=status.HTTP_200_OK)
                else: return Response(data={'message' : 'Ошибка в пароле'}, status=status.HTTP_400_BAD_REQUEST)
            else: return Response(data={'message' : 'Ошибка в почте'}, status=status.HTTP_400_BAD_REQUEST)
        else: return Response(data={'message' : 'Неправильный запрос'}, status=status.HTTP_400_BAD_REQUEST)

class GetGoodsFromCategory(APIView):
    def get(self, request, category_name):
        category = models.Category.objects.filter(name = category_name).get()
        goods = models.Good.objects.filter(category = category)
        serializer = serializers.GoodsSerializer(goods, many=True)
        return Response(data={'data' : serializer.data}, status=status.HTTP_200_OK)
            
class GetGoodById(APIView):
    def get(self, request, id):
        good = models.Good.objects.filter(id = id)
        serializer = serializers.GoodsSerializer(good)
        return Response(data={'data' : serializer.data}, status=status.HTTP_200_OK)
    
class GetNewGoods(APIView):
    def get(self, request):
        good = models.Good.objects.order_by("production_date")[:5]
        serializer = serializers.GoodsSerializer(good, many = True)
        return Response(data={'data' : serializer.data}, status=status.HTTP_200_OK)
    
class GetItemsInCart(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        items = models.Cart.objects.filter(user = request.user)
        serializer = serializers.CartSerializer(items, many = True)
        return Response(data={'data' : serializer.data}, status=status.HTTP_200_OK)
    

# +, - товаров в корзине. По id товара
class IncreaseGoodInCart(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        if models.Good.objects.filter(id = id).exists():
            good = models.Good.objects.get(id = id)
            if not models.Cart.objects.filter(good = id, user = request.user).exists():
                if good.amount_avaliable == 0:
                    return Response(data={'message' : 'Товара нет в наличии'}, status=status.HTTP_200_OK)
                else:
                    models.Cart.objects.create(
                        good = good,
                        user = request.user,
                        amount = 1
                    )
                    return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
            elif models.Cart.objects.filter(good = id, user = request.user).exists():
                cart = models.Cart.objects.get(good = id, user = request.user)
                if cart.amount >= good.amount_avaliable:
                    cart.amount=good.amount_avaliable
                    cart.save()
                    return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
                else:
                    # cart.amount+=1
                    # cart.save()

                    # Вот так по идее должно норм быть
                    models.Cart.objects.filter(good=id, user=request.user).update(amount=F('amount') + 1, price=F('price') + good.price)
                    return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
                    # Вот так по идее должно норм быть
            else: return Response(data={'message' : 'failed'}, status=status.HTTP_400_BAD_REQUEST)
        else: return Response(data={'message' : 'Товара не существует'}, status=status.HTTP_400_BAD_REQUEST)

class DecreaseGoodInCart(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        if models.Good.objects.filter(id = id).exists():
            good = models.Good.objects.get(id = id)
            if not models.Cart.objects.filter(good = id, user = request.user).exists():
                return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
            elif models.Cart.objects.filter(good = id, user = request.user).exists():
                cart = models.Cart.objects.get(good = id, user = request.user)
                if cart.amount > 1:
                    # cart.amount -= 1
                    # cart.save()

                    # Вот так по идее должно норм быть
                    models.Cart.objects.filter(good=id, user=request.user).update(amount=F('amount') - 1, price=F('price') - good.price)
                    return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
                    # Вот так по идее должно норм быть
                else:
                    cart.delete()
                    return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
            else: return Response(data={'message' : 'failed'}, status=status.HTTP_400_BAD_REQUEST)
        else: return Response(data={'message' : 'Товара не существует'}, status=status.HTTP_400_BAD_REQUEST)


class CreatingOrder(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = serializers.PasswordSerialzier(data = request.data)
        if serializer.is_valid(raise_exception=True):
            if check_password(serializer.validated_data['password'] ,request.user.password):
                cart = models.Cart.objects.filter(user = request.user)
                order = models.Order.objects.create(name = datetime.datetime.now().strftime("%d.%m.%Y %H:%M"), user = request.user, status = 'new')

                order_items = []
                price = 0
                for item in cart:
                    order_items.append(
                        models.OrderItem(
                        good=item.good,
                        user=item.user,
                        amount=item.amount,
                        price=item.price,
                        order=order))
                    price+=item.price
                    good = item.good
                    good.amount_avaliable -= item.amount
                    good.save()
                models.OrderItem.objects.bulk_create(order_items)
                cart.delete()
                order.price = price
                order.save()
                return Response(data={'message':'success'}, status=status.HTTP_200_OK)
            else:
                return Response(data={'message' : 'Ошибка в пароле'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={'message' : 'Ошибка в пароле'}, status=status.HTTP_400_BAD_REQUEST)
        
class GetOrders(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        orders = models.Order.objects.filter(user = request.user)
        serializer = serializers.OrderSerializer(orders, many = True)
        return Response(data={'data' : serializer.data}, status=status.HTTP_200_OK)

class CancelOrder(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        if models.Order.objects.filter(id = id).exists():
            order = models.Order.objects.get(id = id)
            if order.status == 'new':
                order.status = 'canceled'
                order.save()
                order_items = models.OrderItem.objects.filter(order = order)
                for item in order_items:
                    item.good.amount_avaliable += item.amount
                    item.good.save()
                return Response(data={'message' : 'success'}, status=status.HTTP_200_OK)
            else:
                return Response(data={'message' : 'failed'}, status=status.HTTP_400_BAD_REQUEST)

