from django.core.management.base import BaseCommand

from alliance.admin_portal import seed_rhema_user


class Command(BaseCommand):
    help = 'Seeds the single Rhema admin user for the custom admin portal.'

    def handle(self, *args, **options):
        result = seed_rhema_user()
        if result == 'created':
            self.stdout.write(self.style.SUCCESS('Admin user Rhema created successfully.'))
        elif result == 'updated':
            self.stdout.write(self.style.SUCCESS('Admin user Rhema updated.'))
        else:
            self.stdout.write(self.style.WARNING('Admin user Rhema already exists (password synced).'))

