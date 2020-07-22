from django import forms

class Name(forms.Form):
    calendar_name = forms.CharField(label="Новое название календаря.")
