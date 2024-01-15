const button = document.getElementById("login");

button.onclick = async () => {
    const userinput = document.getElementById("username").value;
    const passinput = document.getElementById("password").value;

    const request = fetch("http://192.168.0.167:3000/auth/login", {
        method: "post",
        body:JSON.stringify({
            username: userinput,
            password: passinput
        }),
        headers: {
            "Content-Type": "application/json"
        },

    }).then(res => res.json().then(data => {
        console.log(data)
    }))
    .catch(err => {
        alert("Parece que o servidor está desligado! Tente novamente em breve!")
    })

}