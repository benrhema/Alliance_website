# The Alliance — Website

Django site for branding, investor outreach, and connect-form submissions.

## Local setup

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_admin_portal
python manage.py runserver
```

- **Public site:** http://127.0.0.1:8000/
- **Connect form:** http://127.0.0.1:8000/connect/
- **Admin portal:** http://127.0.0.1:8000/admin/login/ (dashboard at `/admin/`)

Staff login is created by `seed_admin_portal` (username **Rhema**).

## Brand assets & team

- Logo: `static/images/logo.png`
- Team photos: `static/images/team/`
- Edit names/roles for everyone: `static/data/team.json`
- On the homepage, click **“Click to add role…”** under each photo to type a role (saved in your browser). To persist for all visitors, copy roles into `team.json`.

## Theme

Default is **light** (orange & white). Use **Dark mode** in the nav to switch to the black theme. Preference is saved in the browser.

## Live product links

- Voting: https://safe-vote-upgrade.vercel.app
- CanteenPro: https://ben2.pythonanywhere.com

## Deploying on PythonAnywhere

1. Upload this project (or clone from Git) into your PythonAnywhere account.
2. Create a **Web** app → Manual configuration → Python 3.10+.
3. In the virtualenv: `pip install -r requirements.txt`
4. Set **Working directory** to the project folder.
5. **WSGI** file — point `path` to your project and set:

```python
import os
import sys

path = '/home/YOURUSERNAME/alliance_website'  # adjust
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'alliance_website.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

6. In a Bash console on PythonAnywhere:

```bash
cd ~/alliance_website
python manage.py migrate
python manage.py seed_admin_portal
python manage.py collectstatic --noinput
```

7. **Static files:** Web tab → Static files → URL `/static/` → directory `.../staticfiles`
8. Set `DEBUG = False` and `ALLOWED_HOSTS = ['yourusername.pythonanywhere.com']` in `settings.py` (or use environment variables).
9. Reload the web app.

## Project structure

```
alliance_website/
├── alliance/              # App: models, views, admin portal
├── templates/alliance/    # HTML templates
├── static/                # CSS, JS (particles, main)
├── manage.py
└── requirements.txt
```
