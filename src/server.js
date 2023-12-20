import app from "./app.js"
import { initModel } from "./config/database/associations.js";
import { authenticated, syncON } from "./config/database/database.js";
import envs from "./config/enviroments/envioroments.js";


async function main(){
  try {
    await authenticated()
    initModel()
    await syncON()
  } catch (error) {
    console.log(error);
  }
}

main()

app.listen(envs.PORT,() => {
  console.log(`server is running on port: ${envs.PORT}`);
})



