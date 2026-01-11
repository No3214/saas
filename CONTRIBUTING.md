# 🤝 Katkıda Bulunma Rehberi

Grain Workflow Suite'e katkıda bulunmak istediğiniz için teşekkürler!

## 📋 Katkı Türleri

### 🆕 Yeni Workflow
1. `templates/<kategori>/` altında yeni klasör oluştur
2. `workflow.json` + `README.md` + `.env.example` ekle
3. `scripts/restructure_repo.py` çalıştır
4. PR aç

### 🐛 Hata Düzeltme
1. Issue aç (varsa mevcut issue'ya yorum yap)
2. Fork & branch oluştur: `fix/issue-number-description`
3. Düzeltmeyi yap + test et
4. PR aç

### 📖 Dokümantasyon
1. `docs/` altında ilgili dosyayı düzenle
2. Ekran görüntüleri `docs/images/` altına

## 🎯 Workflow Standartları

### İsimlendirme
`Grain_<Kategori>_<Açıklama>_v<Versiyon>.json`
Örnek: `Grain_SEO_Competitor_Analysis_v1.json`

### Zorunlu Alanlar
- `name`: Açıklayıcı isim
- `meta.description`: 1-2 cümle açıklama
- `meta.category`: Kategori ID
- `meta.tier`: critical | high | medium

### Hata Yönetimi
Her kritik düğümün arkasına Error Handler ekleyin:
```json
{
  "type": "n8n-nodes-base.errorTrigger",
  "parameters": {
    "mode": "workflow"
  }
}
```

### Credentials
Hardcoded değer YASAK. n8n Variables kullanın: `{{ $vars.API_KEY }}`

## 🧪 Test Gereksinimleri
- JSON syntax geçerli olmalı
- `npm run validate` başarılı olmalı
- `npm run scan-secrets` temiz olmalı
- En az 1 test senaryosu dokümante edilmeli

## 📝 PR Şablonu

```markdown
## Açıklama
[Değişikliğin kısa açıklaması]

## Tür
- [ ] Yeni workflow
- [ ] Hata düzeltme
- [ ] Dokümantasyon
- [ ] Diğer

## Test
- [ ] `npm run validate` başarılı
- [ ] n8n'de test edildi
- [ ] Dokümantasyon güncellendi
```

## 💰 Ödüller
| Katkı | Ödül |
|-------|------|
| Kabul edilen workflow | $50 |
| Kritik hata düzeltme | $25 |
| Aylık en iyi katkıcı | $200 |

## 📞 İletişim
Discord: discord.gg/grain
Email: contribute@grain-automation.com
