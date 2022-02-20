import { setupWorker, rest } from 'msw'

const rules = [
  { price: 1000, weight: "1-10", date: null },
  { price: 2000, weight: "10-20", date: new Date("2022-02-28") },
  { price: 3000, weight: "21-30", date: new Date("2022-02-05") },
]

const worker = setupWorker(
  rest.get('/price-rules', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1500),
      ctx.json(rules.filter(rule => new Date(rule.date).getTime() > new Date().getTime() || rule.date === null)),
    )
  }),
)

// 3. Start the Service Worker.
worker.start()