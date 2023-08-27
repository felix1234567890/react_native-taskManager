import { Task } from "./models/Task";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export default [
  new Task(
    uuid(),
    "Testni prvi zadatak",
    "Opis je u fukciji testiranja rada aplikacije",
    3,
    new Date("September 13, 2019 13:44:00"),
    true
  ),
  new Task(
    uuid(),
    "Testni drugi zadatak",
    "Opis je drugi u fukciji testiranja rada aplikacije",
    4,
    new Date("September 13, 2019 13:44:00"),
    false
  ),
];
