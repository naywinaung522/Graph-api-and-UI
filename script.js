// This replaces your direct Facebook API call
fetch("http://localhost:3000/facebook-data")
    .then(res => res.json())
    .then(data => {
        console.log("Response from my server:", data);
        
        if (data.data) {
            console.log("Facebook user ID:", data.data.id);
            console.log("Facebook user name:", data.data.name);
        }
    })
    .catch(err => console.error("Fetch error:", err));