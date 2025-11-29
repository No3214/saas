#!/usr/bin/env python3
import os, json, urllib.parse

path = 'n8n-templates'
files = sorted([f for f in os.listdir(path) if os.path.isfile(os.path.join(path,f))])
items = []
for f in files:
    full = os.path.join(path, f)
    size = os.path.getsize(full)
    raw = 'https://raw.githubusercontent.com/No3214/saas/main/' + urllib.parse.quote(path + '/' + f)
    items.append({
        'filename': f,
        'raw_url': raw,
        'size_bytes': size,
        'notes': ''
    })

out = {'count': len(items), 'files': items}
with open(os.path.join(path, 'index.json'), 'w', encoding='utf-8') as fo:
    json.dump(out, fo, ensure_ascii=False, indent=2)

print('Wrote', os.path.join(path, 'index.json'))
