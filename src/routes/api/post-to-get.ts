/**
 * post-to-get
 * 
 * This endpoint will redirect the client, to the redirectUrl, with all of the POST data as a urlEncoded `body` query parameter
 * 
 * Example usage:
 * curl -v --request POST \
 *  --url 'http://localhost:8787/api/post-to-get?redirectUrl=http%3A%2F%2Flocalhost%3A3000%2Fcustom-shop%2Fcheckout' \
 *  -d '{"a": "b"}'
 * 
 * < HTTP/1.1 302 Found
 * < Content-Length: 0
 * < Location: http://localhost:3000/custom-shop/checkout?body=%7B%22a%22%3A%20%22b%22%7D
 */

import { IRequest } from "itty-router";

export default {
	async post(request: IRequest): Promise<Response> {
		const url = new URL(request.url);
		const redirectUrl = url.searchParams.get('redirectUrl'); 

		if (!redirectUrl) {
			return new Response('Bad request: Missing `redirectUrl` query param', { status: 400 });
		}

		const body = await request.text();
		const urlEncodedBody = encodeURIComponent(body);
		const redirectUrlWithParams=`${redirectUrl}?body=${urlEncodedBody}`;

		// The Response class has static methods to create common Response objects as a convenience
		return Response.redirect(redirectUrlWithParams);
	},
};
