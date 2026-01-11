# Workflow Validate

templates/ klasöründeki tüm workflow'ları doğrula:

1. JSON syntax kontrolü yap
2. Zorunlu alanları kontrol et (name, nodes, connections)
3. Grain meta alanlarını kontrol et (grain_module, grain_tier)
4. Duplicate name kontrolü yap
5. index.json ile tutarlılık kontrolü yap

Sonuçları tablo formatında göster:
- Toplam workflow sayısı
- Geçerli/Geçersiz sayıları
- Eksik alanlar listesi
