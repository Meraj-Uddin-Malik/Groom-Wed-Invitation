import {listEvents} from '@/lib/events';import {json} from '@/lib/auth';
export async function GET(){try{return json({events:await listEvents()});}catch(e){console.error(e);return json({error:'Event details could not load. Please try again.'},503)}}
