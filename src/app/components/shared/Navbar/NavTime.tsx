import { connection } from "next/server";


const NavTime = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return <p>{date}</p>;
};

export default NavTime;
