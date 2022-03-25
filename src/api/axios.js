import Axios from "axios";

export default Axios.create({
  // baseURL: "http://localhost:5001/express-439e0/us-central1/app",
  baseURL: "https://us-central1-express-439e0.cloudfunctions.net/app",
});
