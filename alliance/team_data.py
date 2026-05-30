import json
from pathlib import Path

from django.conf import settings


def get_team_members():
    """Load team roster from static/data/team.json — edit roles there or on the site."""
    path = Path(settings.BASE_DIR) / 'static' / 'data' / 'team.json'
    if not path.exists():
        return []
    with path.open(encoding='utf-8') as f:
        return json.load(f)
