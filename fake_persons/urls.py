from django.urls import path, include
from . import views

urlpatterns = [
    # Web
    path('', views.index, name='index'),
    path('person/<pk>', views.person_detail, name='person_detail'),
    path('new', views.person_new, name='person_new'),
    path('delete/<pk>', views.person_delete, name='person_delete'),
    path('edit/<pk>', views.person_edit, name='person_edit'),
    path('accounts/', include("django.contrib.auth.urls")),

    # API REST
    path('api/person/', views.api_person_list, name='api_person_list'),
    path('api/person/<pk>', views.api_person_detail, name='api_person_detail'),
]