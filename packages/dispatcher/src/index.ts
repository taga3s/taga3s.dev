import { convertToEvent } from "./converter";
import { formatBlogUrls, formatWeeklyReport, sendMessage } from "./messenger";
import type { Env } from "./types";

const invokeBlogEngine = async (env: Env, webhookUrl: string) => {
  await Promise.all([
    (async () => {
      const result = await env.BLOG_ENGINE_OGP.generate();
      if (result === undefined || result.blogUrls.length === 0) {
        console.log("No new blog ogp generated.");
        return;
      }

      await sendMessage(webhookUrl, formatBlogUrls(result.blogUrls));
    })(),
    (async () => {
      await env.BLOG_ENGINE_RSS.generate();
    })(),
  ]);
};

const invokeMetricsEngine = async (controller: ScheduledController, env: Env, webhookUrl: string) => {
  const current = new Date(controller.scheduledTime);
  const currentTime = current.toISOString();
  const origin = new Date(current.setDate(current.getDate() - 7));
  const originTime = origin.toISOString();

  const report = await env.METRICS_ENGINE_REPORTER.create({ start: originTime, end: currentTime });
  if (!report) {
    return;
  }

  await sendMessage(webhookUrl, formatWeeklyReport(report));
};

export default {
  async queue(batch, env, _ctx): Promise<void> {
    const webhookUrl = await env.DISCORD_WEBHOOK_URL.get();

    for (const msg of batch.messages) {
      const event = convertToEvent(msg.body);
      if (event?.type === "blog.updated") {
        await invokeBlogEngine(env, webhookUrl);
      }
    }
  },
  async scheduled(controller, env, _ctx) {
    const webhookUrl = await env.DISCORD_WEBHOOK_URL.get();

    await invokeMetricsEngine(controller, env, webhookUrl);
  },
} satisfies ExportedHandler<Env, unknown>;
