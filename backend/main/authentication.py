from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from .models import MyUser

class CustomAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        user_id = validated_token['user_id']
        if MyUser.objects.filter(id = user_id).exists():
            user = MyUser.objects.get(id = user_id)
            return user
        else:
            raise AuthenticationFailed()