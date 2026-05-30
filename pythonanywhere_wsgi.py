# +++ copy this into /var/www/ben2_pythonanywhere_com_wsgi.py on PythonAnywhere +++
import os
import sys

# Project path on PythonAnywhere
path = '/home/ben2/Alliance_website'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'alliance_website.settings'
os.environ['PYTHONANYWHERE'] = 'true'
os.environ['PA_USERNAME'] = 'ben2'
os.environ['DEBUG'] = 'false'
os.environ['ALLOWED_HOSTS'] = 'ben2.pythonanywhere.com'

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
