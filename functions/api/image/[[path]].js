export async function onRequestGet({params,env}) {
  let key = params.path;
  if (Array.isArray(key)) key = key.join('/');
  key = String(key || '');
  try { key = decodeURIComponent(key); } catch (_) {}
  if (!key) return new Response('Immagine mancante', {status:400});
  const obj = await env.VEHICLE_IMAGES.get(key);
  if (!obj) return new Response('Immagine non trovata', {status:404});
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  if (obj.httpEtag) headers.set('ETag', obj.httpEtag);
  headers.set('Cache-Control','public, max-age=3600');
  return new Response(obj.body,{headers});
}
