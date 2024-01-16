const button = document.getElementById("login");

button.onclick = async () => {
    const userinput = document.getElementById("username").value;
    const passinput = document.getElementById("password").value;

    const request = fetch("http://localhost:3000/login", {
        method: "post",
        body:JSON.stringify({
            nome: userinput,
            senha: passinput
        }),
        headers: {
            "Content-Type": "application/json"
        },

    }).then(res => res.json().then(data => {
        document.cookie="Codigo="+ data.token
        window.location.href = "/dados"
    }))
    .catch(err => {
        alert("Parece que o servidor está desligado! Tente novamente em breve!")
    })

}