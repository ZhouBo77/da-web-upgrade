/**
 * Cloudflare Worker: Contact form -> Resend email
 *
 * Required secrets/env:
 * - RESEND_API_KEY
 * - TO_EMAIL (e.g. support@dacare.com)
 * - FROM_EMAIL (must be verified in Resend, e.g. no-reply@yourdomain.com)
 * - ALLOWED_ORIGIN (e.g. https://www.dacare-group.com or https://zhoubo77.github.io)
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env.ALLOWED_ORIGIN)
      })
    }

    if (url.pathname !== '/submit-contact' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found' }, 404, env.ALLOWED_ORIGIN)
    }

    try {
      const origin = request.headers.get('origin') || ''
      if (env.ALLOWED_ORIGIN && origin && origin !== env.ALLOWED_ORIGIN) {
        return json({ ok: false, error: 'Origin not allowed' }, 403, env.ALLOWED_ORIGIN)
      }

      const body = await request.json()
      const { name, email, company, priority, message } = body || {}

      if (!name || !email || !message) {
        return json({ ok: false, error: 'Missing required fields' }, 400, env.ALLOWED_ORIGIN)
      }

      const subject = `[DaCare Contact] ${priority || 'New inquiry'} - ${company || 'Unknown company'}`
      const text = [
        'New contact form submission',
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || '-'}`,
        `Priority: ${priority || '-'}`,
        '',
        'Message:',
        message
      ].join('\n')

      const resendResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: [env.TO_EMAIL],
          reply_to: email,
          subject,
          text
        })
      })

      if (!resendResp.ok) {
        const errText = await resendResp.text()
        return json({ ok: false, error: `Resend error: ${errText}` }, 502, env.ALLOWED_ORIGIN)
      }

      return json({ ok: true }, 200, env.ALLOWED_ORIGIN)
    } catch (e) {
      return json({ ok: false, error: String(e?.message || e) }, 500, env.ALLOWED_ORIGIN)
    }
  }
}

function corsHeaders(allowedOrigin = '*') {
  return {
    'Access-Control-Allow-Origin': allowedOrigin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}

function json(data, status = 200, allowedOrigin = '*') {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(allowedOrigin)
    }
  })
}
