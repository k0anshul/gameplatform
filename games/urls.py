from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('game/<int:game_id>/', views.play_game, name='play_game'),
    path('logout/', views.logout_view, name='logout'),
    path("verify-otp/", views.verify_otp, name="verify_otp"),
]
