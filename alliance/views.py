from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from django.http import HttpRequest
from .forms import InterestForm
from .team_data import get_team_members


def home(request: HttpRequest) -> HttpResponse:
    return render(request, 'alliance/home.html', {'team_members': get_team_members()})

def connect(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        form = InterestForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Thank you! We received your message and will be in touch soon.')
            return redirect('connect')
        else:
            messages.error(request, 'Please fix the errors below.')
    else:
        form = InterestForm()
    return render(request, 'alliance/connect.html', {'form': form})
