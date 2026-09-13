interface Env {
  // Add your bindings here
}

export default {
  async queue(batch, env, ctx): Promise<void> {
    for (const message of batch.messages) {
      console.log("Received", message.body);
    }
  },
} satisfies ExportedHandler<Env>;
