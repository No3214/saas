# n8n Bağlantı Kurulum Rehberi 🔑

Workflow'ların çalışması için n8n panelinde aşağıdaki hesapları bağlamanız gerekiyor.

## 1. OpenAI (Zorunlu - AI Özellikleri İçin) 🧠
*Tüm AI workflow'ları için gereklidir.*
1. **Credentials** > **Add Credential** tıklayın.
2. "OpenAI API" aratın.
3. **API Key:** `sk-...` ile başlayan anahtarınızı girin.
   - Yoksa [platform.openai.com](https://platform.openai.com/api-keys) adresinden alın.

## 2. Google OAuth2 (Önerilen) 📊
*Sheets, Drive, Gmail entegrasyonları için gereklidir.*
1. **Credentials** > **New Credential** > "Google OAuth2 API".
2. **Client ID** ve **Client Secret** girmeniz gerekecek.
   - [Google Cloud Console](https://console.cloud.google.com/) üzerinden bir proje oluşturup OAuth2 credentials almalısınız.
   - n8n'in size vereceği "Redirect URL"i Google Console'a eklemeyi unutmayın.

## 3. Mapbox (Emlak Modülü İçin) 🗺️
*Real Estate Land Showcase için gereklidir.*
1. [mapbox.com](https://mapbox.com) hesabınıza girin.
2. Bir "Public Access Token" oluşturun.
3. n8n'de **Header Auth** credential oluşturun:
   - Name: `Mapbox-Token`
   - Key: `access_token`
   - Value: `pk.eyJ...` (Token'ınız)

## 4. Slack (Bildirimler İçin) 💬
*Yorum onayları ve raporlar için.*
1. [api.slack.com/apps](https://api.slack.com/apps) adresinden bir App oluşturun.
2. "Incoming Webhooks" özelliğini açın.
3. Size verilen Webhook URL'ini n8n'de ilgili node'lara yapıştırın.

---
**İpucu:** Kurulumu yaptıktan sonra herhangi bir Workflow'u açıp **Test Workflow** butonuna basarak bağlantıyı doğrulayabilirsiniz.
