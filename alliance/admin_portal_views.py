from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView
from django.shortcuts import redirect, render
from django.urls import reverse, reverse_lazy
from django.utils.cache import patch_cache_control
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.http import require_http_methods

from .models import InterestSubmission


def _no_store(response):
    patch_cache_control(response, no_cache=True, no_store=True, must_revalidate=True, private=True)
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    return response


@method_decorator(never_cache, name='dispatch')
class PortalLoginView(LoginView):
    template_name = 'alliance/admin_portal_login.html'
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse('admin_portal_dashboard')

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        return _no_store(response)


@method_decorator(never_cache, name='dispatch')
class PortalLogoutView(LogoutView):
    next_page = reverse_lazy('portal_login')

    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        return _no_store(response)


@never_cache
@login_required
def portal_dashboard(request):
    if not request.user.is_staff:
        return redirect('portal_login')

    unread_count = InterestSubmission.objects.filter(is_read=False).count()
    total_count = InterestSubmission.objects.count()
    last_submissions = InterestSubmission.objects.all()[:5]

    response = render(
        request,
        'alliance/admin_portal_dashboard.html',
        {
            'unread_count': unread_count,
            'total_count': total_count,
            'last_submissions': last_submissions,
        },
    )
    return _no_store(response)


@never_cache
@login_required
def portal_submissions(request):
    if not request.user.is_staff:
        return redirect('portal_login')

    qs = InterestSubmission.objects.all().order_by('-submitted_at')

    if request.method == 'POST':
        action = request.POST.get('action')
        ids = request.POST.getlist('ids')

        if action == 'mark_as_read' and ids:
            InterestSubmission.objects.filter(id__in=ids).update(is_read=True)
            messages.success(request, 'Marked selected submissions as read.')
            return redirect('admin_portal_submissions')

    response = render(
        request,
        'alliance/admin_portal_submissions.html',
        {'submissions': qs},
    )
    return _no_store(response)


@never_cache
@require_http_methods(['POST'])
@login_required
def portal_mark_as_read(request):
    if not request.user.is_staff:
        return redirect('portal_login')

    submission_id = request.POST.get('id')
    if submission_id:
        InterestSubmission.objects.filter(id=submission_id).update(is_read=True)
        messages.success(request, 'Marked as read.')

    return redirect('admin_portal_submissions')
