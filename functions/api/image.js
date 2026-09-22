export async function onRequestGet({request,env}){
  const u=new URL(request.url);
  const key=u.searchParams.get('key');
  if(!key)return new Response('Immagine mancante',{status:400});
  const obj=await env.VEHICLE_IMAGES.get(key);
  if(!obj)return new Response('Immagine non trovata',{status:404});
  const h=new Headers();
  obj.writeHttpMetadata(h);
  h.set('etag',obj.httpEtag);
  h.set('Cache-Control','public, max-age=3600');
  return new Response(obj.body,{headers:h});
}
