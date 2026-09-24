import { getChatGPTUser } from '@/app/chatgpt-auth';
export async function isOwner(){const user=await getChatGPTUser();return !!user && user.email.toLowerCase()==='merajuddin618@gmail.com';}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !origin || origin===new URL(request.url).origin;}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
export async function readJson(request:Request){if(!request.headers.get('content-type')?.includes('application/json'))throw new Error('Expected JSON');const raw=await request.text();if(raw.length>10000)throw new Error('Request too large');return JSON.parse(raw);}
