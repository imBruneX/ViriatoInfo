Swal.bindClickHandler();
/* Bind a mixin to a click handler */
Swal.mixin({
  toast: true
}).bindClickHandler("data-swal-toast-template");

(function($) {

	"use strict";

})(jQuery);

let dados = [];
const tbody = document.getElementById('tablebuno');

window.addEventListener('load', 
  function() { 
    getDados()
}, false);

async function getDados() {
	const request = await fetch('/infos');
	const data = await request.json()
	dados = data.dados

	dados.forEach(dado => {
		const element = document.createElement('tr')
	
		const type = dado.state == "Pronto" ? "btn-success" : "btn-warning";
	
		element.innerHTML= `
		<tr>
			<td>${dado.id}</td>
			<td>${dado.numero_serie}</td>
			<td>${dado.danos}</td>
			<td>${dado.router ? "Tem" : "Não tem"}</td>
			<td>${dado.estrago.split("_").join(" ")}</td>
			<td><a href="#" class="btn textbuno ${type}">${dado.estado}</a></td>
			<td class="editar">Editar</td>
		</tr>
		`
	
		tbody.append(element)
		
	})
}


function search(e) {
	const getinput = document.getElementById("Pesquisar");
	let newdata = dados.filter(e => e.numero_serie.toLowerCase().includes(getinput.value.toLowerCase())) 
	tbody.innerHTML = ""

	newdata.forEach(dado => {
		const element = document.createElement('tr')
	
		const type = dado.state == "Pronto" ? "btn-success" : "btn-warning";
	
		element.innerHTML= `
		<tr>
			<td>${dado.id}</td>
			<td>${dado.numero_serie}</td>
			<td>${dado.danos}</td>
			<td>${dado.router ? "Tem" : "Não tem"}</td>
			<td>${dado.estrago.split("_").join(" ")}</td>
			<td><a href="#" class="btn textbuno ${type}">${dado.estado}</a></td>
			<td class="editar">Editar</td>
		</tr>
		`
	
		tbody.append(element)
		
	})
}

async function criar() {
    const { value: formValues } = await Swal.fire({
      title: "Criação Kit Informático",
      html: `
	  	<div class="input-container">
			<input id="swal-input1" class="swal2-input" placeholder="Numero de serie">
			<input id="swal-input2" class="swal2-input" placeholder="Danos">
			<select id="swal-select1" class="swal2-select">
				<option value="true">Tem Router</option>
				<option value="false">Não tem Router</option>
			</select>
			<select id="swal-select2" class="swal2-select">
				<option value="Muito_Visivel">Estragos Muito Visiveis</option>
				<option value="Visivel">Estragos Visiveis</option>
				<option value="Nao_Visivel">Estragos Não Visiveis</option>
			</select>
			<select id="swal-select3" class="swal2-select">
				<option value="Completo">Completo</option>
				<option value="Incompleto">Incompleto</option>
				<option value="Danificado">Danificado</option>
			</select>
		</div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
		  document.getElementById("swal-select1").value,
		  document.getElementById("swal-select2").value,
		  document.getElementById("swal-select3").value,
        ];
      }
    });
    if (formValues) {

	   const data = await fetch('/infos', {
	 	method: "POST",
	 	headers: {
	 		"Content-Type": "application/json",
	 	},
	 	body: JSON.stringify({
	 		numero_serie: formValues[0], 
	 		danos: formValues[1], 
	 		router: formValues[2], 
	 		estragos: formValues[3], 
	 		estado: formValues[4]
	 	})
	   })

	   const newdata = await data.json()
	   if(!newdata.dados) return 
	   dados = []
	   dados = newdata.dados ?? [];
	   tbody.innerHTML = ""

	   dados.forEach(dado => {
			const element = document.createElement('tr')
		
			const type = dado.estado == "Completo" ? "btn-success" : "btn-warning";
		
			element.innerHTML= `
			<tr>
				<td>${dado.id}</td>
				<td>${dado.numero_serie}</td>
				<td>${dado.danos}</td>
				<td>${dado.router ? "Tem" : "Não tem"}</td>
				<td>${dado.estrago.split("_").join(" ")}</td>
				<td><a href="#" class="btn textbuno ${type}">${dado.estado}</a></td>
				<td class="editar">Editar</td>
			</tr>
			`
		
			tbody.append(element)
		})
	}
  }