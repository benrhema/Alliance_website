from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

ADMIN_USERNAME = 'Rhema'
ADMIN_PASSWORD = '2504@2005ben2'


def seed_rhema_user():
    """Create or update the Rhema staff admin user (idempotent)."""
    User = get_user_model()
    password_hash = make_password(ADMIN_PASSWORD)

    user = User.objects.filter(username__iexact=ADMIN_USERNAME).first()
    if user:
        updated = False
        if user.username != ADMIN_USERNAME:
            user.username = ADMIN_USERNAME
            updated = True
        if not user.is_staff:
            user.is_staff = True
            updated = True
        if not user.is_active:
            user.is_active = True
            updated = True
        user.set_password(ADMIN_PASSWORD)
        user.save()
        return 'updated' if updated else 'exists'

    User.objects.create(
        username=ADMIN_USERNAME,
        password=password_hash,
        is_staff=True,
        is_superuser=False,
        is_active=True,
    )
    return 'created'
