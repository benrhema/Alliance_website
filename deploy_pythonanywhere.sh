#!/usr/bin/env bash
# Run this on PythonAnywhere Bash console after cloning the repo.
set -o errexit

export PYTHONANYWHERE=true
export PA_USERNAME=ben2
export DEBUG=false
export ALLOWED_HOSTS=ben2.pythonanywhere.com

cd ~/Alliance_website

pip install -r requirements.txt
python manage.py migrate --noinput
python manage.py collectstatic --noinput
python manage.py seed_admin_portal

echo "Done. Reload the web app from the PythonAnywhere Web tab."
