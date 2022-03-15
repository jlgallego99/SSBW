from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('person/<pk>', views.person_detail, name='person_detail'),
]