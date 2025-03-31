import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
