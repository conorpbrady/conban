const save = () => {
    try {
      $boards.lastSaved = Date();
      localStorage.setItem("boardData", JSON.stringify($boards));
      messageType = "success";
      messageContent = "Saved Successfully";
    } catch {
      messageType = "warning";
      messageContent = "Could not save";
    } finally {
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
    }
  };

  const load = () => {
    try {
      let boardObj = localStorage.getItem("boardData");
      $boards = JSON.parse(boardObj);
      messageType = "success";
      messageContent = "Load Succesful";
    } catch {
      messageType = "warning";
      messageContent = "Could not load";
    } finally {
      messageVisible = true;
      setTimeout(() => (messageVisible = false), 2000);
    }
  };
