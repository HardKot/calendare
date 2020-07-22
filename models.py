from django.db import models
from django.forms import ModelForm

class User(models.Model):
    url = models.URLField('Адресс календаря', max_length=12, primary_key=True)
    name = models.CharField('Название калдаря', max_length=30)
    create = models.DateTimeField('Дата создания', auto_now=True)
    
    def __str__(self):
        return self.name

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['name']

class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event_name = models.CharField('Название события', max_length=30)
    date = models.DateField('Когда событие произойдет')
    place = models.CharField('Место проведение', max_length=100)
    
    def json(self):
        return {'name': self.event_name,
                'place': self.place,
                'day': self.date.day
                }

    def __str__(self):
        return self.event_name

class EventForm(ModelForm):
    class Meta:
        model = Event
        fields = ['user','event_name','place','date']

