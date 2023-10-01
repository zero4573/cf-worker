import { Router } from 'itty-router';
import postToGet from './api/post-to-get';

// now let's create a router (note the lack of "new")
const router = Router();

router.post('/api/post-to-get', postToGet.post);

router.all('*', () => new Response('Not Found.', { status: 404 }));
export default router;
