from django.urls import path
from django.views.generic import RedirectView

from . import views
from .admin_portal_views import (
    PortalLoginView,
    PortalLogoutView,
    portal_dashboard,
    portal_submissions,
    portal_mark_as_read,
)

urlpatterns = [
    path('', views.home, name='home'),
    path('connect/', views.connect, name='connect'),

    # Custom admin portal at /admin/
    path('admin/login/', PortalLoginView.as_view(), name='portal_login'),
    path('admin/logout/', PortalLogoutView.as_view(), name='portal_logout'),
    path('admin/submissions/', portal_submissions, name='admin_portal_submissions'),
    path('admin/mark-as-read/', portal_mark_as_read, name='admin_portal_mark_as_read'),
    path('admin/', portal_dashboard, name='admin_portal_dashboard'),

    # Legacy URLs → redirect to /admin/
    path('admin-portal/login/', RedirectView.as_view(url='/admin/login/', permanent=True)),
    path('admin-portal/logout/', RedirectView.as_view(url='/admin/logout/', permanent=True)),
    path('admin-portal/submissions/', RedirectView.as_view(url='/admin/submissions/', permanent=True)),
    path('admin-portal/', RedirectView.as_view(url='/admin/', permanent=True)),
]
