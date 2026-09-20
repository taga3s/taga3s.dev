export const sendMessage = async (webhookUrl: string, message: DiscordMessage) => {
  const res = await fetch(webhookUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ content: message.content }),
  });

  if (!res.ok) {
    const raw = await res.json();
    throw new Error(`[${res.status}] ${raw}`);
  }

  console.log("Successfully post a message to Discord channel");
};

export interface DiscordMessage {
  content: string;
}

export const toDiscordMessage = (title: string, list: string[]): DiscordMessage => {
  const listValue = list.map((item) => `- ${item}`).join("\n");
  const content = `
## ${title}
${listValue}
`;
  return {
    content,
  };
};
