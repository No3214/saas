# Audit Command

Projeyi denetle ve rapor oluştur.

## Denetim Adımları

### 1. Dosya Sayımı
```bash
# Toplam workflow sayısı
ls -la n8n-templates/*.json | wc -l

# Boyut analizi
du -sh n8n-templates/
```

### 2. index.json Doğrulama

- [ ] Tüm workflow dosyaları index.json'da kayıtlı mı?
- [ ] index.json'daki dosyalar gerçekten mevcut mu?
- [ ] Statistics doğru hesaplanmış mı?
- [ ] Version numarası güncel mi?

### 3. Workflow Kalite Kontrolü

Her workflow için kontrol et:
- [ ] Meta bilgileri tam mı?
- [ ] Error handler var mı?
- [ ] Credentials referansları doğru mu?
- [ ] Node pozisyonları mantıklı mı?

### 4. Duplicate Tespiti

```bash
# Benzer isimlere bak
ls n8n-templates/ | sort | uniq -d

# İçerik benzerlikleri
md5sum n8n-templates/*.json | sort | uniq -w32 -d
```

### 5. Modül Dağılımı

Her modül için:
- Workflow sayısı
- Critical/High/Medium dağılımı
- Son güncelleme tarihi

## Rapor Formatı

```markdown
# Grain SaaS Audit Report
Date: {{date}}
Version: {{version}}

## Summary
- Total Workflows: {{count}}
- Modules: {{modules}}
- Issues Found: {{issues}}

## Module Breakdown
| Module | Workflows | Critical | High | Medium |
|--------|-----------|----------|------|--------|
| core   | 5         | 3        | 2    | 0      |
...

## Issues
1. [CRITICAL] Missing error handler in X
2. [WARNING] Outdated API reference in Y
3. [INFO] Duplicate functionality in Z

## Recommendations
1. ...
2. ...
```

## Çalıştırma

Bu komutu kullanarak projeyi denetle ve yukarıdaki formatta rapor oluştur.
