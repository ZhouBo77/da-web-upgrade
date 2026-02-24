# Contact Form Email Setup (Resend + Cloudflare Worker)

已配置目标收件邮箱：`support@dacare.com`

## 1) 部署 Worker

```bash
cd cloudflare-worker
# 安装/登录 wrangler（如未安装）
# npm i -g wrangler
wrangler login
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml`：
- `TO_EMAIL = "support@dacare.com"`
- `FROM_EMAIL = "noreply@<你的已验证域名>"`（Resend 要求）
- `ALLOWED_ORIGIN` 填你的站点域名

设置密钥：
```bash
wrangler secret put RESEND_API_KEY
```

部署：
```bash
wrangler deploy
```

## 2) 回填前端 endpoint

编辑：`docs/assets/contact-config.js`

```js
window.DACARE_CONFIG = {
  CONTACT_ENDPOINT: 'https://<你的worker>.workers.dev/submit-contact'
}
```

提交并推送后，联系表单即可直发邮件到 `support@dacare.com`。

## 3) 验证
- 打开 `/contact/`
- 提交测试表单
- 检查 `support@dacare.com` 是否收到邮件
