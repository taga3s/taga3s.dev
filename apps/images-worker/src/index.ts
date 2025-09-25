import { Hono } from "hono";
import { env } from "hono/adapter";
import { basicAuth } from "hono/basic-auth";
import { generateOGImage } from "./packages/og/generate";

type Bindings = {
	taga3s_dev_images: R2Bucket;
};

const v1 = new Hono<{ Bindings: Bindings }>();

// Public routes

// Cache /images/* for 30 minutes
v1.get("/images/*", async (c, next) => {
	const cacheKey = c.req.url;

	const cache = caches.default;

	const cachedResponse = await cache.match(cacheKey);
	if (cachedResponse) {
		return cachedResponse;
	}

	await next();

	if (!c.res.ok) {
		return;
	}

	c.header("Cache-Control", "s-maxage=1800");

	const res = c.res.clone();
	c.executionCtx.waitUntil(cache.put(cacheKey, res));
});

v1.get("/images/favorites/:key", async (c) => {
	const object = await c.env.taga3s_dev_images.get(
		`images/favorites/${c.req.param("key")}`,
	);
	if (!object) {
		return c.notFound();
	}

	const body = await object.arrayBuffer();
	return c.body(body, 200, {
		"Content-Type": object.httpMetadata?.contentType ?? "image/jpeg",
	});
});

v1.get("/images/og/:title", async (c) => {
	const title = c.req.param("title");
	if (!title) {
		return c.notFound();
	}

	const object = await c.env.taga3s_dev_images.get(`images/og/${title}`);
	if (object) {
		const body = await object.arrayBuffer();
		return c.body(body, 200, {
			"Content-Type": object.httpMetadata?.contentType ?? "image/png",
		});
	}

	const buffer = await generateOGImage(title);
	await c.env.taga3s_dev_images.put(`images/og/${title}`, buffer, {
		httpMetadata: {
			contentType: "image/png",
		},
	});

	return c.body(buffer, 200, {
		"Content-Type": "image/png",
	});
});

// Admin routes

v1.use("/admin/*", async (c, next) => {
	const { BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } = env<{
		BASIC_AUTH_USERNAME: string;
		BASIC_AUTH_PASSWORD: string;
	}>(c);
	const middleware = basicAuth({
		username: BASIC_AUTH_USERNAME,
		password: BASIC_AUTH_PASSWORD,
	});
	return middleware(c, next);
});

v1.put("/admin/images/favorites", async (c) => {
	const { file, name } = await c.req.parseBody<{ file: File; name: string }>();
	const result = await c.env.taga3s_dev_images.put(
		`images/favorites/${name}`,
		file,
		{
			httpMetadata: {
				contentType: file.type,
			},
		},
	);
	return c.json(result);
});

const app = new Hono();

app.route("/api/v1", v1);

export default app;
