import { useEffect, useState } from "react";

function CreateUpdateUser({ userId }: { userId?: string }) {
  const [user, setUser] = useState({});
  const isCreateMode = !userId;

  function createUser(data: any) {
    console.log(data);
  }

  function updateUser(userId: any, data: any) {
    console.log(userId);
    console.log(data);
  }

  function onSubmit(data: any) {
    return isCreateMode ? createUser(data) : updateUser(userId, data);
  }

  return <></>;
}

export default CreateUpdateUser;
