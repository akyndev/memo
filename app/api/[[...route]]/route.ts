import db from "@/db"
import { notes } from "@/db/schema"
import { Hono } from "hono"
import { handle } from "hono/vercel"

export const runtime = "edge"

const app = new Hono().basePath("/api")

app.post("/create-note", async (c) => {
  const data = await c.req.json()
  const { text } = data
  try {
    if (!text) {
      return c.json({ error: "Text is required" })
    }
    const note = await db.insert(notes).values({ text }).returning({
      id: notes.id,
      text: notes.text
    })

    if (!note) {
      return c.json({ error: "An error occurred" })
    }
    return c.json({ note, message: "Note created successfully" })
  } catch (error) {
    console.log(error)
    return c.json({ error: "An error occurred" })
  }
})

app.get("/notes", async (c) => {
  const allNotes = await db.select().from(notes)
  return c.json({ allNotes, message: "All notes" })
})

app.get("/", async (c) => {
  return c.json({ message: "Hello from Hono" })
})

app.get("/hello", async (c) => {
  return c.json({ message: "Hello from memorizer api" })
 })

export const GET = handle(app)
export const POST = handle(app)
