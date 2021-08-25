import { GetApp } from "./Main/app";

const app = GetApp();
const port = 3001;

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(`Error pccured: ${error.message}`);
}
