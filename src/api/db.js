// @flow
import Dexie from "dexie";

const db = new Dexie("GedcomAnalyzer");
db.version(1).stores({
  people: "pointer,birthDate,deathDate,age,name,fname,lname",
  places: "++id,name,count",
  meta: "name",
});

export default db;
