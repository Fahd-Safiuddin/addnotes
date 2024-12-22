// Add Note Button: Sends a POST request to the Flask backend
document.getElementById("addNote").addEventListener("click", async () => {
  const txHash = document.getElementById("txHash").value.trim();
  const note = document.getElementById("note").value.trim();

  // Validate inputs
  if (!txHash || !note) {
    alert("Please fill in both fields!");
    return;
  }

  try {
    // Send POST request to the backend
    const response = await fetch("http://127.0.0.1:8081/add-note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txHash, note }),
    });

    // Parse the response
    if (response.ok) {
      const data = await response.json();
      document.getElementById("output").innerText = data.message;
    } else {
      const error = await response.json();
      document.getElementById("output").innerText = error.error || "Failed to add note.";
    }
  } catch (error) {
    console.log(response);
    //console.error("Error adding note:", error);
    //document.getElementById("output").innerText = "An error occurred while adding the note. Here.";
  }
});

// Get Note Button: Sends a GET request to the Flask backend
document.getElementById("getNote").addEventListener("click", async () => {
  const txHash = document.getElementById("txHash").value.trim();

  // Validate input
  if (!txHash) {
    alert("Please enter a transaction hash!");
    return;
  }

  try {
    // Send GET request to the backend
    const response = await fetch(`http://127.0.0.1:8081/get-note?txHash=${txHash}`);

    // Parse the response
    if (response.ok) {
      const data = await response.json();
      if (data.note) {
        document.getElementById("output").innerText = `Note: ${data.note}`;
      } else {
        document.getElementById("output").innerText = "No note found for this transaction hash.";
      }
    } else {
      const error = await response.json();
      document.getElementById("output").innerText = error.error || "Failed to fetch note.";
    }
  } catch (error) {
    console.error("Error fetching note:", error);
    document.getElementById("output").innerText = "An error occurred while fetching the note.";
  }
});
