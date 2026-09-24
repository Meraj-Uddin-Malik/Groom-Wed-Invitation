import html from '../../templates/manage.html?raw';import {isOwner} from '@/lib/auth';import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
export const dynamic='force-dynamic';
export async function GET(request:Request){if(!await getChatGPTUser())return Response.redirect(new URL(chatGPTSignInPath('/manage'),request.url),302);if(!await isOwner())return new Response('This page is only available to the invitation owner.',{status:403});return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}})}
