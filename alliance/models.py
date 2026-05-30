from django.db import models

PURPOSE_CHOICES = [
    ('investor', 'Investor'),
    ('partner', 'Strategic Partner'),
    ('donor', 'Donor / Funder'),
    ('collaboration', 'Collaboration'),
    ('other', 'Other'),
]

class InterestSubmission(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    location = models.CharField(
        max_length=200,
        blank=True,
        help_text='City, country, or region',
    )
    company = models.CharField(max_length=200, blank=True)
    purpose = models.CharField(max_length=50, choices=PURPOSE_CHOICES)
    donation_amount = models.CharField(max_length=100, blank=True,
                                       help_text='If donor, approximate amount in USD')
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']
        verbose_name = 'Interest Submission'
        verbose_name_plural = 'Interest Submissions'

    def __str__(self):
        return f"{self.full_name} — {self.get_purpose_display()} ({self.submitted_at.strftime('%d %b %Y')})"
