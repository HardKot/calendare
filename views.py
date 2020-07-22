from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import User, Event, UserForm, EventForm
from random import choice
from string import ascii_uppercase
import datetime
import json

def index(request):
    last = User.objects.order_by('-create')[0]
    new = last.url[6:] + ''.join(choice(ascii_uppercase) for i in range(6))
    User(url=new, name='Default').save()

    return HttpResponse("<script type='text/javascript'>window.location.replace('{}');</script>".format(new))	

def user(request, url):
    user = User.objects.get(url=url)
    return render(request,'index.html', context={'name': user.name,
                                                 'url': user.url,
                                                 'rename': UserForm,
                                                 'event': EventForm})

def userName(request, url):
    if request.method == 'POST':
        user = User.objects.get(url=url)
        form = UserForm(request.POST, instance=user)
        form.save()
    return HttpResponse("<h1>ok</h1>")

def addEvent(request, url):
    if request.method == 'POST':
        user = User.objects.get(url=url)
        date = ['', '', '']
        flag = 0
        for nb in request.POST['date']:
            if nb == "-":
                flag+=1
                continue
            date[flag]+=nb
        date = list(map(int, date))
        date = datetime.date(date[0], date[1]+1, date[2])
        event = Event(
            user=user, event_name=request.POST['event_name'], place=request.POST['place'], date=date)
        event.save()
        return HttpResponse("<h1>ok</h1>")

def listEvent(request, url):
    if request.method == "POST":
        date = {'year' : request.POST['year'],
                'month': request.POST['month']
        }
        user = User.objects.get(url=url)
        events = Event.objects.filter(user=user, date__year=date['year'], date__month=date['month'])
        json_event = []
        for event in events:
            json_event.append(event.json())
        return JsonResponse(json.dumps(json_event, ensure_ascii=False), safe=False, )