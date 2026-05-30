from django import forms
from .models import InterestSubmission


class InterestForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs.update({'class': 'form-input'})

    class Meta:
        model = InterestSubmission
        fields = [
            'full_name',
            'email',
            'phone',
            'location',
            'company',
            'purpose',
            'donation_amount',
            'message',
        ]
        widgets = {
            'full_name': forms.TextInput(attrs={'placeholder': 'Your full name'}),
            'email': forms.EmailInput(attrs={'placeholder': 'your@email.com'}),
            'phone': forms.TextInput(attrs={'placeholder': '+250 7XX XXX XXX'}),
            'location': forms.TextInput(attrs={'placeholder': 'City, country (e.g. Kigali, Rwanda)'}),
            'company': forms.TextInput(attrs={'placeholder': 'Company or organization (optional)'}),
            'donation_amount': forms.TextInput(
                attrs={
                    'placeholder': 'e.g. $5,000 (optional)',
                    'id': 'donation-field',
                }
            ),
            'message': forms.Textarea(
                attrs={
                    'placeholder': 'Tell us about yourself and how you\'d like to connect...',
                    'rows': 5,
                }
            ),
        }
        labels = {
            'full_name': 'Full Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'location': 'Your Location',
            'company': 'Company / Organization',
            'purpose': 'I am interested as a…',
            'donation_amount': 'Donation Amount (if applicable)',
            'message': 'Message',
        }

