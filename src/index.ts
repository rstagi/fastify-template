import build from "./app.js"
const app = await build();
app.listen({ host: "0.0.0.0", port: 8080 }, (err, address) => {
  if (err) {
    app.log.fatal(err)
    process.exit(1)
  }
})
