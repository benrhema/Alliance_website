from django.contrib import admin
from .models import InterestSubmission

admin.site.site_header = "The Alliance Administration"
admin.site.site_title = "The Alliance Admin Portal"
admin.site.index_title = "Welcome to the Interest Submissions Management"

@admin.register(InterestSubmission)
class InterestSubmissionAdmin(admin.ModelAdmin):
    list_display  = ('full_name', 'email', 'purpose_styled', 'company', 'submitted_at', 'is_read')
    list_filter   = ('purpose', 'is_read', 'submitted_at')
    search_fields = ('full_name', 'email', 'company', 'location', 'message')
    readonly_fields = ('submitted_at',)
    list_editable = ('is_read',)
    ordering      = ('-submitted_at',)
    date_hierarchy = 'submitted_at'

    fieldsets = (
        ('Contact Information', {
            'fields': ('full_name', 'email', 'phone', 'location', 'company')
        }),
        ('Submission Details', {
            'fields': ('purpose', 'donation_amount', 'message'),
        }),
        ('System Metadata', {
            'classes': ('collapse',),
            'fields': ('submitted_at', 'is_read'),
        }),
    )

    @admin.display(description='Purpose')
    def purpose_styled(self, obj):
        """Adds a visual label style in the list view."""
        return obj.get_purpose_display() or "-"

    def get_queryset(self, request):
        """Optimize queries by selecting only what we need."""
        return super().get_queryset(request)

    actions = ['mark_as_read']

    @admin.action(description="Mark selected submissions as read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
