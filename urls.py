from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:url>/', views.user, name='user'),
    path('rename_user/<str:url>', views.userName, name='userName'),
    path('addevent/<str:url>', views.addEvent, name='addEvent'),
    path('listevent/<str:url>', views.listEvent, name='views.listEvent')
]
