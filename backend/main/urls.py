from django.contrib import admin
from django.urls import path, include
from main import views


urlpatterns = [
    path('registration/', views.Registration.as_view()),
    path('authentication/', views.Authorization.as_view()),

    path('getgoodsbycategory/<str:category_name>', views.GetGoodsFromCategory.as_view()),
    path('getitemsincart', views.GetItemsInCart.as_view()),
    path('createorder', views.CreatingOrder.as_view()),

    path('getnewgoods', views.GetNewGoods.as_view()),

    path('getorders', views.GetOrders.as_view()),
    path('cancelorder/<int:id>', views.CancelOrder.as_view()),

    path('decreasegoodincart/<int:id>', views.DecreaseGoodInCart.as_view()),
    path('increasegoodincart/<int:id>', views.IncreaseGoodInCart.as_view()),
]