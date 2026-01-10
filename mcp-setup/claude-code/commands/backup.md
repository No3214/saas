# Backup Command

Workflow'ları yedekle.

## Kullanım
```
/backup [--full | --incremental]
```

## Backup Types

### Full Backup
```bash
# Tüm workflow'ları yedekle
tar -czvf backup_$(date +%Y%m%d_%H%M%S).tar.gz \
  n8n-templates/ \
  index.json \
  .claude/
```

### Incremental Backup
```bash
# Sadece değişen dosyaları yedekle
git diff --name-only HEAD~1 | \
  xargs tar -czvf backup_incremental_$(date +%Y%m%d).tar.gz
```

### Cloud Backup
```bash
# AWS S3
aws s3 cp backup.tar.gz s3://grain-backups/workflows/

# Google Cloud Storage
gsutil cp backup.tar.gz gs://grain-backups/workflows/

# Azure Blob
az storage blob upload -f backup.tar.gz -c backups -n workflows/backup.tar.gz
```

## Backup Schedule

| Type | Frequency | Retention |
|------|-----------|-----------|
| Full | Haftalık (Pazar) | 4 hafta |
| Incremental | Günlük | 7 gün |
| Pre-deploy | Her deploy | 10 versiyon |

## Restore

### From Local
```bash
# Restore full backup
tar -xzvf backup_20260109_120000.tar.gz

# Restore specific workflow
tar -xzvf backup.tar.gz n8n-templates/Grain_Workflow_v1.json
```

### From Git
```bash
# Son stable versiyona dön
git checkout v5.1.0

# Specific workflow'u geri al
git checkout HEAD~1 -- n8n-templates/Grain_Workflow_v1.json
```

### From Cloud
```bash
# S3'ten restore
aws s3 cp s3://grain-backups/workflows/backup.tar.gz .
tar -xzvf backup.tar.gz
```

## Backup Verification

```bash
# Backup integrity kontrolü
tar -tvf backup.tar.gz | head -20

# JSON validation
tar -xOf backup.tar.gz n8n-templates/*.json | jq '.' > /dev/null

# Checksum
md5sum backup.tar.gz > backup.tar.gz.md5
```

## Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/grain"
BACKUP_FILE="grain_backup_${DATE}.tar.gz"

# Create backup
tar -czvf "${BACKUP_DIR}/${BACKUP_FILE}" \
  n8n-templates/ \
  index.json \
  .claude/

# Upload to cloud
aws s3 cp "${BACKUP_DIR}/${BACKUP_FILE}" s3://grain-backups/

# Cleanup old backups (keep last 30 days)
find "${BACKUP_DIR}" -name "grain_backup_*.tar.gz" -mtime +30 -delete

# Notification
echo "Backup completed: ${BACKUP_FILE}"
```

## Backup Report

```markdown
# 💾 Backup Report

Date: [Date]
Type: [Full/Incremental]
Size: [Size]

## Contents
- n8n-templates/: [count] files
- index.json: [size]
- .claude/: [count] files

## Storage
- Local: /backups/grain/[filename]
- Cloud: s3://grain-backups/[filename]

## Checksum
MD5: [checksum]

## Status: ✅ SUCCESS
```
