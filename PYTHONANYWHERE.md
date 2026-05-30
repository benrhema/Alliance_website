# Deploying on PythonAnywhere (username: ben2)

Live URL: **https://ben2.pythonanywhere.com**

> **Note:** `ben2.pythonanywhere.com` may currently run CanteenPro. Free PythonAnywhere accounts get **one** web app on `username.pythonanywhere.com`. To host The Alliance there, either replace that web app or upgrade for an additional app / custom domain.

## 1. Open a Bash console on PythonAnywhere

```bash
cd ~
git clone https://github.com/benrhema/Alliance_website.git
cd Alliance_website
```

## 2. Create a virtualenv (Web tab → Virtualenv, or in Bash)

```bash
mkvirtualenv --python=/usr/bin/python3.10 alliance-env
# or: python3.10 -m venv ~/.virtualenvs/alliance-env
pip install -r requirements.txt
```

In the **Web** tab, set **Virtualenv** to `/home/ben2/.virtualenvs/alliance-env` (adjust if different).

## 3. Configure the WSGI file

Web tab → **WSGI configuration file** → replace contents with `pythonanywhere_wsgi.py` from this repo (paths already set for `ben2`).

Or paste from `pythonanywhere_wsgi.py` in the project root.

## 4. Static files (Web tab → Static files)

| URL | Directory |
|-----|-----------|
| `/static/` | `/home/ben2/Alliance_website/staticfiles` |

## 5. Run the deploy script

```bash
cd ~/Alliance_website
bash deploy_pythonanywhere.sh
```

## 6. Reload

Web tab → **Reload** `ben2.pythonanywhere.com`.

## URLs after deploy

| Page | URL |
|------|-----|
| Home | https://ben2.pythonanywhere.com/ |
| Connect | https://ben2.pythonanywhere.com/connect/ |
| Admin | https://ben2.pythonanywhere.com/admin/login/ |

Admin user is created by `seed_admin_portal` (username **Rhema**).

## Updating later

```bash
cd ~/Alliance_website
git pull
bash deploy_pythonanywhere.sh
# Reload web app
```
