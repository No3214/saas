# n8n-templates (Ultimate)

Bu klasör `n8n` workflow JSON şablonlarını merkezi olarak tutmak içindir. 

Ne bulacaksınız:
- Tek satırlık `raw` linkleri ile her bir JSON dosyası.
- `index.json`: klasördeki tüm dosyaların meta bilgilerini (dosya adı, raw URL, boyut) içerir.

Nasıl kullanılır:
1. Claude veya başka bir yapay zekâya vermek için `index.json` içindeki `raw_url` alanlarını kullanabilirsiniz.
2. Yeni bir template eklemek için dosyayı `n8n-templates/` içine koyun ve commit & push yapın.
3. Index'i yeniden oluşturmak için `python3 generate-index.py` çalıştırın (ben otomatik olarak çalıştıracağım).

Güvenlik:
- Lütfen içinde gizli anahtar veya kimlik bilgisi (API key, secret) içeren dosyaları paylaşmayın.
