from django.shortcuts import render
import os

def index(request):
    return render(request, 'base.html', {})