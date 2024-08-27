import express from 'express';
import { env, mongoose } from './utils';
import { thread } from './controllers';
import originChecker from './middleware/gateway-origin-checker.middleware';

// Connect to Mongo
mongoose.mongoConnect();

// === Express Block ===
const PORT = env.env.SERVICE_PORT;

const app = express();

app.use(express.json());
app.use(originChecker);

app.get("/", thread.controller.list);

app.post("/", thread.controller.create);

app.listen(PORT, () => console.log(`Service started on Port ${PORT}`));