const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

exports.handler = async (event) => {
  const { nick, pass, ip } = JSON.parse(event.body)
  const { data } = await supabase.from('users').select('*').eq('nick', nick).eq('password', pass).single()
  if (!data) return { statusCode: 400, body: 'Zły nick lub hasło' }
  await supabase.from('users').update({ ip }).eq('nick', nick)
  return { statusCode: 200, body: 'OK' }
}