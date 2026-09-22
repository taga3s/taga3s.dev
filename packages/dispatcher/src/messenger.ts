import { WeeklyReport } from "../../metrics-engine/src";

export const sendMessage = async (webhookUrl: string, message: WebhookMessage) => {
  const res = await fetch(webhookUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    const raw = await res.json();
    throw new Error(`[${res.status}] ${JSON.stringify(raw)}`);
  }

  console.log("Successfully post a message to Discord channel");
};

interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

interface EmbedFooter {
  text: string;
  icon_url?: string;
}

interface EmbedImage {
  url: string;
}

interface Embed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: EmbedFooter;
  image?: EmbedImage;
  thumbnail?: EmbedImage;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}

interface WebhookMessage {
  content?: string;
  embeds?: Embed[];
}

export const formatBlogUrls = (list: string[]): WebhookMessage => {
  const content = `
## :bell: ブログの OGP が準備できたよ。確認してね。
${list.map((item) => `- ${item}`).join("\n")}
`;

  return {
    content,
  };
};

export const formatWeeklyReport = (report: WeeklyReport): WebhookMessage => {
  const content = `
## :globe_with_meridians: 今週のメトリクスレポートをお届けしたよ。確認してね。
`;

  return {
    content,
    embeds: [
      {
        title: "HTTP Status",
        color: 0x00ff00,
        fields: [
          {
            name: "2xx",
            value: `${report.httpStatusRatio.status2xx} %`,
            inline: true,
          },
          {
            name: "3xx",
            value: `${report.httpStatusRatio.status3xx} %`,
            inline: true,
          },
          {
            name: "4xx",
            value: `${report.httpStatusRatio.status4xx} %`,
            inline: true,
          },
          {
            name: "5xx",
            value: `${report.httpStatusRatio.status5xx} %`,
            inline: false,
          },
        ],
      },
      {
        title: "キャッシュ状況",
        color: 0x00ff00,
        fields: [
          {
            name: "HIT",
            value: `${report.cacheRatio.hit} %`,
            inline: true,
          },
          {
            name: "MISS",
            value: `${report.cacheRatio.miss} %`,
            inline: true,
          },
          {
            name: "EXPIRED",
            value: `${report.cacheRatio.expired} %`,
            inline: false,
          },
          {
            name: "STALE",
            value: `${report.cacheRatio.stale} %`,
            inline: false,
          },
          {
            name: "REVALIDATED",
            value: `${report.cacheRatio.revalidated} %`,
            inline: false,
          },
          {
            name: "NONE",
            value: `${report.cacheRatio.none} %`,
            inline: false,
          },
        ],
      },
    ],
  };
};
